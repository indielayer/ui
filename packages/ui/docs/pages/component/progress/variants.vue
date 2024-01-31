<template>
  <div class="grid grid-cols-3 gap-4">
    <x-progress :percentage="percentage" gradient color="sky" />
    <x-progress :percentage="percentage" color="rose" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
const percentage = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    percentage.value += 5
    if (percentage.value >= 100) clearTimeout(interval)
  }, 100)
})
</script>
