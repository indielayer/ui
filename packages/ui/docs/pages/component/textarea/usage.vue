<script setup lang="ts">
import { ref } from 'vue'

const multiline = ref('')
const comment = ref('')
</script>

<template>
  <div class="grid gap-6">
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

    <x-textarea
      v-model="comment"
      label="Comment with character counter"
      maxlength="200"
      show-counter
      helper="Maximum 200 characters"
      placeholder="Enter your comment"
      rows="4"
    />
  </div>
</template>
