import { defineNuxtConfig } from 'nuxt'
import { colors } from '@indielayer/ui'

// https://v3.nuxtjs.org/api/configuration/nuxt.config
export default defineNuxtConfig({
  modules: [
    ['@indielayer/ui/nuxt', {
      colors: {
        primary: colors.emerald,
        secondary: colors.slate,
        success: colors.green,
        warning: colors.yellow,
        error: colors.red,
      },
    }],
  ],
  css: ['~/assets/tailwind.css'],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          'tailwindcss/nesting': {},
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
})
