<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('a')
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <x-radio v-model="selected" disabled value="a" label="Disabled" />
    <x-radio v-model="selected" loading value="b" label="Loading" />
    <x-radio v-model="selected" error="Invalid input" value="a" label="Error" />
  </div>
</template>
