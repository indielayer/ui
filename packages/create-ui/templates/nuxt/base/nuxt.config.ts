import { colors } from '@indielayer/ui'
import icons from './icons'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    ['@indielayer/ui/nuxt', {
      icons,
      prefix: 'X',
      theme: {
        classPrefix: 'x-',
        colors: {
          primary: colors.emerald,
          secondary: colors.slate,
          success: colors.green,
          warning: colors.yellow,
          error: colors.red,
        },
      }
    }],
  ],
  css: ['~/assets/tailwind.css'],
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
