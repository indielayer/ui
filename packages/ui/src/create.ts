import type { App } from 'vue'
import type { ColorLibrary } from './composables/colors'
import { injectColorsKey, injectIconsKey } from './composables/keys'

export interface IndielayerUIOptions {
  prefix?: string,
  components?: any,
  colors?: ColorLibrary,
  icons?: any
}

const defaultOptions: IndielayerUIOptions = {
  prefix: 'X',
}

const create = (createOptions: IndielayerUIOptions = {}) => {
  const install = (app: App, installOptions: IndielayerUIOptions = {}) => {
    const options = {
      ...defaultOptions,
      ...createOptions,
      ...installOptions,
    }

    if (options.components)
      options.components.forEach((component: any) => {
        app.component(`${options.prefix}${component.name.slice(1)}`, component)
      })

    app.provide(injectColorsKey, options.colors)
    app.provide(injectIconsKey, options.icons)
  }

  return {
    install,
  }
}

export default create
