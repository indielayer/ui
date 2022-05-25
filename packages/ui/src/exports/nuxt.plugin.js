import { defineNuxtPlugin } from '#app'
import UI from '@indielayer/ui'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(UI, {
    prefix: 'X',
  })
})
