<template>
  <x-pagination v-model="page" :total-pages="totalPages" variant="quick" />
  <div class="mt-10">
    <x-pagination v-model="page" :total-pages="totalPages" />
  </div>

  <div class="mt-10">
    <x-pagination v-model="page" :total-pages="totalPages" variant="dots" />
  </div>

  <div class="mt-10">
    <p class="font-bold mb-2">Pagination with links (?page) query string</p>
    <x-pagination v-model="page" :total-pages="totalPages" links />
  </div>
</template>

<script>
export default {
  data() {
    return {
      page: 1,
      totalPages: 10,
    }
  },
}
</script>
