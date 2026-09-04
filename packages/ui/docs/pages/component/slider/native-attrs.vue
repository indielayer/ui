<script setup lang="ts">
import { ref } from 'vue'

const volume = ref(40)
</script>

<template>
  <div class="grid gap-3 max-w-md">
    <p class="text-sm text-secondary-500 dark:text-secondary-400">
      Wrapper styling vs native range attrs — inspect the slider thumb’s
      <code class="text-xs">&lt;input type=&quot;range&quot;&gt;</code> for
      <code class="text-xs">aria-label</code> and <code class="text-xs">data-testid</code>.
    </p>
    <x-slider
      v-model="volume"
      label="Volume"
      helper="aria-label on the native range input"
      class="ring-2 ring-primary-400/50 rounded-lg p-3"
      aria-label="Volume level"
      data-testid="demo-volume-slider"
    />
  </div>
</template>
