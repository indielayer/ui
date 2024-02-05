<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <x-toggle v-model="checked" label="Primary" />
    <x-toggle v-model="checked" color="sky" label="Sky" />
  </div>
</template>
