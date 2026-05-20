/**
 * Generates public/llms.txt for the docs site (https://llmstxt.org/).
 * Reads docs/search/components.json (from gen:search).
 *
 * llms-full.txt is maintained separately — full API reference, update manually
 * when component APIs or examples change significantly.
 */
const fs = require('fs')
const path = require('path')

const DOCS_BASE = 'https://indielayer.com/ui/docs'
const COMPONENTS_JSON = path.join(__dirname, '../docs/search/components.json')
const OUTPUT = path.join(__dirname, '../public/llms.txt')

function escapeMarkdown(text) {
  return text.replace(/\n/g, ' ').trim()
}

function main() {
  if (!fs.existsSync(COMPONENTS_JSON)) {
    console.error('Missing components.json — run: pnpm gen:search')
    process.exit(1)
  }

  const components = JSON.parse(fs.readFileSync(COMPONENTS_JSON, 'utf8'))
  const componentLines = components
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => {
      const url = `${DOCS_BASE}${c.url}`
      const desc = escapeMarkdown(c.description)
      return `- [${c.name}](${url}): ${desc}`
    })
    .join('\n')

  const content = `# Indielayer UI

> Vue 3 and Tailwind CSS component library for fast web apps. Documentation: ${DOCS_BASE}

Indielayer UI provides accessible, themeable components for Vue 3 and Nuxt 3. Use the links below for per-component docs and demos. For a single large context file, see the Optional section.

## Getting started

- [Documentation home](${DOCS_BASE}/getting-started): install, usage, and theming
- [Icons](${DOCS_BASE}/icons): icon set and usage
- [Colors](${DOCS_BASE}/colors): palette and color props
- [Typography](${DOCS_BASE}/typography): type scale

## Components

${componentLines}

## Repository

- [GitHub](https://github.com/indielayer/ui): source and issues
- [npm @indielayer/ui](https://www.npmjs.com/package/@indielayer/ui): package installs
- [Quickstart](https://www.npmjs.com/package/@indielayer/create-ui): \`npm init @indielayer/ui\`

## Optional

- [Full reference](${DOCS_BASE}/llms-full.txt): complete component API and examples (large file; skip if context is limited)
`

  fs.writeFileSync(OUTPUT, content)
  console.log(`llms.txt written (${components.length} components)`)
}

main()
