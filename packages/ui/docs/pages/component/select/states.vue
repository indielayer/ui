<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('A')
const options = ref([
  { value: 'A', label: 'Option A' },
  { value: 'B', label: 'Option B' },
])
</script>

<template>
  <div class="grid md:grid-cols-4 gap-4">
    <x-select v-model="selected" label="Disabled" disabled :options="options"/>
    <x-select v-model="selected" label="Read Only" readonly :options="options"/>
    <x-select v-model="selected" label="Loading" loading :options="options"/>
    <x-select v-model="selected" label="Error" error="Invalid input" :options="options"/>
  </div>
</template>
