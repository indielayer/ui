<script setup lang="ts">
import { ref } from 'vue'

const date = ref(new Date())
</script>

<template>
  <x-datepicker
    v-model="date"
    label="Date"
    placeholder="Type a date…"
    text-input
    clearable
    :enable-time-picker="false"
  />
</template>
