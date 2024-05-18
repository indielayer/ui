<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <div class="flex items-center space-x-4">
    <x-toggle v-model="checked" size="xs" label="xs"/>
    <x-toggle v-model="checked" size="sm" label="sm"/>
    <x-toggle v-model="checked" label="md"/>
    <x-toggle v-model="checked" size="lg" label="lg"/>
    <x-toggle v-model="checked" size="xl" label="xl"/>
  </div>
</template>
