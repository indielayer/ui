<script setup lang="ts">
import { RouterView } from 'vue-router'
import HelloWorld from '@/components/HelloWorld.vue'
</script>

<template>
  <div class="flex items-center justify-center h-screen bg-[#001e26] dark text-[#accac8] flex-col">
    <div class="max-w-2xl">
      <header>
        <div class="wrapper">
          <HelloWorld msg="Welcome!" />

          <nav class="space-x-4 my-4">
            <x-link to="/" color="amber" underline>Home</x-link>
            <x-link to="/about" color="amber" underline>About</x-link>
          </nav>
        </div>
      </header>
      <RouterView />
    </div>
  </div>
</template>
