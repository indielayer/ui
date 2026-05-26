<script setup lang="ts">
import { ref } from 'vue'

const plan = ref('pro')
</script>

<template>
  <x-form-group v-model="plan" label="Billing plan">
    <x-radio-button
      size="sm"
      value="starter"
      label="Starter"
      color="primary"
    />
    <x-radio-button
      size="sm"
      value="pro"
      label="Pro"
      color="primary"
    />
    <x-radio-button
      size="sm"
      value="team"
      label="Team"
      color="primary"
    />
  </x-form-group>
</template>
