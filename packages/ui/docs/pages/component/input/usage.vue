<script setup lang="ts">
import { ref } from 'vue'
const name = ref('John')
const title = ref('')
</script>

<template>
  <div class="grid gap-6">
    <x-input
      v-model="name"
      label="Name"
      name="name"
      placeholder="Placeholder"
      helper="Helper text here"
      tooltip="Tooltip here"
      clearable
    />

    <x-input
      v-model="title"
      label="Title with character counter"
      name="title"
      maxlength="50"
      show-counter
      helper="Character counter is displayed"
      placeholder="Enter a title (max 50 characters)"
    />
  </div>
</template>
