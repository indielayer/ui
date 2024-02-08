import type { App, InjectionKey, MaybeRef } from 'vue'
import { injectIconsKey, injectOptionsKey, injectThemeKey } from './composables/keys'
import { injectThemeStyles, type UITheme } from './theme'
import type { IconInjection } from './components/icon/Icon.vue'

export type UIOptions = {
  prefix?: string;
  components?: any[];
  icons?: Record<string, any>;
  theme?: UITheme;
  injectIconsKey?: InjectionKey<IconInjection>;
  injectOptionsKey?: InjectionKey<UIOptions>;
  injectThemeKey?: InjectionKey<MaybeRef<UITheme>>;
}

const defaultOptions: UIOptions = {
  prefix: 'X',
  injectIconsKey,
  injectOptionsKey,
  injectThemeKey,
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

    app.provide(installOptions.injectOptionsKey || injectOptionsKey, options)
    app.provide(installOptions.injectIconsKey || injectIconsKey, options.icons || {})
    app.provide(installOptions.injectThemeKey || injectThemeKey, options.theme || {})

    if (options.theme?.styles) injectThemeStyles(options.theme.name || '', options.theme.styles)
  }

  return {
    install,
  }
}

export default create
