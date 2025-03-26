<script setup lang="ts">
import { ref } from 'vue'

const selectedMultiple = ref<string[]>(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'])

const options = ref([
  { value: 'A', label: 'Option lorem ipsum' },
  { value: 'B', label: 'Option B ipsum' },
  { value: 'C', label: 'Option C lorem ipsum' },
  { value: 'D', label: 'D' },
  { value: 'E', label: 'E ipsum' },
  { value: 'F', label: 'Option F' },
  { value: 'G', label: 'Option lorem ipsum qoiwjdoqiwjdoqiwjdoqiwjdoi' },
  { value: 'H', label: 'Option H' },
  { value: 'I', label: 'lorem ipsum dolo' },
  { value: 'J', label: 'Option J' },
  { value: 'K', label: 'Option K' },
  { value: 'L', label: 'consectetur adipi' },
  { value: 'M', label: 'Option M' },
])
</script>

<template>
  <div class="grid md:grid-cols-2 gap-4">
    <x-select
      v-model="selectedMultiple"
      label="Multi select"
      placeholder="Multiple"
      :options="options"
      filterable
      multiple
    />
    <x-select
      v-model="selectedMultiple"
      label="Multi select - truncate"
      placeholder="Multiple"
      :options="options"
      multiple
      truncate
    />
    <x-select
      v-model="selectedMultiple"
      label="Multi select - checkbox"
      placeholder="Multiple"
      :options="options"
      multiple-checkbox
      filterable
    />
  </div>
</template>
