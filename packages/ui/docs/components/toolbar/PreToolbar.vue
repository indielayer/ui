<script setup lang="ts">
import ToolbarColorToggle from './ToolbarColorToggle.vue'
</script>

<template>
  <x-container fluid class="bg-gray-900 dark">
    <div class="flex justify-items-center items-center py-2 text-slate-500 dark:text-slate-300 h-10 text-sm">
      <toolbar-color-toggle class="shrink-0" />
      <p class="text-secondary-300 font-semibold mx-2 truncate">
        Indielayer UI - Vue.js 3 / Nuxt.js 3 UI Library with Tailwind CSS 3. ⚡️ &nbsp;Build and prototype fast web applications.
      </p>
      <x-spacer/>
      <a target="_blank" class="shrink-0" href="https://github.com/indielayer"><x-icon size="sm" icon="github"/></a>
    </div>
  </x-container>
</template>
