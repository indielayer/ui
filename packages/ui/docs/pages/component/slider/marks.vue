<script setup lang="ts">
import { ref } from 'vue'

const value = ref(37)
const restricted = ref(20)

const marks = {
  0: '0°C',
  20: '20°C',
  37: '37°C',
  100: '100°C',
}
</script>

<template>
  <div class="grid gap-8 max-w-lg">
    <x-slider
      v-model="value"
      label="Marks"
      :marks="marks"
    />
    <x-slider
      v-model="restricted"
      label="Restrict selectable values"
      :marks="marks"
      step="mark"
      helper="Set step=&quot;mark&quot; to snap only to mark values"
    />
  </div>
</template>
