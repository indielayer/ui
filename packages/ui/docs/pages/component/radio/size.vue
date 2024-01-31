<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('a')
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <x-radio v-model="selected" size="xs" value="a" label="Option A" />
    <x-radio v-model="selected" size="sm" value="b" label="Option B" />
    <x-radio v-model="selected" size="md" value="c" label="Option C" />
    <x-radio v-model="selected" size="lg" value="d" label="Option D" />
    <x-radio v-model="selected" size="xl" value="e" label="Option E" />
  </div>
</template>
