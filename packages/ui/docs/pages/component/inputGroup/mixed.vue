<script setup lang="ts">
import { ref } from 'vue'

const unit = ref('km')
const distance = ref('')

const unitOptions = [
  { value: 'km', label: 'km' },
  { value: 'mi', label: 'mi' },
]
</script>

<template>
  <x-input-group label="Distance">
    <x-select v-model="unit" :options="unitOptions" class="!w-28" />
    <x-input v-model="distance" placeholder="0" type="number" />
  </x-input-group>
</template>
