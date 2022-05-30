import { defineNuxtPlugin } from '#app'
import create from '../src/create'

export default defineNuxtPlugin((nuxtApp) => {
  const UI = create(nuxtApp.$config.indielayerOptions)

  nuxtApp.vueApp.use(UI)
})
