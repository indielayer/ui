<script setup lang="ts">
import { ref } from 'vue'

const country = ref('+1')
const phone = ref('')
const number = ref(0)
</script>

<template>
  <div class="grid gap-6">
    <x-input-group label="Phone number" helper="Country code and local number">
      <x-input v-model="country" placeholder="+1" class="!w-24" />
      <x-input v-model="phone" placeholder="555-0000" />
    </x-input-group>

    <x-input-group label="Search" helper="Helper text here">
      <x-input v-model="phone" placeholder="Search…" />
      <x-button color="primary">Go</x-button>
    </x-input-group>

    <x-input-group>
      <x-button @click="number--">-</x-button>
      <x-input
        v-model="number"
        placeholder="0"
        type="number"
        :block="false"
        class="w-12! [&_input]:text-center"
      />
      <x-button @click="number++">+</x-button>
    </x-input-group>
  </div>
</template>
