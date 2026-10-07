import fs from 'fs'
import { resolve } from 'path'
import cleanCSS from 'clean-css'

const cleanCss = new cleanCSS()
const fileRegex = /\.(css|postcss)$/

/** Marker left in the entry during transform; replaced after CSS is collected. */
export const INJECT_MARKER = 'console.warn("__INJECT__")'
/** Survives quote/template rewrites from minifiers (Vite 8 / Rolldown). */
export const INJECT_MARKER_RE = /console\.warn\(["'`]__INJECT__["'`]\)/

export const injectCode = (code) =>
  `function styleInject(css,ref){if(ref===void 0){ref={}}var insertAt=ref.insertAt;if(!css||typeof document==="undefined"){return}var head=document.head||document.getElementsByTagName("head")[0];var style=document.createElement("style");style.type="text/css";if(insertAt==="top"){if(head.firstChild){head.insertBefore(style,head.firstChild)}else{head.appendChild(style)}}else{head.appendChild(style)}if(style.styleSheet){style.styleSheet.cssText=css}else{style.appendChild(document.createTextNode(css))}};styleInject(\`${code}\`)`

let viteConfig
let css = []

/**
 * Replace the inject marker with runtime CSS injection.
 * @param {string} code
 * @param {string[]} [cssChunks]
 * @returns {string | null} replaced code, or null when no marker is present
 */
export function replaceInjectMarker(code, cssChunks = css) {
  if (!code.includes('__INJECT__')) return null

  if (!INJECT_MARKER_RE.test(code)) {
    throw new Error('[lib-inject-css] failed to replace __INJECT__ marker')
  }

  // Non-global today; reset in case the regex gains /g later.
  INJECT_MARKER_RE.lastIndex = 0

  return code.replace(INJECT_MARKER_RE, injectCode(cssChunks.join('')))
}

export default function libInjectCss() {
  return {
    name: 'lib-inject-css',

    apply: 'build',

    buildStart() {
      css = []
    },

    configResolved(resolvedConfig) {
      viteConfig = resolvedConfig
    },

    transform(code, id) {
      if (fileRegex.test(id)) {
        css.push(cleanCss.minify(code).styles)

        return {
          code: '',
        }
      }

      const entry = viteConfig?.build?.lib?.entry

      if (entry && id.includes(entry)) {
        return {
          code: `${code}
          ${INJECT_MARKER}`,
        }
      }

      return null
    },

    generateBundle(_options, bundle) {
      for (const chunk of Object.values(bundle)) {
        if (chunk.type !== 'chunk') continue

        const next = replaceInjectMarker(chunk.code)

        if (next !== null) chunk.code = next
      }
    },

    async writeBundle(_, bundle) {
      // Fallback for any output still written with the marker (e.g. edge formats).
      for (const [fileName] of Object.entries(bundle)) {
        const { root } = viteConfig
        const outDir = viteConfig.build.outDir || 'dist'
        const filePath = resolve(root, outDir, fileName)

        if (!fs.existsSync(filePath)) continue

        const data = fs.readFileSync(filePath, {
          encoding: 'utf8',
        })

        const next = replaceInjectMarker(data)

        if (next !== null) fs.writeFileSync(filePath, next)
      }
    },
  }
}
