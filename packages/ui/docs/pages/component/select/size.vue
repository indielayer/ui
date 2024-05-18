<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<undefined | string>()
const options = ref([
  { value: 'A', label: 'Option A' },
  { value: 'B', label: 'Option B' },
])
</script>

<template>
  <div class="grid md:grid-cols-5 gap-4">
    <x-select v-model="selected" :options="options" placeholder="xs" size="xs" />
    <x-select v-model="selected" :options="options" placeholder="sm" size="sm" />
    <x-select v-model="selected" :options="options" placeholder="md"/>
    <x-select v-model="selected" :options="options" placeholder="lg" size="lg" />
    <x-select v-model="selected" :options="options" placeholder="xl" size="xl" />
  </div>
</template>
