<script setup lang="ts">
import { ref } from 'vue'

const value = ref('https://indielayer.com')
const selected = ref('M')
const options = [
  { value: 'L', label: 'Low' },
  { value: 'M', label: 'Medium' },
  { value: 'Q', label: 'Quartile' },
  { value: 'H', label: 'High' },
]
</script>

<template>
  <div class="grid grid-cols-2 gap-4 mb-2">
    <x-input v-model="value" label="QR Code Value"/>
    <x-select v-model="selected" native :options="options" label="Error correction"/>
  </div>
  <x-qr-code :value="value" size="140" :error-correction-level="selected"/>
</template>
