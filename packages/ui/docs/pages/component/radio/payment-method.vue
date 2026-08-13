<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('a')
</script>

<template>
  <div class="max-w-md space-y-1">
    <x-radio
      v-model="selected"
      value="a"
      label="Credit card"
      class="border p-3 rounded w-full"
      :class="{ 'bg-emerald-50 dark:bg-gray-800 border-emerald-400 dark:border-emerald-800': selected === 'a' }"
    >
      <div class="text-gray-400 font-light text-sm">VISA · · · · 2592</div>
    </x-radio>
    <x-radio
      v-model="selected"
      value="b"
      label="Bank account"
      class="border p-3 rounded w-full"
      :class="{ 'bg-emerald-50 dark:bg-gray-800 border-emerald-400 dark:border-emerald-800': selected === 'b' }"
    >
      <div class="text-gray-400 font-light text-sm">Santander · · · · 1580</div>
    </x-radio>
  </div>
</template>
