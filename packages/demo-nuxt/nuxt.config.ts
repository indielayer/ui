// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    ['@indielayer/ui/nuxt'],
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
