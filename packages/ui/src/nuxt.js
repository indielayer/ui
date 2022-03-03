import { join } from 'pathe'
import { defineNuxtModule } from '@nuxt/kit'

export default defineNuxtModule((nuxt) => ({
  async setup(options) {
    nuxt.hook('components:dirs', (dirs) => {
      dirs.push({
        path: join(__dirname, 'components'),
        prefix: options?.prefix ? options?.prefix : 'X',
      })

      // temp import XTab - would be XTabsTab
      dirs.push({
        path: join(__dirname, 'components/tabs'),
        prefix: options?.prefix ? options?.prefix : 'X',
      })
    })
  },
}))
