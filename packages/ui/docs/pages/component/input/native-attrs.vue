<script setup lang="ts">
import { ref } from 'vue'

const email = ref('')
</script>

<template>
  <div class="grid gap-3 max-w-md">
    <p class="text-sm text-secondary-500 dark:text-secondary-400">
      The ring and padding come from <code class="text-xs">class</code> on the wrapper.
      Hover the field for the native <code class="text-xs">title</code> tooltip; inspect to see
      <code class="text-xs">autocomplete</code> and <code class="text-xs">data-testid</code> on the
      <code class="text-xs">&lt;input&gt;</code>.
    </p>
    <x-input
      v-model="email"
      label="Email"
      name="email"
      placeholder="you@example.com"
      helper="autocomplete=&quot;email&quot; on the native input"
      class="ring-2 ring-primary-400/50 rounded-lg p-3"
      autocomplete="email"
      title="Native input title — hover shows this tooltip"
      data-testid="demo-email-input"
      spellcheck="false"
    />
  </div>
</template>
