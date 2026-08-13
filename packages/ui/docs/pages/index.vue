<script setup lang="ts">
import DocsHero from '../components/common/DocsHero.vue'
import DocsFeatures from '../components/common/DocsFeatures.vue'
import { useDocMeta } from '../composables/useDocMeta'

useDocMeta({
  title: 'Indielayer UI',
  description: 'Tailwind CSS UI components for Vue.js 3 and Nuxt.js 3. Build and prototype fast web applications.',
  path: '/getting-started',
})

const tailwindSetupSnippet = `/* src/assets/tailwind.css */
@import "tailwindcss";
@import "@indielayer/ui/tailwind.css";

@source "../../index.html";
@source "../**/*.{vue,js,ts}";
@source "../../node_modules/@indielayer/ui/{lib,src}/**/*";

/* Optional: map semantic colors to Tailwind palettes */
@theme {
  --color-primary-500: var(--color-emerald-500);
  --color-secondary-500: var(--color-slate-500);
}`
</script>

<template>
  <docs-hero />
  <docs-features />

  <div class="docs-container">
    <section id="installation">
      <h2 class="text-h3 mb-2">Getting started</h2>
      <p class="text-gray-500 dark:text-gray-400 mb-8">
        Tailwind CSS UI components for Vue.js 3 / Nuxt.js 3. Build and prototype fast web applications.
      </p>

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
      <code-snippet :code="`pnpm create @indielayer/ui`" lang="bash"/>
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

      <h3 class="text-2xl mt-8 mb-4">2. Setup Tailwind CSS v4</h3>
      <p>Indielayer UI requires <b>Tailwind CSS v4</b> (Safari 16.4+, Chrome 111+, Firefox 128+). See the <x-link href="https://tailwindcss.com/docs/installation/using-vite" external shadow color="primary">Tailwind v4 install guide</x-link> and install <code class="text-sm">tailwindcss</code> plus <code class="text-sm">@tailwindcss/postcss</code> (Vite and Nuxt).</p>
      <p class="my-4">
        Import Indielayer theme tokens from <b>@indielayer/ui/tailwind.css</b> in your app stylesheet and register source paths for class scanning:
      </p>
      <code-snippet
        lang="css"
        :code="tailwindSetupSnippet"
      />
      <p class="my-4 text-sm text-gray-600 dark:text-gray-400">
        Add <code>@tailwindcss/postcss</code> to your PostCSS config (Vite <code>css.postcss.plugins</code> or Nuxt <code>postcss.plugins</code>). See the <x-link href="https://tailwindcss.com/docs/upgrade-guide" external shadow color="primary">upgrade guide</x-link> when migrating from v3.
      </p>
      <h3 class="text-2xl mt-8 mb-4">3. Load the UI in your project</h3>
      <h4 class="text-xl mt-8 mb-4">Load on a Vue 3 project</h4>
      <code-snippet
        lang="js"
        :code="`import { createApp } from 'vue'
import UI, { BaseTheme } from '@indielayer/ui'

const app = createApp(App)

app.use(UI, {
  theme: BaseTheme,
  defaults: {
    Alert: { outlined: true },
  },
})`"
      />
      <p class="my-4 text-sm text-gray-600 dark:text-gray-400">
        Use <code>defaults</code> to set app-wide prop defaults per component (e.g. all alerts outlined). Instance props still override when passed explicitly.
        Variant and layout booleans on themed components use <code>optionalBooleanProp()</code> so omitted attributes stay unset; plain <code>Boolean</code> props default to <code>false</code> in Vue and will not receive app defaults.
      </p>
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
        :code="`export default defineNuxtConfig({
  modules: [
    ['@indielayer/ui/nuxt'],
  ],
  css: ['~/assets/tailwind.css'],
  postcss: {
    plugins: {
      '@tailwindcss/postcss': {},
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
    </section>
  </div>
</template>
