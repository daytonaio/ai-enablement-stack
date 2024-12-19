const { promises: fsPromises } = require('fs');
const fs = require('fs');
const path = require('path');
const http = require('http');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const express = require('express');
const generateHTML = require('./template');

// Load environment variables
const port = process.env.PORT || 4000;
const env = process.env.NODE_ENV || 'development';

// Initialize express app
const app = express();
const server = http.createServer(app);

// Security middleware
app.use(helmet({
    contentSecurityPolicy: {
        directives: {
            defaultSrc: ["'self'"],
            styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
            fontSrc: ["'self'", "https://fonts.gstatic.com"],
            imgSrc: ["'self'", "data:", "https:"],
        },
    }
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 1000, // Increased from 100 to 1000 requests per windowMs
    message: 'Too many requests, please try again later',
    standardHeaders: true,
    legacyHeaders: false
});
app.use(limiter);

// Middleware
app.use(compression()); // Compress responses
app.use(express.json());
app.use(express.static('public', {
    maxAge: '1d', // Cache static files for 1 day
    etag: true
}));

// Logging configuration
if (env === 'production') {
    app.use(morgan('combined'));
} else {
    app.use(morgan('dev'));
}

// Error handler middleware
const errorHandler = (err, req, res, next) => {
    console.error(err.stack);
    res.status(err.status || 500).json({
        error: env === 'production' ? 'Internal Server Error' : err.message
    });
};

// Async request handler wrapper
const asyncHandler = fn => (req, res, next) =>
    Promise.resolve(fn(req, res, next)).catch(next);

app.get('/', asyncHandler(async (req, res) => {
    const data = await fsPromises.readFile('./ai-enablement-stack.json', 'utf8');
    const jsonData = JSON.parse(data);

    const processedData = {
        ...jsonData,
        layers: jsonData.layers.map(layer => ({
            ...layer,
            sections: layer.sections.map(section => ({
                ...section,
                companies: section.companies.map(company => {
                    if (typeof company === 'string') {
                        return { name: company, logo: '' };
                    }

                    // Handle different image extensions and paths
                    let logoPath = '';
                    if (company.logo) {
                        const logoName = path.basename(company.logo);
                        logoPath = `/images/${logoName}`;

                        // Check if file exists in public/images
                        const publicPath = path.join(process.cwd(), 'public', 'images', logoName);
                        if (!fs.existsSync(publicPath)) {
                            console.warn(`Warning: Image not found: ${logoName} for company ${company.name}`);
                        }
                    }

                    return {
                        ...company,
                        logo: logoPath
                    };
                })
            }))
        }))
    };

    if (processedData.layers) {
        processedData.layers = processedData.layers.reverse();
    }

    const dtnLogoUrl = '/images/daytonaio.png';
    const bgImageDataUrl = '/bg.png';

    const html = generateHTML(processedData, bgImageDataUrl, dtnLogoUrl);  // Pass all three parameters

    res.set({
        'X-Content-Type-Options': 'nosniff',
        'X-Frame-Options': 'DENY',
        'Cache-Control': 'no-cache'
    });

    res.type('html').send(html);
}));

// Add a route to check image availability
app.get('/check-images', asyncHandler(async (req, res) => {
    const imagesDir = path.join(process.cwd(), 'public', 'images');
    const files = await fsPromises.readdir(imagesDir);
    res.json({
        availableImages: files,
        directory: imagesDir
    });
}));

// 404 handler
app.use((req, res) => {
    res.status(404).json({ error: 'Not Found' });
});

// Error handler
app.use(errorHandler);

// Graceful shutdown
const gracefulShutdown = () => {
    console.log('Received shutdown signal. Starting graceful shutdown...');

    server.close(() => {
        console.log('Server closed. Process exiting...');
        process.exit(0);
    });

    // Force shutdown after 30 seconds
    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down');
        process.exit(1);
    }, 30000);
};

// Start server
server.listen(port, () => {
    console.log(`Server running in ${env} mode at http://localhost:${port}`);
});

// Handle shutdown signals
process.on('SIGTERM', gracefulShutdown);
process.on('SIGINT', gracefulShutdown);
process.on('uncaughtException', (err) => {
    console.error('Uncaught Exception:', err);
    gracefulShutdown();
});
process.on('unhandledRejection', (err) => {
    console.error('Unhandled Rejection:', err);
    gracefulShutdown();
});