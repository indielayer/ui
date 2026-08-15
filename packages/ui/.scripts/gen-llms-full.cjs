/**
 * Generates public/llms-full.txt — full component reference for LLMs.
 * Requires docs/search/components.json (pnpm gen:search).
 */
const fs = require('fs')
const path = require('path')
const {
  resolvePropsFromSfc,
  propsToMarkdownTable,
  buildComponentExportMap,
  resolvePrimaryExport,
} = require('./lib/props-from-sfc.cjs')

const PKG_ROOT = path.join(__dirname, '..')
const COMPONENTS_JSON = path.join(PKG_ROOT, 'docs/search/components.json')
const PREAMBLE_PATH = path.join(__dirname, 'llms-full-preamble.md')
const OUTPUT = path.join(PKG_ROOT, 'public/llms-full.txt')
const DOCS_COMPONENTS_DIR = path.join(PKG_ROOT, 'docs/pages/component')

function slugify(title) {
  return title
    .replace(/([a-z])([A-Z])/g, '$1-$2')
    .replace(/\s+/g, '-')
    .toLowerCase()
}

function extractSlotsAndEvents(vueFilePath) {
  const source = fs.readFileSync(vueFilePath, 'utf8')
  const slots = new Set()
  const events = new Set()

  const templateMatch = source.match(/<template>([\s\S]*?)<\/template>/)
  if (templateMatch) {
    const template = templateMatch[1]
    const slotPatterns = [
      /#([\w-]+)=/g,
      /v-slot:([\w-]+)=/g,
      /<slot\s+name="([\w-]+)"/g,
      /<slot\s+name='([\w-]+)'/g,
    ]

    for (const pattern of slotPatterns) {
      let match
      while ((match = pattern.exec(template))) slots.add(match[1])
    }

    if (/<slot(\s|>)/.test(template) || /<slot\s*\/>/.test(template)) slots.add('default')
  }

  const setupMatch = source.match(/<script setup[^>]*>([\s\S]*?)<\/script>/)
  if (setupMatch) {
    const setup = setupMatch[1]
    const emitMatch = setup.match(/defineEmits\(([\s\S]*?)\)/)
    if (emitMatch) {
      const literal = emitMatch[1]
      const strings = literal.matchAll(/['"]([\w:]+)['"]/g)
      for (const entry of strings) events.add(entry[1])
    }

    if (setup.includes('useInputtable.emits')) {
      const falseOnly = /useInputtable\.emits\s*\(\s*false\s*\)/.test(setup)

      if (falseOnly) {
        events.add('update:modelValue')
      } else {
        for (const name of ['update:modelValue', 'blur', 'focus', 'input', 'change']) events.add(name)
      }
    } else if (setup.includes('useInputtable')) {
      events.add('update:modelValue')
    }
  }

  return {
    slots: [...slots].sort(),
    events: [...events].sort(),
  }
}

function formatNamedList(title, names, descriptions = {}) {
  if (!names.length && !Object.keys(descriptions).length) {
    return `### ${title}\n- _(none)_\n`
  }

  const ordered = names.length ? names : Object.keys(descriptions).sort()
  const lines = ordered.map((name) => {
    const description = descriptions[name]

    return description ? `- \`${name}\`: ${description}` : `- \`${name}\``
  })

  return `### ${title}\n${lines.join('\n')}\n`
}

function formatApiExtras({ slots, events }, docs = {}) {
  const slotNames = new Set([...(slots || []), ...Object.keys(docs.slots || {})])
  const eventNames = new Set([...(events || []), ...Object.keys(docs.emits || {})])
  const methodNames = Object.keys(docs.methods || {})

  return [
    formatNamedList('Slots', [...slotNames].sort(), docs.slots),
    formatNamedList('Events', [...eventNames].sort(), docs.emits),
    methodNames.length ? formatNamedList('Methods', methodNames.sort(), docs.methods) : '',
  ].filter(Boolean).join('\n')
}

function listDemoFiles(docDir) {
  if (!fs.existsSync(docDir)) return []

  return fs.readdirSync(docDir)
    .filter((file) => file.endsWith('.vue') && file !== 'index.vue')
    .sort((a, b) => {
      if (a === 'usage.vue') return -1
      if (b === 'usage.vue') return 1
      return a.localeCompare(b)
    })
}

function demoTitle(filename) {
  return filename
    .replace('.vue', '')
    .replace(/-/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

function buildToc(components) {
  const staticLinks = [
    '- [Quick Start](#quick-start)',
    '- [Features](#features)',
    '- [Installation](#installation)',
    '- [Usage](#usage)',
    '- [Configuration](#configuration)',
    '- [Customization](#customization)',
    '- [Icons](#icons)',
    '- [Components](#components)',
  ]

  const componentLinks = components
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((c) => `  - [${c.name}](#${slugify(c.name)})`)

  return ['## Table of Contents', '', ...staticLinks, ...componentLinks, ''].join('\n')
}

function buildComponentSection(meta, exportMap) {
  const docDir = path.join(DOCS_COMPONENTS_DIR, meta.url.replace('/component/', ''))
  const indexPath = path.join(docDir, 'index.vue')
  const indexSource = fs.existsSync(indexPath) ? fs.readFileSync(indexPath, 'utf8') : ''
  const exportName = resolvePrimaryExport(indexSource, meta.name)
  const exportEntry = exportName ? exportMap[exportName] : null
  const vuePath = exportEntry?.vuePath

  let propsSection = '### Props\n| Name | Type | Default | Description |\n|------|------|---------|-------------|\n| _(none)_ | | | |\n'
  let extrasSection = formatApiExtras({ slots: [], events: [] })

  if (vuePath && fs.existsSync(vuePath)) {
    const resolved = resolvePropsFromSfc(vuePath)

    propsSection = `### Props\n${propsToMarkdownTable(resolved)}\n`
    extrasSection = formatApiExtras(extractSlotsAndEvents(vuePath), resolved.docs)
  }

  const demoFiles = listDemoFiles(docDir)
  const demoBlocks = demoFiles.map((file) => {
    const code = fs.readFileSync(path.join(docDir, file), 'utf8').trim()
    return `#### ${demoTitle(file)}\n\`\`\`vue\n${code}\n\`\`\``
  })

  const demosSection = demoBlocks.length ?
    `### Demos\n${demoBlocks.join('\n\n')}` :
    ''

  return [
    `## ${meta.name}`,
    meta.description,
    '',
    propsSection,
    extrasSection,
    demosSection,
    '---',
    '',
  ].filter(Boolean).join('\n')
}

function writeComponentMarkdownFiles(allComponents) {
  const components = (allComponents || JSON.parse(fs.readFileSync(COMPONENTS_JSON, 'utf8')))
    .filter((entry) => entry.category === 'component')
  const exportMap = buildComponentExportMap()
  const outDir = path.join(PKG_ROOT, 'public/md/component')

  fs.mkdirSync(outDir, { recursive: true })

  // Remove stale markdown files
  for (const file of fs.readdirSync(outDir)) {
    if (file.endsWith('.md')) fs.unlinkSync(path.join(outDir, file))
  }

  for (const meta of components) {
    const slug = meta.url.replace('/component/', '')
    const section = buildComponentSection(meta, exportMap)
      .replace(/^## /m, '# ')
      .replace(/\n---\n?\s*$/, '\n')
    const docsUrl = `https://indielayer.com${meta.url}`
    const content = [
      section.trim(),
      '',
      `HTML docs: ${docsUrl}`,
      '',
    ].join('\n')

    fs.writeFileSync(path.join(outDir, `${slug}.md`), content)
  }

  console.log(`component markdown written (${components.length} files → public/md/component/)`)
}

function main() {
  if (!fs.existsSync(COMPONENTS_JSON)) {
    console.error('Missing components.json — run: pnpm gen:search')
    process.exit(1)
  }

  if (!fs.existsSync(PREAMBLE_PATH)) {
    console.error('Missing llms-full-preamble.md')
    process.exit(1)
  }

  const components = JSON.parse(fs.readFileSync(COMPONENTS_JSON, 'utf8'))
    .filter((entry) => entry.category === 'component')
  const exportMap = buildComponentExportMap()
  const preamble = fs.readFileSync(PREAMBLE_PATH, 'utf8').trim()
  const toc = buildToc(components)
  const body = components
    .sort((a, b) => a.name.localeCompare(b.name))
    .map((meta) => buildComponentSection(meta, exportMap))
    .join('\n')

  const content = [
    '<SYSTEM>This is the full developer documentation for Indielayer UI.</SYSTEM>',
    '',
    '# Indielayer UI Library — Full Reference',
    '',
    '---',
    '',
    toc,
    '',
    preamble,
    '',
    '# Components Full Reference',
    '',
    body,
  ].join('\n')

  fs.writeFileSync(OUTPUT, content)
  console.log(`llms-full.txt written (${components.length} components)`)
}

module.exports = { main, writeComponentMarkdownFiles, buildComponentSection }

if (require.main === module) main()
