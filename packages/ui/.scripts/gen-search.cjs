const fs = require('fs')
const path = require('path')

const indexComponents = getAllFiles('./docs/pages/component').filter((filename) => filename.includes('index.vue'))

createSearchIndex(indexComponents, 'components')

function createSearchIndex(filesToFetch, filename) {
  const collection = []

  filesToFetch.forEach((doc) => {
    const fileRead = fs.readFileSync(doc, { encoding: 'utf8' })

    if (doc.includes('index.vue')) {
      const titleMatch = fileRead.match(/const title = '([^']*)'/);
      const descriptionMatch = fileRead.match(/const description = '([^']*)'/);
      const title = titleMatch ? titleMatch[1] : null;
      const description = descriptionMatch ? descriptionMatch[1] : null;

      if (title && description) {
        collection.push({
          name: title,
          description,
          url: doc.replace('docs/pages', '').replace('/index.vue', '')
        })
      }
    }
  })

  fs.writeFile(`./docs/search/${filename}.json`, JSON.stringify(collection), (error) => {
    if (error) throw error

    console.log(`${filename} search index updated!`)
  })
}

function getAllFiles(dirPath, arrayOfFiles = []) {
  const files = fs.readdirSync(dirPath)

  arrayOfFiles = arrayOfFiles || []

  files.forEach((file) => {
    if (fs.statSync(`${dirPath }/${ file}`).isDirectory()) {
      arrayOfFiles = getAllFiles(`${dirPath }/${ file}`, arrayOfFiles)
    } else {
      arrayOfFiles.push(path.join(dirPath, '/', file))
    }
  })

  return arrayOfFiles
}
