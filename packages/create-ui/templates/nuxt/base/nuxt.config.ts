import icons from './icons'

// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    ['@indielayer/ui/nuxt', {
      icons,
    }],
  ],
  css: ['~/assets/tailwind.css'],
  build: {
    transpile: ['@indielayer/ui'],
  },
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})
