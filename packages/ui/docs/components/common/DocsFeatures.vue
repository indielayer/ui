<script setup lang="ts">
const features = [
  {
    icon: 'check-circle',
    title: 'Accessible by default',
    description: 'Keyboard-friendly components and sensible ARIA patterns out of the box.',
  },
  {
    icon: 'palette',
    title: 'Tailwind themes',
    description: 'Base and Carbon theme variants with a shared preset for your design tokens.',
  },
  {
    icon: 'cube',
    title: 'Tree-shakeable',
    description: 'Import only the components you need, or register the full library in one line.',
  },
  {
    icon: 'code',
    title: 'Vue 3 and Nuxt 3',
    description: 'First-class Vue plugin plus a Nuxt module for SSR-ready setups.',
  },
]
</script>

<template>
  <section class="docs-features mb-10">
    <div class="docs-container">
      <div class="text-overline text-primary-600 dark:text-primary-400 mb-3">Why Indielayer UI</div>
      <h2 class="text-h3 mb-8 text-gray-900 dark:text-white">Everything you need to ship faster</h2>

      <div class="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
        <div v-for="feature in features" :key="feature.title" class="min-w-0">
          <x-icon :icon="feature.icon" size="lg" class="text-primary-500 mb-3"/>
          <h3 class="text-lg font-bold text-gray-900 dark:text-white mb-2">{{ feature.title }}</h3>
          <p class="text-sm text-gray-600 dark:text-gray-400 m-0 leading-relaxed">{{ feature.description }}</p>
        </div>
      </div>
    </div>
  </section>
</template>
