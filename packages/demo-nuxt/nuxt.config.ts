import { colors } from '@indielayer/ui'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    ['@indielayer/ui/nuxt', {
      theme: {
        colors: {
          primary: colors.emerald,
          secondary: colors.slate,
          success: colors.green,
          warning: colors.yellow,
          error: colors.red,
        },
      },
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
