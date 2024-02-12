<template>
  <h2 class="text-4xl font-semibold">Getting Started</h2>
  <h1 class="text-lg my-2 text-gray-500 dark:text-gray-400">Tailwind CSS UI components for Vue.js 3 / Nuxt.js 3. Build and prototype fast web applications.</h1>
  <x-divider class="mt-4 mb-8"/>

  <h3 class="text-2xl mb-4">Quickstart a new Vue 3 or Nuxt 3 project</h3>
  <p class="my-4">
    This following command will install and execute <x-link
      external
      href="https://github.com/indielayer/ui/tree/main/packages/create-ui"
      target="_blank"
      shadow
      color="primary"
    >@indielayer/create-ui</x-link>, the official Indielayer UI project scaffolding tool. You will be presented with prompts for a number of optional features such as TypeScript.
  </p>
  <code-snippet :code="`npm init @indielayer/ui`" lang="bash"/>
  <pre class="bg-slate-600 text-slate-50 text-xs mt-4 px-4 py-2 rounded-md">? Project type: › - Use arrow-keys. Return to submit.
❯   Vue 3
    Nuxt 3</pre>

  <h3 class="text-2xl mt-16 mb-4 text-gray-500">Manual guide</h3>
  <h3 class="text-2xl mb-4">1. Install via package manager</h3>
  <multi-snippet
    :snippets="[{
      label: 'npm',
      lang: 'bash',
      code: 'npm install @indielayer/ui'
    }, {
      label: 'yarn',
      lang: 'bash',
      code: 'yarn add @indielayer/ui'
    }, {
      label: 'pnpm',
      lang: 'bash',
      code: 'pnpm add @indielayer/ui'
    }]"
  />

  <h3 class="text-2xl mt-8 mb-4">2. Setup TailwindCSS</h3>
  <p>If you do not have Tailwind CSS 3 installed in your project, please see the <x-link href="https://tailwindcss.com/docs/guides/vite" external shadow color="primary">Tailwind 3 Vite install guide here</x-link> before proceeding.</p>
  <p class="my-4">
    Add Indielayer Tailwind CSS preset <b>tailwind.preset.js</b> to your Tailwind CSS configuration file tailwind.config.js and <b>purge css configurations.</b>
  </p>
  <code-snippet
    lang="js"
    :code="`// tailwind.config.js
const colors = require('tailwindcss/colors')
const indielayer = require('@indielayer/ui/tailwind.preset')

module.exports = {
  darkMode: 'class',
  // load indielayer ui presets
  presets: [indielayer()],
  // allow PurgeCSS to analyze components
  content: [
    './index.html',
    './**/*.vue',
    './src/**/*.{vue,js,ts,jsx,tsx}',
    'node_modules/@indielayer/ui/{lib,src}/**/*',
  ],
  theme: {
    extend: {
      colors: {
        primary: colors.emerald,
        secondary: colors.slate,
        success: colors.green,
        warning: colors.yellow,
        error: colors.red,
      },
    },
  },
  plugins: [],
}`"
  />
  <h3 class="text-2xl mt-8 mb-4">3. Load the UI in your project</h3>
  <h4 class="text-xl mt-8 mb-4">Load on a Vue 3 project</h4>
  <code-snippet
    lang="js"
    :code="`import { createApp } from 'vue'
import UI, { BaseTheme } from '@indielayer/ui'

const app = createApp(App)

app.use(UI, {
  theme: BaseTheme,
})`"
  />
  <h4 class="text-xl mt-8 mb-4">Load on a Nuxt 3 project</h4>
  <multi-snippet
    class="my-4"
    :snippets="[{
      label: 'npm',
      lang: 'bash',
      code: 'npm install @indielayer/ui @vueuse/core floating-vue @vuepic/vue-datepicker -D'
    }, {
      label: 'yarn',
      lang: 'bash',
      code: 'yarn add @indielayer/ui @vueuse/core floating-vue @vuepic/vue-datepicker -D'
    }, {
      label: 'pnpm',
      lang: 'bash',
      code: 'pnpm add @indielayer/ui @vueuse/core floating-vue @vuepic/vue-datepicker -D'
    }]"
  />
  <code-snippet
    lang="js"
    :code="`
// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: [
    ['@indielayer/ui/nuxt'],
  ],
  css: ['~/assets/tailwind.css'],
  /**
   * @tailwind base;
   * @tailwind components;
   * @tailwind utilities;
   */
  postcss: {
    plugins: {
      'tailwindcss/nesting': {},
      tailwindcss: {},
      autoprefixer: {},
    },
  },
})`"
  />
  <h3 class="text-2xl mt-8 mb-4">4. (optional) Load only the components you want</h3>
  <code-snippet
    lang="js"
    :code="`import { createApp } from 'vue'
import { createUI, BaseTheme, XButton, XAlert } from '@indielayer/ui'

const app = createApp(App)

const UI = createUI({
  components: [XButton, XAlert],
  theme: BaseTheme,
})

app.use(UI)`"
  />
</template>
