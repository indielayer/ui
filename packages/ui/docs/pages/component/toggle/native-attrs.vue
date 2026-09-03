<script setup lang="ts">
import { ref } from 'vue'

const darkMode = ref(false)
</script>

<template>
  <div class="grid gap-3 max-w-md">
    <p class="text-sm text-secondary-500 dark:text-secondary-400">
      Wrapper ring from <code class="text-xs">class</code>; native checkbox gets
      <code class="text-xs">aria-label</code>, <code class="text-xs">title</code>, and
      <code class="text-xs">data-testid</code>.
    </p>
    <x-toggle
      v-model="darkMode"
      label="Dark mode"
      class="ring-2 ring-primary-400/50 rounded-lg p-3 w-fit"
      aria-label="Enable dark mode"
      title="Native toggle title — hover the switch area"
      data-testid="demo-dark-mode-toggle"
    />
  </div>
</template>
