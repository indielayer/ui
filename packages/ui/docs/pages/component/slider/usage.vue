<script setup lang="ts">
import { ref } from 'vue'
const value = ref(30)
</script>

<template>
  <x-slider v-model="value" label="Slider 1">
    <template #prefix="ctx">
      <div class="w-12">{{ ctx.value }}%</div>
    </template>
  </x-slider>
  <x-slider v-model="value" label="Slider 2" helper="Slide me" class="mt-10"/>
</template>
