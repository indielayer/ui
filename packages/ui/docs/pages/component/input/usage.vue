<script setup>
import { ref } from 'vue'
const name = ref('')
</script>

<template>
  <div class="flex">
    <x-input
      v-model="name"
      label="Label here"
      placeholder="Placeholder"
      helper="Helper text here"
    />
  </div>
</template>
