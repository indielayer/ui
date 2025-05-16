<script setup lang="ts">
import { ref } from 'vue'

const date = ref()
const startDate = new Date()
const endDate = new Date(new Date().setDate(startDate.getDate() + 7))

date.value = [startDate, endDate]
</script>

<template>
  <x-datepicker
    v-model="date"
    label="Date"
    tooltip="Use it to pick a date"
    clearable
    text-input
    multi-calendars
    time-picker-inline
    range
  />
</template>
