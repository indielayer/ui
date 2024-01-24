<script setup lang="ts">
import { ref } from 'vue'

const step = ref(1)
const steps = [
  { label: 'Initial step', description: 'This is the description', status: 'complete' },
  { label: 'One more step i know', status: 'incomplete' },
  { label: 'Almost there', status: 'error' },
  { label: 'Lets go' },
  { label: 'Finish line', disabled: true },
]
</script>

<template>
  <x-stepper v-model="step" :steps="steps">
    <div v-if="step === 0">Initial step!</div>
    <div v-if="step === 1">One more step!</div>
    <div v-if="step === 2">Almost there!</div>
    <div v-if="step === 3">Finish line!</div>
  </x-stepper>
</template>
