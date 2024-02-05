<script setup lang="ts">
import { ref } from 'vue'

const multiline = ref('')
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <x-textarea
      v-model="multiline"
      label="Normal textarea"
      helper="Helper text"
      resizable
      placeholder="Placeholder"
      tooltip="Tooltip here"
    />
    <x-textarea v-model="multiline" label="Multiline adjust" adjust-to-text />
  </div>
</template>
