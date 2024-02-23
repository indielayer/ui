<script setup lang="ts">
import { ref } from 'vue'
const name = ref('not a valid input')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <x-input disabled label="Disabled"/>
    <x-input value="readonly" readonly label="Read only"/>
    <x-input v-model="name" label="Error" error="Invalid input" />
  </div>
</template>
