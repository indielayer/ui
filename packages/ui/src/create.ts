import type { App } from 'vue'
import { injectIconsKey, injectOptionsKey, injectThemeKey } from './composables/keys'
import { injectThemeStyles, type UITheme } from './theme'

export type UIOptions = {
  prefix?: string;
  components?: any[];
  icons?: Record<string, any>;
  theme?: UITheme;
}

const defaultOptions: UIOptions = {
  prefix: 'X',
}

const create = (createOptions: UIOptions = {}) => {
  const install = (app: App, installOptions: UIOptions = {}) => {
    const options: UIOptions = {
      ...defaultOptions,
      ...createOptions,
      ...installOptions,
    }

    if (options.components)
      options.components.forEach((component: any) => {
        const name = component.name.startsWith('X') ? component.name.slice(1) : component.name

        if (!app.component(`${options.prefix}${name}`)) app.component(`${options.prefix}${name}`, component)
      })

    app.provide(injectOptionsKey, options)
    app.provide(injectIconsKey, options.icons || {})
    app.provide(injectThemeKey, options.theme || {})

    if (options.theme?.styles) injectThemeStyles(options.theme.name || '', options.theme.styles)
  }

  return {
    install,
  }
}

export default create
