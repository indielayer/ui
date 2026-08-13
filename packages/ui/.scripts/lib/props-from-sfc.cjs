/**
 * Resolves Vue SFC prop definitions (including composable spreads) for llms-full tables.
 */
const fs = require('fs')
const path = require('path')

const PKG_ROOT = path.join(__dirname, '../..')
const COMPOSABLES_DIR = path.join(PKG_ROOT, 'src/composables')
const COMMON_PROPS = path.join(PKG_ROOT, 'src/common/props.ts')

const FACTORY_LOADERS = {
  'useCommon.props()': () => parseFactoryBlock(path.join(COMPOSABLES_DIR, 'useCommon.ts'), /useCommon\.props\s*=\s*\(\)\s*=>\s*\(\{([\s\S]*?)\}\s*as const\)/),
  'useInteractive.props()': () => parseFactoryBlock(path.join(COMPOSABLES_DIR, 'useInteractive.ts'), /useInteractive\.props\s*=\s*\(\)\s*=>\s*\(\{([\s\S]*?)\}\s*as const\)/),
  'useInputtable.props()': () => parseFactoryBlock(path.join(COMPOSABLES_DIR, 'useInputtable.ts'), /useInputtable\.props\s*=\s*\(\)\s*=>\s*\(\{([\s\S]*?)\}\s*as const\)/),
  'optionalBooleanProp()': () => ({ _optionalBoolean: { type: 'Boolean', default: '' } }),
  'variantBooleanProps()': () => parseVariantBooleanProps(),
}

function parseVariantBooleanProps() {
  const src = fs.readFileSync(COMMON_PROPS, 'utf8')
  const match = src.match(/export const variantBooleanProps = \(\) => \(\{([\s\S]*?)\}\)/)

  if (!match) return {}

  return parsePropsObjectBody(match[1])
}

function parseFactoryBlock(filePath, pattern) {
  const src = fs.readFileSync(filePath, 'utf8')
  const match = src.match(pattern)

  if (!match) return {}

  return parsePropsObjectBody(match[1])
}

function parsePropsObjectBody(body) {
  const props = {}
  const lines = body.split('\n').map((line) => line.trim()).filter(Boolean)

  for (const line of lines) {
    const spread = line.match(/^\.\.\.(\w+\.props\([^)]*\))$/)
    if (spread) continue

    const spreadVariant = line.match(/^\.\.\.variantBooleanProps\(\)$/)
    if (spreadVariant) {
      Object.assign(props, FACTORY_LOADERS['variantBooleanProps()']())
      continue
    }

    const keyMatch = line.match(/^(\w+):\s*(.+)$/)
    if (!keyMatch) continue

    const name = keyMatch[1]
    const value = keyMatch[2].replace(/,\s*$/, '')

    if (name === 'default') continue
    if (name === 'type' && /^(Array|Boolean|String|Number)(?:,|$)/.test(value)) continue

    props[name] = parsePropValue(value)
  }

  return props
}

function parsePropValue(value) {
  if (value === 'Boolean' || value === 'String' || value === 'Number' || value === 'Array' || value === 'Object' || value === 'Function') {
    return { type: value, default: '' }
  }

  if (value.startsWith('optionalBooleanProp()')) {
    return { type: 'Boolean', default: '' }
  }

  if (value.startsWith('[')) {
    return { type: formatTypeExpr(value), default: '' }
  }

  if (value.startsWith('{')) {
    const typeMatch = value.match(/type:\s*([^,}]+)/)
    const defaultMatch = value.match(/default:\s*([^,}]+)/)

    return {
      type: formatTypeExpr(typeMatch ? typeMatch[1].trim() : 'unknown'),
      default: defaultMatch ? formatDefaultExpr(defaultMatch[1].trim()) : '',
    }
  }

  return { type: value, default: '' }
}

function formatTypeExpr(expr) {
  return expr
    .replace(/as PropType<([^>]+)>/g, '$1')
    .replace(/PropType<([^>]+)>/g, '$1')
    .replace(/\s+as const/g, '')
    .replace(/\|/g, ' | ')
    .trim()
}

function formatDefaultExpr(expr) {
  if (expr === 'undefined') return ''
  if (expr.startsWith('() =>')) return '[]'
  return expr.replace(/['"]/g, '').trim()
}

function extractPlainScript(vueSource) {
  const match = vueSource.match(/<script lang="ts">([\s\S]*?)<\/script>/)

  return match ? match[1] : ''
}

function extractPropsBlock(plainScript) {
  const match = plainScript.match(/const\s+\w+Props\s*=\s*\{([\s\S]*)\n\}\s*\n\s*export type/)

  if (match) return match[1]

  const fallback = plainScript.match(/const\s+\w+Props\s*=\s*\{([\s\S]*?)\n\}/)

  return fallback ? fallback[1] : ''
}

function extractValidators(plainScript) {
  const validators = {}
  const blockMatch = plainScript.match(/validators:\s*\{([\s\S]*?)\n\s*\}/)

  if (!blockMatch) {
    const spreadMatch = plainScript.match(/validators:\s*\{([\s\S]*?)\}/)
    if (!spreadMatch) return validators

    const spreadOnly = spreadMatch[1].trim()
    if (spreadOnly.includes('useCommon.validators()')) {
      Object.assign(validators, { size: ['xs', 'sm', 'md', 'lg', 'xl'] })
    }

    return validators
  }

  const body = blockMatch[1]
  const arrayEntries = body.matchAll(/(\w+):\s*\[([^\]]+)\]/g)

  for (const entry of arrayEntries) {
    validators[entry[1]] = entry[2].split(',').map((v) => v.trim().replace(/['"]/g, ''))
  }

  return validators
}

function resolvePropsFromSfc(vueFilePath) {
  const vueSource = fs.readFileSync(vueFilePath, 'utf8')
  const plainScript = extractPlainScript(vueSource)

  if (!plainScript) return { props: {}, validators: {} }

  const body = extractPropsBlock(plainScript)
  const validators = extractValidators(plainScript)
  const merged = {}
  const sources = {}

  const lines = body.split('\n')

  for (const rawLine of lines) {
    const line = rawLine.trim()
    if (!line || line.startsWith('//')) continue

    const spreadFactory = line.match(/^\.\.\.(\w+\.props\(\)),?$/)
    if (spreadFactory) {
      const key = spreadFactory[1]
      const factory = FACTORY_LOADERS[key]
      if (factory) {
        const props = factory()
        for (const [name, def] of Object.entries(props)) {
          merged[name] = def
          sources[name] = key.replace('.props()', '')
        }
      }
      continue
    }

    const spreadColors = line.match(/^\.\.\.useColors\.props\(([^)]*)\),?$/)
    if (spreadColors) {
      const defaultColor = spreadColors[1].replace(/['"]/g, '') || undefined
      const props = defaultColor ?
        { color: { type: 'string', default: defaultColor } } :
        { color: { type: 'string', default: '' } }
      Object.assign(merged, props)
      for (const name of Object.keys(props)) sources[name] = 'useColors'
      continue
    }

    if (line === '...variantBooleanProps(),') {
      const props = FACTORY_LOADERS['variantBooleanProps()']()
      Object.assign(merged, props)
      for (const name of Object.keys(props)) sources[name] = 'variantBooleanProps'
      continue
    }

    const keyMatch = line.match(/^(\w+):\s*(.+?),?\s*$/)
    if (!keyMatch) continue

    const name = keyMatch[1]
    const value = keyMatch[2]

    if (name === 'default') continue
    if (name === 'type' && /^String(?:,|\s|$)/.test(value)) continue

    merged[name] = parsePropValue(value)
    sources[name] = 'component'
  }

  return { props: merged, validators, sources }
}

function propsToMarkdownTable({ props, validators, sources }) {
  const names = Object.keys(props).sort()

  if (names.length === 0) {
    return '| Name | Type | Default | Description |\n|------|------|---------|-------------|\n| _(none)_ | | | |\n'
  }

  const rows = names.map((name) => {
    const def = props[name]
    const type = def.type || 'unknown'
    const defaultVal = def.default ?? ''
    const values = validators[name] ? validators[name].join(', ') : ''
    let description = sources[name] && sources[name] !== 'component' ?
      `(from ${sources[name]})` :
      ''
    if (values) description = description ? `${description}; values: ${values}` : `values: ${values}`

    return `| ${name} | ${escapeCell(type)} | ${escapeCell(String(defaultVal))} | ${escapeCell(description)} |`
  })

  return [
    '| Name | Type | Default | Description |',
    '|------|------|---------|-------------|',
    ...rows,
  ].join('\n')
}

function escapeCell(text) {
  return String(text).replace(/\|/g, '\\|').replace(/\n/g, ' ')
}

function buildComponentExportMap() {
  const componentsDir = path.join(PKG_ROOT, 'src/components')
  const map = {}

  for (const dir of fs.readdirSync(componentsDir)) {
    const indexPath = path.join(componentsDir, dir, 'index.ts')
    if (!fs.existsSync(indexPath)) continue

    const src = fs.readFileSync(indexPath, 'utf8')
    const re = /export\s*\{\s*default\s+as\s+(X\w+)\s*\}\s*from\s*['"]\.\/(\w+)\.vue['"]/g
    let match

    while ((match = re.exec(src))) {
      map[match[1]] = {
        dir,
        vuePath: path.join(componentsDir, dir, `${match[2]}.vue`),
      }
    }
  }

  return map
}

function resolvePrimaryExport(indexSource, title) {
  const importMatch = indexSource.match(/import\s*\{([^}]+)\}\s*from\s*['"]@indielayer\/ui['"]/)
  if (!importMatch) return null

  const names = importMatch[1].split(',').map((part) => part.trim()).filter(Boolean)
  const normalized = title.replace(/\s+/g, '')

  for (const name of names) {
    if (name.slice(1) === normalized) return name
  }

  return names[0] || null
}

module.exports = {
  resolvePropsFromSfc,
  propsToMarkdownTable,
  buildComponentExportMap,
  resolvePrimaryExport,
}
