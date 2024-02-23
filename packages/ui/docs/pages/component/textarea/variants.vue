<script setup lang="ts">
import { ref } from 'vue'
const sizes = ref('Text size')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <x-textarea v-model="sizes" label="xs" size="xs" />
    <x-textarea v-model="sizes" label="sm" size="sm" />
    <x-textarea v-model="sizes" label="md" />
    <x-textarea v-model="sizes" label="lg" size="lg" />
    <x-textarea v-model="sizes" label="xl" size="xl" />
  </div>
</template>
