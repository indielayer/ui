<script setup>
import { ref } from 'vue'
const name = ref('')
</script>

<template>
  <x-input v-model="name" label="Label here" placeholder="Placeholder" block />
</template>
