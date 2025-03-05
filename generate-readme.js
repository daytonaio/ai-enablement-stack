const fs = require('fs');

function generateReadme(data) {
  let readme = `<h1 align="center">
	🤖 AI Enablement Stack 🚀
	<p align="center">
		<a href="https://go.daytona.io/slack" target="_blank">
			<img src="https://img.shields.io/static/v1?label=Join&message=%20Slack!&color=mediumslateblue">
		</a>
		<a href="https://x.com/daytonaio" target="_blank">
			<img src="https://img.shields.io/twitter/follow/daytonaio.svg?logo=x">
		</a>
	</p>
</h1>

<h3 align="center">
  The comprehensive guide to tools and technologies powering modern AI development
</h3>

<h5 align="center">👉 <a href="CONTRIBUTING.md">Add Your Tool</a></h5>

<img src="./ai-enablement-stack.png" width="100%" alt="AI Enablement Stack" />

<h2>What is the AI Enablement Stack?</h2>

<p>The AI Enablement Stack is a curated collection of venture-backed companies, tools and technologies that enable developers to build, deploy, and manage AI applications. It provides a structured view of the AI development ecosystem across five key layers:</p>

`;

  // Add layers description
  const reversedLayers = [...data.layers].reverse();
  reversedLayers.forEach(layer => {
    readme += `**${layer.name}**: `;
    if (layer.description) {
      readme += `${layer.description}\n\n`;
    }
  });

  readme += `## Why Use This Stack?\n\n`;
  readme += `- **For Developers**: Find the right tools to build AI applications faster and more efficiently\n`;
  readme += `- **For Engineering Leaders**: Make informed decisions about AI infrastructure and tooling\n`;
  readme += `- **For Organizations**: Understand the AI development landscape and plan technology adoption\n\n`;
  readme += `Each tool in this stack is carefully selected based on:\n\n`;
  readme += `- Production readiness\n`;
  readme += `- Enterprise-grade capabilities\n`;
  readme += `- Active development and support\n`;
  readme += `- Venture backing or significant market presence\n\n`;

  readme += `## How to Contribute\n\n`;
  readme += `To contribute to this list:\n\n`;
  readme += `0. Read the <a href="CONTRIBUTING.md">CONTRIBUTING.md</a>\n`;
  readme += `1. Fork the repository\n`;
  readme += `2. Add logo under the ./public/images/ folder\n`;
  readme += `3. Add your tool in the appropriate category in the file ai-enablement-stack.json\n`;
  readme += `4. Submit a PR with a compelling rationale for its acceptance\n\n`;

  // Add detailed sections
  reversedLayers.forEach(layer => {
    readme += `## ${layer.name}\n\n`;

    layer.sections.forEach(section => {
      readme += `### ${section.name}\n\n`;
      if (section.description) {
        readme += `${section.description}\n\n`;
      }

      section.companies.forEach(company => {
        if (typeof company === 'string') {
          readme += `#### [${company}]()\n`;
          readme += `<details>\n\n`;
          readme += `##### Category\n${layer.name} - ${section.name}\n\n`;
          readme += `##### Description\n- No description available\n\n`;
          readme += `##### Links\n- No links available\n\n`;
          readme += `</details>\n\n`;
        } else {
          readme += `#### [${company.name}](${company.link || ''})\n`;
          readme += `<details>\n\n`;
          if (company.logo) {
            readme += `<img src="${company.logo}" width="200" alt="${company.name}">\n\n`;
          }
          readme += `##### Category\n${layer.name} - ${section.name}\n\n`;
          readme += `##### Description\n${company.description || '- No description available'}\n\n`;
          readme += `##### Links\n`;
          if (company.link) {
            readme += `- [Website](${company.link})\n`;
          }
          if (company.github) {
            readme += `- [GitHub](${company.github})\n`;
          }
          if (company.x) {
            // Remove @ symbol if present and add proper X/Twitter URL
            const xHandle = company.x.startsWith('@') ? company.x.substring(1) : company.x;
            readme += `- [X/Twitter](https://twitter.com/${xHandle})\n`;
          }
          readme += `</details>\n\n`;
        }
      });
    });
  });

  // Add footer
  readme += `\n## Contributing\n`;
  readme += `Please read the [contribution guidelines](CONTRIBUTING.md) before submitting a pull request.\n\n`;
  readme += `## License\n`;
  readme += `This project is licensed under the Apache 2.0 License - see the [LICENSE](LICENSE) file for details\n`;

  return readme;
}

// Read and parse the JSON file
const data = JSON.parse(fs.readFileSync('./ai-enablement-stack.json', 'utf8'));

// Generate README content
const readmeContent = generateReadme(data);

// Write to README.md file
fs.writeFileSync('README.md', readmeContent);

console.log('README.md has been generated successfully!');