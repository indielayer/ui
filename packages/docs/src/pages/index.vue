<template>
  <div>
    <section class="p-8 max-w-4xl xl:max-w-7xl mx-auto py-14">
      <h2 class="text-h2 mb-8">Getting Started</h2>
      <h1 class="text-xl">Tailwind CSS UI components for Vue.js 3. Build and prototype fast web applications.</h1>
      <x-divider class="mt-4 mb-8"/>

      <x-note variant="warning" class="my-8">This library is still in development. It's pre-alpha for testing purposes and for Indielayer internal tools.</x-note>

      <h3 class="text-2xl mb-4">1. Install via package manager</h3>
      <multi-snippet
        :snippets="[{
          title: 'npm',
          lang: 'bash',
          code: 'npm install @indielayer/ui'
        }, {
          title: 'yarn',
          lang: 'bash',
          code: 'yarn add @indielayer/ui'
        }]"
      />

      <h3 class="text-2xl mt-8 mb-4">2. Setup TailwindCSS</h3>
      <p class="my-4">
        Add Indielayer Tailwind CSS preset <b>tailwind.preset.js</b> to your Tailwind CSS configuration file tailwind.config.js and <b>purge css configurations.</b>
      </p>
      <code-snippet
        :code="`// tailwind.config.js
const indielayer = require('@indielayer/ui/tailwind.preset')

module.exports = {
  presets: [indielayer]
  purge: {
    content: [
      'node_modules/@indielayer/ui/src/**/*.vue',
      ...
    ],
  },
}`"
      />
      <h3 class="text-2xl mt-8 mb-4">3. Load the UI in your Vue project</h3>
      <code-snippet
        :code="`import { createApp } from 'vue'
import UI from '@indielayer/ui'

const app = createApp(App)

app.use(UI, { prefix: 'X' })`"
      />
    </section></div>
</template>
