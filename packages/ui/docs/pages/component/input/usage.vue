<script setup lang="ts">
import { ref } from 'vue'
const name = ref('John')
</script>

<template>
  <x-input
    v-model="name"
    label="Name"
    name="name"
    placeholder="Placeholder"
    helper="Helper text here"
    tooltip="Tooltip here"
  />
</template>
