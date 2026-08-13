import { createHighlighter, type Highlighter, type ThemeRegistrationRaw } from 'shiki'
import indielayerTheme from '../components/common/Indielayer-theme.json'

/** Theme id from {@link indielayerTheme} `name` field. */
export const INDIELAYER_THEME = 'Indielayer' as const

/** Languages used in docs code snippets. */
export const DOCS_CODE_LANGS = ['js', 'ts', 'vue-html', 'bash', 'vue'] as const

export type DocsCodeLang = typeof DOCS_CODE_LANGS[number]

// VS Code theme JSON uses `tokenColors`; Shiki accepts it at runtime via normalization.
const theme = indielayerTheme as unknown as ThemeRegistrationRaw

/**
 * Long-lived highlighter for docs code blocks.
 * @see https://shiki.style/guide/install#highlighter-usage
 */
export const docsHighlighter: Promise<Highlighter> = createHighlighter({
  langs: [...DOCS_CODE_LANGS],
  themes: [theme],
})
