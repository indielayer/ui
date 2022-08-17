<template>
  <div class="flex items-center space-x-4">
    <x-select v-model="selected" :options="options" placeholder="xs" size="xs" />
    <x-select v-model="selected" :options="options" placeholder="sm" size="sm" />
    <x-select v-model="selected" :options="options" placeholder="md"/>
    <x-select v-model="selected" :options="options" placeholder="lg" size="lg" />
    <x-select v-model="selected" :options="options" placeholder="xl" size="xl" />
  </div>
</template>

<script>
export default {
  data() { return {
    selected: '',
    options: [
      { value: 'A', label: 'Option A' },
      { value: 'B', label: 'Option B' },
    ],
  } },
}
</script>
