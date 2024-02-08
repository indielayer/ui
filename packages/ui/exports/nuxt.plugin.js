import { defineNuxtPlugin } from '#app'
import { BaseTheme, injectIconsKey, injectOptionsKey, injectThemeKey, createUI } from '../src'

export default defineNuxtPlugin((nuxtApp) => {
  const UI = createUI({
    ...nuxtApp.$config.public?.indielayerOptions,
    theme: BaseTheme,
    injectIconsKey,
    injectOptionsKey,
    injectThemeKey,

  })

  nuxtApp.vueApp.use(UI)
})
