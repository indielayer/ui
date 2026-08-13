<script setup lang="ts">
import { ref } from 'vue'
const password = ref('secret')
const other = ref('I have an icon')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <x-input
      v-model="password"
      label="Password input"
      type="password"
      show-password-toggle
    />
    <x-input v-model="other" label="Input with icon" icon-left="smile"/>
    <x-input v-model="other" label="Icon on the right" icon-right="smile" />
    <x-input
      v-model="other"
      icon="smile"
      label="Icon and suffix slot"
      class="md:col-span-3"
      clearable
    >
      <template #suffix>
        <span class="text-secondary-400 text-xs">min</span>
      </template>
    </x-input>
  </div>
</template>
