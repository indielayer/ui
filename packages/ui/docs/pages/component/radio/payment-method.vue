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
      class="border p-3 rounded-lg w-full [&>div]:flex-row-reverse [&>div]:items-start [&>div]:justify-between [&>div]:gap-3 [&>div>div:last-child>div]:!pl-0"
      :class="{ 'bg-primary-50 dark:bg-primary-950 border-primary-400 dark:border-primary-800': selected === 'a' }"
    >
      <div class="text-gray-400 font-light text-sm">VISA · · · · 2592</div>
    </x-radio>
    <x-radio
      v-model="selected"
      value="b"
      label="Bank account"
      class="border p-3 rounded-lg w-full [&>div]:flex-row-reverse [&>div]:items-start [&>div]:justify-between [&>div]:gap-3 [&>div>div:last-child>div]:!pl-0"
      :class="{ 'bg-primary-50 dark:bg-primary-950 border-primary-400 dark:border-primary-800': selected === 'b' }"
    >
      <div class="text-gray-400 font-light text-sm">Santander · · · · 1580</div>
    </x-radio>
  </div>
</template>
