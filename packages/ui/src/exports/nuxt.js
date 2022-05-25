import { defineNuxtModule, addPlugin, createResolver } from '@nuxt/kit'

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
    nuxt.options.css.push('@indielayer/ui/styles')

    // Create resolver to resolve relative paths
    const { resolve } = createResolver(import.meta.url)

    // plugin install
    addPlugin(resolve('./nuxt.plugin.js'))

    //// nuxt install
    // nuxt.hook('components:dirs', (dirs) => {
    //   dirs.push({
    //     path: join(__dirname, 'components'),
    //     prefix: options?.prefix ? options?.prefix : 'X',
    //   })
  },
})
