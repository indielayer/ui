/**
 * Resolves Vue SFC prop definitions (including composable spreads) for llms-full tables.
 */
const fs = require('fs')
const path = require('path')

const PKG_ROOT = path.join(__dirname, '../..')
const COMPOSABLES_DIR = path.join(PKG_ROOT, 'src/composables')
const COMMON_PROPS = path.join(PKG_ROOT, 'src/common/props.ts')

function extractBalancedObject(source, startIndex) {
  if (source[startIndex] !== '{') return null

  let depth = 0
  let inString = null
  let escaped = false

  for (let i = startIndex; i < source.length; i++) {
    const ch = source[i]

    if (inString) {
      if (escaped) {
        escaped = false
        continue
      }
      if (ch === '\\') {
        escaped = true
        continue
      }
      if (ch === inString) inString = null
      continue
    }

    if (ch === '\'' || ch === '"' || ch === '`') {
      inString = ch
      continue
    }

    if (ch === '{') depth++
    if (ch === '}') {
      depth--
      if (depth === 0) return source.slice(startIndex + 1, i)
    }
  }

  return null
}

function extractObjectAfterKey(source, key) {
  const keyMatch = source.match(new RegExp(`${key}\\s*:\\s*\\{`))

  if (!keyMatch || keyMatch.index == null) return null

  const braceIndex = source.indexOf('{', keyMatch.index + key.length)

  return extractBalancedObject(source, braceIndex)
}

function extractDocsMeta(plainScript) {
  const docsBody = extractObjectAfterKey(plainScript, 'docs')

  if (!docsBody) return { slots: {}, emits: {}, methods: {} }

  const result = { slots: {}, emits: {}, methods: {} }
  const inputtableEmitDocs = {
    'update:modelValue': 'Emitted when the bound value changes (v-model).',
    blur: 'Emitted when the field loses focus.',
    focus: 'Emitted when the field receives focus.',
    input: 'Emitted on native input events.',
    change: 'Emitted when the value is committed (change).',
  }
  const inputtableMethodDocs = {
    focus: 'Focus the underlying control.',
    blur: 'Remove focus from the underlying control.',
    reset: 'Reset the field value and validation state.',
    validate: 'Run validation rules and return whether the field is valid.',
    setError: 'Set an external error message on the field.',
  }

  for (const key of ['slots', 'emits', 'methods']) {
    const section = extractObjectAfterKey(docsBody, key)

    if (!section) continue

    result[key] = extractStringMap(section)

    if (key === 'emits' && /useInputtable\.emitDocs\s*\(/.test(section)) {
      const falseOnly = /useInputtable\.emitDocs\s*\(\s*false\s*\)/.test(section)

      Object.assign(result[key], falseOnly ?
        { 'update:modelValue': inputtableEmitDocs['update:modelValue'] } :
        inputtableEmitDocs)
    }

    if (key === 'methods' && /useInputtable\.methodDocs\s*\(/.test(section)) {
      Object.assign(result[key], inputtableMethodDocs)
    }
  }

  return result
}

function parseFactoryObject(source, assignPattern) {
  const match = source.match(assignPattern)

  if (!match || match.index == null) return {}

  const braceIndex = source.indexOf('{', match.index + match[0].length - 1)

  // assignPattern should end just before `{` or include it — find first `{` after match start
  const from = source.indexOf('{', match.index)

  if (from < 0) return {}

  const body = extractBalancedObject(source, from)

  return body ? parsePropsObjectBody(body) : {}
}

function parseVariantBooleanProps() {
  const src = fs.readFileSync(COMMON_PROPS, 'utf8')

  return parseFactoryObject(src, /export const variantBooleanProps\s*=\s*\(\)\s*=>\s*/)
}

function parseFactoryBlock(filePath, assignPattern) {
  const src = fs.readFileSync(filePath, 'utf8')

  return parseFactoryObject(src, assignPattern)
}

const FACTORY_LOADERS = {
  'useCommon.props()': () => parseFactoryBlock(path.join(COMPOSABLES_DIR, 'useCommon.ts'), /useCommon\.props\s*=\s*\(\)\s*=>\s*/),
  'useInteractive.props()': () => parseFactoryBlock(path.join(COMPOSABLES_DIR, 'useInteractive.ts'), /useInteractive\.props\s*=\s*\(\)\s*=>\s*/),
  'useInputtable.props()': () => parseFactoryBlock(path.join(COMPOSABLES_DIR, 'useInputtable.ts'), /useInputtable\.props\s*=\s*\(\)\s*=>\s*/),
  'optionalBooleanProp()': () => ({ _optionalBoolean: { type: 'Boolean', default: '', description: '' } }),
  'variantBooleanProps()': () => parseVariantBooleanProps(),
}

function extractQuotedString(text) {
  const match = text.match(/^(?:'((?:\\'|[^'])*)'|"((?:\\"|[^"])*)"|`((?:\\`|[^`])*)`)/)

  if (!match) return null

  return (match[1] ?? match[2] ?? match[3] ?? '').replace(/\\(['"`])/g, '$1')
}

function extractStringConsts(plainScript) {
  const consts = {}
  const matches = plainScript.matchAll(/const\s+([A-Z_][A-Z0-9_]*)\s*=\s*(['"`])([\s\S]*?)\2/g)

  for (const match of matches) {
    consts[match[1]] = match[3].replace(/\\(['"`])/g, '$1')
  }

  return consts
}

function extractDescriptionFromObject(value, stringConsts = {}) {
  const literal = value.match(/description:\s*(['"`])([\s\S]*?)\1/)

  if (literal) return literal[2].replace(/\\(['"`])/g, '$1')

  const ident = value.match(/description:\s*([A-Z_][A-Z0-9_]*)/)

  if (ident && stringConsts[ident[1]] != null) return stringConsts[ident[1]]

  return ''
}

function splitTopLevelEntries(body) {
  const entries = []
  let depth = 0
  let start = 0
  let inString = null
  let escaped = false

  for (let i = 0; i < body.length; i++) {
    const ch = body[i]

    if (inString) {
      if (escaped) {
        escaped = false
        continue
      }
      if (ch === '\\') {
        escaped = true
        continue
      }
      if (ch === inString) inString = null
      continue
    }

    if (ch === '\'' || ch === '"' || ch === '`') {
      inString = ch
      continue
    }

    if (ch === '{' || ch === '[' || ch === '(') depth++
    if (ch === '}' || ch === ']' || ch === ')') depth = Math.max(0, depth - 1)

    if (ch === ',' && depth === 0) {
      const chunk = body.slice(start, i).trim()

      if (chunk) entries.push(chunk)
      start = i + 1
    }
  }

  const last = body.slice(start).trim()

  if (last) entries.push(last)

  return entries
}

function parsePropsObjectBody(body, stringConsts = {}) {
  const props = {}
  const entries = splitTopLevelEntries(body)

  for (const entry of entries) {
    const spread = entry.match(/^\.\.\.(\w+\.props\([^)]*\))$/)
    if (spread) continue

    if (entry === '...variantBooleanProps()') {
      Object.assign(props, FACTORY_LOADERS['variantBooleanProps()']())
      continue
    }

    const optionalNamed = entry.match(/^(\w+):\s*optionalBooleanProp\((.*)\)$/s)
    if (optionalNamed) {
      const description = extractQuotedString(optionalNamed[2].trim()) || ''

      props[optionalNamed[1]] = { type: 'Boolean', default: '', description }
      continue
    }

    const keyMatch = entry.match(/^(\w+)\s*:\s*([\s\S]+)$/)
    if (!keyMatch) continue

    const name = keyMatch[1]
    const value = keyMatch[2].trim()

    if (name === 'default') continue
    if (name === 'type' && /^(Array|Boolean|String|Number)(?:,|$)/.test(value)) continue

    props[name] = parsePropValue(value, stringConsts)
  }

  return props
}

function parsePropValue(value, stringConsts = {}) {
  if (value === 'Boolean' || value === 'String' || value === 'Number' || value === 'Array' || value === 'Object' || value === 'Function') {
    return { type: value, default: '', description: '' }
  }

  if (value.startsWith('optionalBooleanProp(')) {
    const arg = value.slice('optionalBooleanProp('.length, -1).trim()

    return { type: 'Boolean', default: '', description: extractQuotedString(arg) || '' }
  }

  if (value.startsWith('[')) {
    return { type: formatTypeExpr(value), default: '', description: '' }
  }

  if (value.startsWith('{')) {
    const typeMatch = value.match(/type:\s*(\[[^\]]*\]|[^,}]+)/)
    const defaultMatch = value.match(/default:\s*([^,}]+)/)

    return {
      type: formatTypeExpr(typeMatch ? typeMatch[1].trim() : 'unknown'),
      default: defaultMatch ? formatDefaultExpr(defaultMatch[1].trim()) : '',
      description: extractDescriptionFromObject(value, stringConsts),
    }
  }

  return { type: value, default: '', description: '' }
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

function extractNamedObjectBody(plainScript, name) {
  const decl = plainScript.match(new RegExp(`const\\s+${name}\\s*=\\s*\\{`))

  if (!decl || decl.index == null) return ''

  const braceIndex = plainScript.indexOf('{', decl.index)
  const body = extractBalancedObject(plainScript, braceIndex)

  return body || ''
}

function extractPropsBlock(plainScript) {
  const typeMatch = plainScript.match(/ExtractPublicPropTypes<\s*typeof\s+(\w+)\s*>/)

  if (typeMatch) {
    const body = extractNamedObjectBody(plainScript, typeMatch[1])

    if (body) return body
  }

  const match = plainScript.match(/const\s+\w+Props\s*=\s*\{/)

  if (!match || match.index == null) return ''

  const braceIndex = plainScript.indexOf('{', match.index)
  const body = extractBalancedObject(plainScript, braceIndex)

  return body || ''
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

function extractStringMap(block) {
  const map = {}
  // Bare keys (show) or quoted keys ('update:modelValue', 'item-[column]', '[stepValue]')
  const entries = block.matchAll(/(?:['"`]([^'"`]+)['"`]|([\w:\-*[\]]+))\s*:\s*(['"`])([\s\S]*?)\3/g)

  for (const entry of entries) {
    const key = entry[1] || entry[2]

    map[key] = entry[4].replace(/\\(['"`])/g, '$1')
  }

  return map
}

function resolvePropsFromSfc(vueFilePath) {
  const vueSource = fs.readFileSync(vueFilePath, 'utf8')
  const plainScript = extractPlainScript(vueSource)

  if (!plainScript) return { props: {}, validators: {}, sources: {}, docs: { slots: {}, emits: {}, methods: {} } }

  const body = extractPropsBlock(plainScript)
  const validators = extractValidators(plainScript)
  const docs = extractDocsMeta(plainScript)
  const stringConsts = extractStringConsts(plainScript)
  const merged = {}
  const sources = {}

  const entries = splitTopLevelEntries(body)

  for (const entry of entries) {
    const spreadFactory = entry.match(/^\.\.\.(\w+\.props\(\))$/)
    if (spreadFactory) {
      const key = spreadFactory[1]
      const factory = FACTORY_LOADERS[key]
      if (factory) {
        const props = factory()
        for (const [name, def] of Object.entries(props)) {
          merged[name] = def
          sources[name] = key.replace('.props()', '')
        }
        continue
      }
    }

    const localSpread = entry.match(/^\.\.\.([A-Za-z_]\w*)$/)
    if (localSpread) {
      const localBody = extractNamedObjectBody(plainScript, localSpread[1])

      if (localBody) {
        const props = parsePropsObjectBody(localBody, stringConsts)

        for (const [name, def] of Object.entries(props)) {
          merged[name] = def
          sources[name] = localSpread[1]
        }
      }
      continue
    }

    const spreadColors = entry.match(/^\.\.\.useColors\.props\(([^)]*)\)$/)
    if (spreadColors) {
      const defaultColor = spreadColors[1].replace(/['"]/g, '') || undefined
      const colorFactory = parseFactoryBlock(
        path.join(COMPOSABLES_DIR, 'useColors.ts'),
        /useColors\.props\s*=\s*\([^)]*\)\s*=>\s*/,
      )
      const colorProp = colorFactory.color || { type: 'String', default: '', description: '' }

      merged.color = {
        ...colorProp,
        default: defaultColor || (colorProp.default === 'defaultColor' ? '' : colorProp.default) || '',
      }
      sources.color = 'useColors'
      continue
    }

    if (entry === '...variantBooleanProps()') {
      const props = FACTORY_LOADERS['variantBooleanProps()']()
      Object.assign(merged, props)
      for (const name of Object.keys(props)) sources[name] = 'variantBooleanProps'
      continue
    }

    const keyMatch = entry.match(/^(\w+)\s*:\s*([\s\S]+)$/)
    if (!keyMatch) continue

    const name = keyMatch[1]
    const value = keyMatch[2].trim()

    if (name === 'default') continue
    if (name === 'type' && /^String(?:,|\s|$)/.test(value)) continue

    merged[name] = parsePropValue(value, stringConsts)
    sources[name] = 'component'
  }

  return { props: merged, validators, sources, docs }
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
    const authored = (def.description || '').trim()
    let description = authored

    if (!description && sources[name] && sources[name] !== 'component') {
      description = `(from ${sources[name]})`
    }
    if (values && !description.includes(values)) {
      description = description ? `${description} Values: ${values}.` : `Values: ${values}.`
    }

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

  // Virtual components live under src/virtual/
  const virtualIndex = path.join(PKG_ROOT, 'src/virtual/index.ts')

  if (fs.existsSync(virtualIndex)) {
    const src = fs.readFileSync(virtualIndex, 'utf8')
    const re = /export\s*\{\s*default\s+as\s+(X\w+)\s*\}\s*from\s*['"]\.\/([^'"]+)['"]/g
    let match

    while ((match = re.exec(src))) {
      map[match[1]] = {
        dir: 'virtual',
        vuePath: path.join(PKG_ROOT, 'src/virtual', match[2]),
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
  extractDocsMeta,
  extractPlainScript,
}
