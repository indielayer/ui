import { defineNuxtModule } from '@nuxt/kit'
import UI from '@indielayer/ui'

export default defineNuxtModule({
  meta: {
    name: '@indielayer/ui',
    configKey: 'indielayer',
    compatibility: {
      nuxt: '^3.0.0',
    },
  },
  defaults: {
    prefix: 'X',
  },
  async setup(moduleOptions, nuxt) {
    // plugin install
    nuxt.vueApp.use(UI, { prefix: 'X' })

    // nuxt install
    // nuxt.hook('components:dirs', (dirs) => {
    //   dirs.push({
    //     path: join(__dirname, 'components'),
    //     prefix: options?.prefix ? options?.prefix : 'X',
    //   })

    //   // temp import XTab - would be XTabsTab
    //   dirs.push({
    //     path: join(__dirname, 'components/tabs'),
    //     prefix: options?.prefix ? options?.prefix : 'X',
    //   })
    // })
  },
})
