<script setup lang="ts">
import { ref } from 'vue'
const name = ref('invalid input')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <x-textarea disabled label="Disabled"/>
    <x-textarea readonly label="Read only"/>
    <x-textarea v-model="name" label="Error" error="Invalid input" />
  </div>
</template>
