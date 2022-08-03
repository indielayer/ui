<script setup>
import { ref } from 'vue'
const value = ref(0)
</script>

<template>
  <div class="grid gap-2 grid-cols-3">
    <x-slider v-model="value" label="Slider 1" class="w-full">
      <template #prefix="ctx">
        <div class="w-12 text-sm">{{ ctx.value }}%</div>
      </template>
    </x-slider>
    <x-slider v-model="value" label="Slider 2 (gradient)" gradient/>
  </div>
</template>
