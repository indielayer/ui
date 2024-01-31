<script setup>
import { ref } from 'vue'
const totalPages = 10
const page = ref(1)
</script>

<template>
  <div class="space-y-10">
    <x-pagination v-model="page" :total-pages="totalPages" variant="quick" />
    <x-pagination v-model="page" :total-pages="totalPages" />
    <x-pagination v-model="page" :total-pages="totalPages" variant="dots" />
    <div>
      <p class="font-bold mb-2">Pagination with links (?page) query string</p>
      <x-pagination v-model="page" :total-pages="totalPages" links />
    </div>
  </div>
</template>
