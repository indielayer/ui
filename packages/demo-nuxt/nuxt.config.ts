import tailwindcss from '@tailwindcss/vite'

// https://nuxt.com/docs/4.x/api/nuxt-config
export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  modules: [
    '@indielayer/ui/nuxt',
  ],
  css: ['~/assets/tailwind.css'],
  build: {
    transpile: ['@indielayer/ui'],
  },
  vite: {
    plugins: [
      tailwindcss(),
    ],
    optimizeDeps: {
      include: [
        '@vue/devtools-core',
        '@vue/devtools-kit',
        '@vuepic/vue-datepicker',
        '@vueuse/core',
        'floating-vue',
      ],
    },
  },
})
