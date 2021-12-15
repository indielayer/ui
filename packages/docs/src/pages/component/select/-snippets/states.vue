<template>
  <div class="grid grid-cols-4 gap-4">
    <x-select v-model="selected" label="Disabled" disabled :options="options"/>
    <x-select v-model="selected" label="Loading" loading :options="options"/>
    <x-select v-model="selected" label="Error" error="Invalid input" :options="options"/>
  </div>
</template>

<script>
export default {
  data() { return {
    selected: 'A',
    options: [
      { value: 'A', label: 'Option A' },
      { value: 'B', label: 'Option B' },
    ],
  } },
}
</script>
