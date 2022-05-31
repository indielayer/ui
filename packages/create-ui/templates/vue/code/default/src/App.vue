<script setup>
import HelloWorld from './components/HelloWorld.vue'
import TheWelcome from './components/TheWelcome.vue'
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-[#001e26] dark text-[#accac8] flex-col">
    <div class="max-w-2xl">
      <HelloWorld msg="Welcome!" />
      <TheWelcome />
    </div>
  </div>
</template>
