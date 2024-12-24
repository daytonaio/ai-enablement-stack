# Contributing to AI Enablement Stack

Thank you for your interest in contributing to the AI Enablement Stack! We welcome contributions from the community to help maintain and improve this comprehensive resource for agentic AI development.

> If you like the project but don't have time to contribute, there are other ways to show your support:
> - Star the project on GitHub
> - Tweet about it
> - Share it in your AI development communities
> - Reference it in your projects

## Code of Conduct

This project and everyone participating in it is governed by our Code of Conduct. By participating, you are expected to uphold this code. Please report unacceptable behavior to the community leaders at `codeofconduct@daytona.io`.

## How to Contribute

### Adding a New Company

**Please note that we are only accepting venture-backed companies. Contributions that include non-venture-backed companies won't be accepted.**

1. Fork the repository
2. Add the company logo to the `./public/images/` folder
   - Image should be high quality and preferably in transparent SVG or PNG format (crop them tight)
   - Name the file consistently with the company name
3. Add your entry to the `ai-enablement-stack.json` file in the appropriate category
4. Submit a pull request

### JSON Entry Format

Each entry in the `ai-enablement-stack.json` should follow this structure:

```json
{
  "name": "Company Name",
  "description": "Clear and short one-liner description of the company",
  "logo": "./public/images/logo-filename.svg",
  "link": "https://company-website.com"
}
```

### Categories

Ensure your entry falls into one of these main layers and their respective subcategories:

- Agent Consumer Layer
  - AUTONOMOUS AGENTS
  - ASSISTIVE AGENTS
  - SPECIALIZED AGENTS
- Observability and Governance Layer
  - DEVELOPMENT PIPELINE
  - EVALUATION & MONITORING
  - RISK & COMPLIANCE
  - SECURITY & ACCESS CONTROL
- Engineering Layer
  - TRAINING & FINE-TUNING
  - TOOLS
  - TESTING & QUALITY ASSURANCE
- Intelligence Layer
  - FRAMEWORKS
  - KNOWLEDGE ENGINES
    - SPECIALIZED CODING MODELS
- Infrastructure Layer
  - WORKSPACES
  - MODEL ACCESS & DEPLOYMENT
  - CLOUD PROVIDERS

## Pull Request Process

1. Ensure your PR includes only one addition/change
2. Verify that your entry follows the format guidelines
3. Add a brief description of your changes in the PR
4. Sign off on your commits to certify the Developer Certificate of Origin (DCO)

### Developer Certificate of Origin (DCO)

We require all contributions to be signed off, indicating that you certify the origin of the code. This is done using the `-s` flag when committing:

```bash
git commit -s -m "Add [Company] to [Category]"
```

### Quality Guidelines

- Ensure descriptions are clear, concise, and accurate
- Verify all links are working
- Use proper formatting and spelling
- Include relevant technical details
- Avoid marketing language

## Need Help?

If you have questions about contributing, feel free to:
- Open an issue
- Join our community discussions
- Reach out on [Slack](https://go.daytona.io/slack)

## License

By contributing to AI Enablement Stack, you agree that your contributions will be licensed under the Apache License, Version 2.0.
