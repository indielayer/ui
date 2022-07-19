<script setup lang="ts">
import { computed, ref } from 'vue'

const textClasses = {
  'text-xs': {
    size: '0.75rem',
    line: '1rem',
  },
  'text-sm': {
    size: '0.875rem',
    line: '1.25rem',
  },
  'text-base': {
    size: '1rem',
    line: '1.5rem',
  },
  'text-lg': {
    size: '1.125rem',
    line: '1.75rem',
  },
  'text-xl': {
    size: '1.25rem',
    line: '1.75rem',
  },
  'text-2xl': {
    size: '1.5rem',
    line: '2rem',
  },
  'text-3xl': {
    size: '1.875rem',
    line: '2.25rem',
  },
  'text-4xl': {
    size: '2.25rem',
    line: '2.5rem',
  },
  'text-5xl': {
    size: '3rem',
    line: 'auto',
  },
  'text-6xl': {
    size: '3.75rem',
    line: 'auto',
  },
  'text-7xl': {
    size: '4.5rem',
    line: 'auto',
  },
  'text-8xl': {
    size: '6rem',
    line: 'auto',
  },
  'text-9xl': {
    size: '8rem',
    line: 'auto',
  },
}

</script>

<template>
  <section class="p-4 lg:p-8 max-w-4xl xl:max-w-7xl mx-auto">
    <h1 class="text-4xl font-semibold">Typography</h1>
    <h2 class="text-lg my-2 text-gray-500 dark:text-gray-400">Big letters, small letters, fonts and stuff</h2>

    <x-divider class="mt-4 mb-8"/>

    <div>
      <div>Main font</div>
      <div class="text-gray-500 dark:text-gray-400">Inter</div>
      <div class="text-6xl mt-4">AaBbCc</div>
    </div>

    <div class="mt-10">
      <table class="text-left w-full">
        <tr>
          <th class="py-2">Class</th>
          <th>Size</th>
          <th>Line Height</th>
          <th>Preview</th>
        </tr>
        <tr v-for="(c, key) in textClasses" :key="key" class="border-t">
          <td class="py-2">{{ key }}</td>
          <td class="text-secondary-500 font-light">{{ c.size }}</td>
          <td class="text-secondary-500 font-light">{{ c.line }}</td>
          <td :class="key" class="max-w-lg truncate">Preview text</td>
        </tr>
      </table>
    </div>

    <div class="text-secondary-500 mt-4">
      See more about Tailwind typography classes here -> <x-link href="https://tailwindcss.com/docs/font-size" target="_blank" underline>Tailwind Documentation</x-link>
    </div>
  </section>
</template>
