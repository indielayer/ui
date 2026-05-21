const fs = require('fs')
const path = require('path')

const SITE_URL = 'https://indielayer.com'
const COMPONENTS_JSON = path.join(__dirname, '../docs/search/components.json')
const OUTPUT = path.join(__dirname, '../public/sitemap.xml')

const STATIC_PATHS = [
  '/getting-started',
  '/icons',
  '/colors',
  '/typography',
]

function main() {
  if (!fs.existsSync(COMPONENTS_JSON)) {
    console.error('Missing components.json — run: pnpm gen:search')
    process.exit(1)
  }

  const components = JSON.parse(fs.readFileSync(COMPONENTS_JSON, 'utf8'))
  const paths = [...STATIC_PATHS, ...components.map((c) => c.url)]
  const today = new Date().toISOString().slice(0, 10)

  const urls = paths.map((p) => `  <url>
    <loc>${SITE_URL}${p}</loc>
    <lastmod>${today}</lastmod>
  </url>`).join('\n')

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`

  fs.writeFileSync(OUTPUT, xml)
  console.log(`sitemap.xml written (${paths.length} URLs)`)
}

main()
