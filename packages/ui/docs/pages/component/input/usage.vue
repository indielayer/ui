<script setup lang="ts">
import { ref } from 'vue'
const name = ref('John')
const title = ref('')
const amount = ref('')
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

    <x-input
      v-model="amount"
      label="Amount"
      inputmode="decimal"
      enterkeyhint="done"
      helper="Virtual keyboard uses decimal inputmode"
      placeholder="0.00"
    />
  </div>
</template>
