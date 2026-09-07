<script setup lang="ts">
import { ref } from 'vue'

const notes = ref('')
</script>

<template>
  <div class="grid gap-3 max-w-md">
    <p class="text-sm text-secondary-500 dark:text-secondary-400">
      Wrapper <code class="text-xs">class</code> adds the ring; native
      <code class="text-xs">title</code>, <code class="text-xs">spellcheck</code>, and
      <code class="text-xs">data-testid</code> bind to the <code class="text-xs">&lt;textarea&gt;</code>.
    </p>
    <x-textarea
      v-model="notes"
      label="Notes"
      name="notes"
      rows="3"
      placeholder="Type here…"
      helper="spellcheck=&quot;false&quot; on the native textarea"
      class="ring-2 ring-primary-400/50 rounded-lg p-3"
      title="Native textarea title — hover inside the field"
      data-testid="demo-notes-textarea"
      spellcheck="false"
    />
  </div>
</template>
