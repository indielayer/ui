<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('monthly')
</script>

<template>
  <div class="inline-flex gap-2">
    <x-radio-button
      v-model="selected"
      value="monthly"
      label="Monthly"
      color="primary"
      light
      outlined
    />
    <x-radio-button
      v-model="selected"
      value="yearly"
      label="Yearly"
      color="primary"
      light
      outlined
    />
  </div>
</template>
