<script setup lang="ts">
import { ref } from 'vue'
const selected = ref('a')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <x-radio v-model="selected" name="inputName" value="a" label="Option A" />
    <x-radio v-model="selected" name="inputName" value="b" label="Option B" />
    <x-radio v-model="selected" name="inputName" value="c" label="Option C" />
    <x-radio v-model="selected" name="inputName" value="d" label="Option D" />
  </div>
</template>
