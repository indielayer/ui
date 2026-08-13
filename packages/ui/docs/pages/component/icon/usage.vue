<script setup lang="ts">
import { computed, ref } from 'vue'
import docsIcons from '../../../icons'

const query = ref('')

const iconNames = computed(() =>
  Object.keys(docsIcons).sort().filter((name) =>
    name.toLowerCase().includes(query.value.trim().toLowerCase()),
  ),
)
</script>

<template>
  <div class="space-y-6 max-w-3xl">
    <p class="text-sm text-secondary-600 dark:text-secondary-400">
      Icons below are loaded from
      <code class="text-xs bg-secondary-100 dark:bg-secondary-800 px-1 py-0.5 rounded">packages/ui/docs/icons.ts</code>
      and passed to <code class="text-xs bg-secondary-100 dark:bg-secondary-800 px-1 py-0.5 rounded">app.use(UI, { icons })</code>
      in the docs app. See the
      <x-link to="/icons" color="primary">Icons guide</x-link>
      to build your own set.
    </p>

    <x-input
      v-model="query"
      label="Filter icons"
      placeholder="Search by name…"
      clearable
      class="max-w-xs"
    />

    <div
      v-if="iconNames.length"
      class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2"
    >
      <div
        v-for="name in iconNames"
        :key="name"
        class="flex flex-col items-center gap-1.5 p-3 rounded-md border border-secondary-200 dark:border-secondary-700 bg-secondary-50/50 dark:bg-secondary-900/30"
        :title="name"
      >
        <x-icon :icon="name" size="lg" class="text-secondary-800 dark:text-secondary-200" />
        <span class="text-[10px] leading-tight text-secondary-500 dark:text-secondary-400 truncate w-full text-center">
          {{ name }}
        </span>
      </div>
    </div>

    <p v-else class="text-sm text-secondary-500">
      No icons match “{{ query }}”.
    </p>
  </div>
</template>
