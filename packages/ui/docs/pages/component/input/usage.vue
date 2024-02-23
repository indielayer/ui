<script setup lang="ts">
import { ref } from 'vue'
const name = ref(0)
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
