<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(true)
</script>

<template>
  <x-checkbox v-model="checked" label="Checkbox label" color="primary" />
</template>
