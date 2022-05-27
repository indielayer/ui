import type { App } from 'vue'
import type { ColorLibrary } from './composables/colors'
import { tailwindColors as colors } from './composables/colors-utils'
import { injectColorsKey } from './composables/keys'

export interface IndielayerUIOptions {
  prefix?: string,
  components?: any,
  colors?: ColorLibrary
}

const defaultColors = {
  primary: colors.sky,
  secondary: colors.slate,
  success: colors.green,
  warning: colors.yellow,
  error: colors.red,
}

const defaultOptions: IndielayerUIOptions = {
  prefix: 'X',
  colors: defaultColors,
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
  }

  return {
    install,
  }
}

export default create
