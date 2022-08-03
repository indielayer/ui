<script setup lang="ts">
import { computed, ref } from 'vue'
import { useColors, useNotifications, colors as TailwindColors } from '@indielayer/ui'

const notifications = useNotifications()
const { getPalette } = useColors()

// const color500 = ref('#10B981')
const color500 = ref('#F46262')

const palette = computed(() => getPalette(color500.value))

function copyPalette(val: any) {
  const el = document.createElement('textarea')

  el.value = JSON.stringify(val, null, 2)
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)

  notifications.success('Copied to clipboard!')
}
</script>

<template>
  <div>
    <section class="p-4 lg:p-8 max-w-4xl xl:max-w-7xl mx-auto">
      <h1 class="text-4xl font-semibold">Colors</h1>
      <h2 class="text-lg my-2 text-gray-500 dark:text-gray-400">Generate your own palettes, use Tailwind's or use color prop to generate at runtime</h2>
      <x-divider class="mt-4 mb-8"/>

      <h2 class="text-2xl mb-2">Generate your own palettes</h2>
      <p class="mb-8 text-gray-500 dark:text-gray-400">Generate your own color palette like Tailwind. With the same properties as Tailwind color palettes.</p>
      <p class="font-medium"></p>
      <div class="mt-4">
        <x-input v-model="color500" label="Change here the middle value (500) to generate a new palette"/>
      </div>
      <div class="grid grid-cols-10 my-4 text-sm">
        <div class="h-32 flex items-center justify-center" :style="`background-color: ${palette[50]}`">50</div>
        <div class="h-32 flex items-center justify-center" :style="`background-color: ${palette[100]}`">100</div>
        <div class="h-32 flex items-center justify-center" :style="`background-color: ${palette[200]}`">200</div>
        <div class="h-32 flex items-center justify-center" :style="`background-color: ${palette[300]}`">300</div>
        <div class="h-32 flex items-center justify-center" :style="`background-color: ${palette[400]}`">400</div>
        <div class="h-32 flex items-center justify-center" :style="`background-color: ${palette[500]}`">500</div>
        <div class="h-32 flex items-center justify-center" :style="`background-color: ${palette[600]}`">600</div>
        <div class="h-32 flex items-center justify-center" :style="`background-color: ${palette[700]}`">700</div>
        <div class="h-32 flex items-center justify-center" :style="`background-color: ${palette[800]}`">800</div>
        <div class="h-32 flex items-center justify-center" :style="`background-color: ${palette[900]}`">900</div>
      </div>

      <x-button icon-left="copy" :color="color500" block @click="copyPalette(palette)">Copy Palette</x-button>

      <p class="text-gray-500 dark:text-gray-400 mt-4">This is the generated palette when you use the color directly on the color prop like &#x3C;x-button <b>color="#10B981"</b>&#x3E;Hello&#x3C;/x-button&#x3E;</p>

      <x-divider class="mt-4 mb-8"/>

      <h2 class="text-2xl mb-2">Theme colors</h2>
      <p class="mb-8 text-gray-500 dark:text-gray-400">Default theme color names and how to customize them.</p>

      <p>The default theme color names are
        <b class="text-sky-500">primary</b>,
        <b class="text-secondary-500">secondary</b>,
        <b class="text-success-500">success</b>,
        <b class="text-warning-500">warning</b> and
        <b class="text-error-500">error</b>.
        You can customize them or even add your own.
      </p>

      <p class="my-4"></p>

      <p class="my-2">Customize the color prop, e.g. <b>color="primary"</b> on the UI initialization.</p>
      <code-snippet
        lang="js"
        :code="`import { createApp } from 'vue'
import UI, { colors } from '@indielayer/ui'
import '@indielayer/ui/styles'

const app = createApp(App)

app.use(UI, {
  prefix: 'X',
  colors: {
    primary: ${JSON.stringify(palette, null, 2)},
    secondary: colors.slate,
    success: colors.green,
    warning: colors.yellow,
    error: colors.red,
  },
})`"
      />

      <p class="my-4">Allow you to use the Tailwind classes like <b>text-primary-500</b>, <b>bg-primary-500</b>, etc:</p>

      <div>
        <code-snippet
          lang="js"
          :code="`// tailwind.config.js
//...
const colors = require('tailwindcss/colors')

module.exports = {
  //...
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
}`"
        />
      </div>

      <x-divider class="mt-4 mb-8"/>

      <h2 class="text-2xl mb-2">Tailwind Colors</h2>
      <p class="mb-8 text-gray-500 dark:text-gray-400">Default tailwind color palettes.</p>

      <div class="grid gap-6 grid-cols-1 md:grid-cols-2 text-xs">
        <div v-for="(pal, key) in TailwindColors" :key="key">
          <div class="text-overline mb-2">{{ key }}</div>
          <div class="grid grid-cols-10">
            <div v-for="(color, palKey) in pal" :key="palKey" class="h-32 flex items-center justify-center" :style="`background-color: ${color}`">{{ palKey }}</div>
          </div>
        </div>
      </div>
    </section>
  </div>

</template>
