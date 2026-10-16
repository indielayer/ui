<script setup lang="ts">
import { ref } from 'vue'

const value = ref(50)
</script>

<template>
  <div class="grid gap-8 max-w-lg pt-8">
    <x-slider
      v-model="value"
      label="Value tooltip"
      show-tooltip
      helper="Hover or focus the track to see the current value"
    />
    <x-slider
      v-model="value"
      label="Format tooltip"
      show-tooltip
      :format-tooltip="(v) => `${v}%`"
      helper="Use formatTooltip to customize the tip text"
    />
  </div>
</template>
