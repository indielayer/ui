<script setup>
import { ref } from 'vue'
const checked = ref(true)
</script>

<template>
  <div class="space-x-4">
    <x-checkbox v-model="checked" label="Primary" color="primary" />
    <x-checkbox color="secondary" label="Secondary" />
    <x-checkbox color="success" label="Success" />
    <x-checkbox color="warning" label="Warning" />
    <x-checkbox color="error" label="Error" />
  </div>
</template>
