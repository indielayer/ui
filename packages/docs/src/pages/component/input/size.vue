<script setup>
import { ref } from 'vue'
const other = ref('Sample text')
</script>

<template>
  <div class="grid grid-cols-4 gap-2">
    <x-input v-model="other" size="sm"/>
    <x-input v-model="other" size="md"/>
    <x-input v-model="other" size="lg"/>
    <x-input v-model="other" size="xl"/>
  </div>
</template>
