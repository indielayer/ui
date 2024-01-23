<script setup>
import { ref } from 'vue'
const password = ref('secret')
const other = ref('I have an icon')
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <x-input
      v-model="password"
      label="Password input"
      type="password"
      show-password-toggle
    />
    <x-input v-model="other" label="Input with icon" icon-left="smile"/>
    <x-input v-model="other" label="Icon on the right" icon-right="smile" />
  </div>
</template>
