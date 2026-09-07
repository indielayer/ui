<script setup lang="ts">
import { ref } from 'vue'

const terms = ref(false)
const newsletter = ref(true)
</script>

<template>
  <div class="grid gap-4 max-w-md">
    <p class="text-sm text-secondary-500 dark:text-secondary-400">
      Wrapper <code class="text-xs">class</code> rings the whole control.
      <code class="text-xs">aria-label</code> and <code class="text-xs">data-testid</code> sit on the hidden checkbox input.
    </p>
    <x-checkbox
      v-model="terms"
      class="ring-2 ring-primary-400/50 rounded-lg p-3 w-fit"
      aria-label="Accept terms and conditions"
      data-testid="demo-terms-checkbox"
    >
      Accept terms (accessible name from native aria-label)
    </x-checkbox>
    <x-checkbox
      v-model="newsletter"
      label="Email updates"
      class="ring-2 ring-sky-400/50 rounded-lg p-3 w-fit"
      data-testid="demo-newsletter-checkbox"
      title="Native checkbox title"
    />
  </div>
</template>
