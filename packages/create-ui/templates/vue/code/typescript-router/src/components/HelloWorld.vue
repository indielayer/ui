<script setup lang="ts">
defineProps<{
  msg: string
}>()
</script>

<template>
  <div class="text-center md:text-left">
    <h1 class="text-4xl font-semibold">{{ msg }}</h1>
    <h3 class="text-xl">
      You’ve successfully created a project with
      <x-link shadow color="emerald" target="_blank" href="https://vitejs.dev/">Vite</x-link> +
      <x-link shadow color="emerald" target="_blank" href="https://vuejs.org/">Vue 3</x-link> +
      <x-link shadow color="emerald" target="_blank" href="https://indielayer.com/ui">Indielayer UI</x-link>.
    </h3>
  </div>
</template>
