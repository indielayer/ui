<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(true)
</script>

<template>
  <div class="grid grid-cols-5">

    <x-checkbox v-model="checked" label="Lorem ipsum dolor sit amet consectetur adipisicing elit. Itaque, unde." color="primary" />
    <x-checkbox color="secondary" label="Secondary" />
    <x-checkbox color="success" label="Success" />
    <x-checkbox color="warning" label="Warning" />
    <x-checkbox color="error" label="Error" />
  </div>
</template>
