import { useHead } from '@unhead/vue'

const SITE_URL = 'https://indielayer.com'
const SITE_NAME = 'Indielayer'
const DEFAULT_OG_IMAGE = `${SITE_URL}/card.jpg`
const DEFAULT_KEYWORDS = 'indielayer, vue, vue 3, nuxt, nuxt 3, tailwind css, ui kit, ui library, ui components, component library'

export function useDocMeta(options: {
  title: string;
  description?: string;
  path?: string;
}) {
  const pageTitle = options.title === 'Indielayer UI'
    ? 'Indielayer UI — Vue 3 component library'
    : `${options.title} — Indielayer UI`

  const description = options.description
    || 'Vue 3 and Tailwind CSS UI components for fast web applications.'
  const url = options.path ? `${SITE_URL}${options.path}` : SITE_URL

  useHead({
    title: pageTitle,
    meta: [
      { name: 'description', content: description },
      { name: 'keywords', content: DEFAULT_KEYWORDS },
      { property: 'og:site_name', content: SITE_NAME },
      { property: 'og:title', content: pageTitle },
      { property: 'og:description', content: description },
      { property: 'og:url', content: url },
      { property: 'og:type', content: 'website' },
      { property: 'og:image', content: DEFAULT_OG_IMAGE },
      { property: 'og:image:width', content: '1440' },
      { property: 'og:image:height', content: '731' },
      { property: 'og:image:type', content: 'image/jpeg' },
      { property: 'og:image:alt', content: SITE_NAME },
      { name: 'twitter:card', content: 'summary_large_image' },
      { name: 'twitter:site', content: '@indielayer' },
      { name: 'twitter:image', content: DEFAULT_OG_IMAGE },
      { name: 'twitter:image:alt', content: SITE_NAME },
      { name: 'twitter:title', content: pageTitle },
      { name: 'twitter:description', content: description },
    ],
    link: [
      { rel: 'canonical', href: url },
    ],
  })
}
