import { useHead } from '@unhead/vue'

const SITE_URL = 'https://indielayer.com'
const SITE_NAME = 'Indielayer'
const DEFAULT_OG_IMAGE = `${SITE_URL}/card.jpg`
const LLMS_TXT = `${SITE_URL}/llms.txt`

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
  const isComponent = Boolean(options.path?.startsWith('/component/'))
  const componentSlug = isComponent ? options.path!.replace('/component/', '') : null
  const markdownUrl = componentSlug
    ? `${SITE_URL}/md/component/${componentSlug}.md`
    : undefined

  const breadcrumbItems = [
    {
      '@type': 'ListItem',
      position: 1,
      name: 'Docs',
      item: `${SITE_URL}/getting-started`,
    },
  ]

  if (isComponent && options.title) {
    breadcrumbItems.push({
      '@type': 'ListItem',
      position: 2,
      name: options.title,
      item: url,
    })
  }

  const schema = [
    {
      '@context': 'https://schema.org',
      '@type': 'WebPage',
      name: pageTitle,
      description,
      url,
      isPartOf: {
        '@type': 'WebSite',
        name: SITE_NAME,
        url: SITE_URL,
      },
    },
    {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: breadcrumbItems,
    },
  ]

  const links: Array<Record<string, string>> = [
    { rel: 'canonical', href: url },
    { rel: 'describedby', href: LLMS_TXT },
  ]

  if (markdownUrl) {
    links.push({
      rel: 'alternate',
      type: 'text/markdown',
      href: markdownUrl,
    })
  }

  useHead({
    title: pageTitle,
    meta: [
      { name: 'description', content: description },
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
    link: links,
    script: [
      {
        type: 'application/ld+json',
        children: JSON.stringify(schema),
      },
    ],
  })
}
