<script setup>
import { ref } from 'vue'

const el = ref(null)
const top = ref(false)
const left = ref(false)
const right = ref(false)
const bottom = ref(false)
const contained = ref(false)
const breakpoint = ref(false)
</script>

<template>
  <div>
    <div class="space-x-4">
      <x-button @click="left = !left">Toggle left</x-button>
      <x-button @click="right = !right">Toggle right</x-button>
      <x-button @click="bottom = !bottom">Toggle bottom</x-button>
      <x-button @click="top = !top">Toggle top</x-button>
    </div>
    <x-drawer v-model="left">
      <template #header>
        <div class="border-b p-4 text-lg font-semibold">Header</div>
      </template>
      menu
      <template #footer>
        <div class="border-t p-4">
          <x-button color="pink" block light>Sign out</x-button>
        </div>
      </template>
    </x-drawer>
    <x-drawer v-model="right" position="right" width="100">
      content
    </x-drawer>
    <x-drawer v-model="bottom" position="bottom">
      content
    </x-drawer>
    <x-drawer v-model="top" position="top">
      content
    </x-drawer>
  </div>

  <x-button class="mt-10" @click="breakpoint = !breakpoint">Toggle drawer with breakpoint</x-button>
  <x-drawer v-model="breakpoint" position="left" breakpoint="md">
    <div class="border p-4 my-2">
      I'm only a drawer on mobile
    </div>
  </x-drawer>

  <x-button class="mt-10" @click="contained = !contained">Toggle contained</x-button>
  <div id="container" ref="el" class="relative h-96 overflow-hidden bg-slate-50 dark:bg-slate-800 border rounded-md my-2">
    <x-drawer v-model="contained" position="left" teleport-to="#container">
      drawer inside #container
    </x-drawer>
  </div>
</template>
