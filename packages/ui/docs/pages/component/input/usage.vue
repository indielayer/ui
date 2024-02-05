<script setup lang="ts">
import { ref } from 'vue'
const name = ref('')
</script>

<template>
  <x-input
    v-model="name"
    label="Label here"
    placeholder="Placeholder"
    helper="Helper text here"
    tooltip="Tooltip here"
  />
</template>
