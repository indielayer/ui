const fs = require('fs')
const path = require('path')

const GUIDES = [
  {
    name: 'Icons',
    description: 'Custom icon set integration for Indielayer UI components.',
    url: '/icons',
    category: 'guide',
  },
  {
    name: 'Colors',
    description: 'Color palette, semantic tokens, and color props on components.',
    url: '/colors',
    category: 'guide',
  },
  {
    name: 'Typography',
    description: 'Type scale and typography utilities used across the library.',
    url: '/typography',
    category: 'guide',
  },
]

const indexComponents = getAllFiles('./docs/pages/component').filter((filename) => filename.includes('index.vue'))

const components = createComponentIndex(indexComponents)
const index = [...GUIDES, ...components]

fs.writeFileSync('./docs/search/components.json', JSON.stringify(components))
fs.writeFileSync('./docs/search/index.json', JSON.stringify(index))
console.log(`search index updated (${components.length} components, ${GUIDES.length} guides)`)

function createComponentIndex(filesToFetch) {
  const collection = []

  filesToFetch.forEach((doc) => {
    const fileRead = fs.readFileSync(doc, { encoding: 'utf8' })

    if (doc.includes('index.vue')) {
      const titleMatch = fileRead.match(/const title = '([^']*)'/)
      const descriptionMatch = fileRead.match(/const description = '([^']*)'/)
      const title = titleMatch ? titleMatch[1] : null
      const description = descriptionMatch ? descriptionMatch[1] : null

      if (title && description) {
        collection.push({
          name: title,
          description,
          url: doc.replace('docs/pages', '').replace('/index.vue', ''),
          category: 'component',
        })
      }
    }
  })

  return collection
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach((file) => {
    if (fs.statSync(`${dirPath}/${file}`).isDirectory()) {
      arrayOfFiles = getAllFiles(`${dirPath}/${file}`, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file))
    }
  })

  return arrayOfFiles
}
