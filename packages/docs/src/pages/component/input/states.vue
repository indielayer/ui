<script setup>
import { ref } from 'vue'
const name = ref('not a valid input')
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <x-input value="disabled" disabled label="Disabled"/>
    <x-input v-model="name" label="Error" error="Invalid input" />
  </div>
</template>
