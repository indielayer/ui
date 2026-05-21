<script setup lang="ts">
import { XButton, XLink } from '@indielayer/ui'
</script>

<template>
  <div class="flex flex-col items-center justify-center h-screen bg-[#001e26] text-[#accac8]">
    <div class="text-2xl">Welcome!</div>
    <div class="mt-6">Documentation links to get you started:</div>
    <div class="flex flex-col space-y-8 my-6 text-center">
      <x-button
        color="emerald"
        shadow
      >
        Click me
      </x-button>
      <x-link
        href="https://vuejs.org/"
        color="emerald"
        shadow
        external
        target="_blank"
      >Vue 3</x-link>
      <x-link
        href="https://indielayer.com/ui"
        color="emerald"
        shadow
        external
        target="_blank"
      >Indielayer UI</x-link>
    </div>
  </div>
</template>
