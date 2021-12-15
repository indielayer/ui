<template>
  <div class="grid grid-cols-4 gap-4">
    <x-select v-model="selected" label="Simple select" placeholder="Placeholder">
      <option value="A">Option A</option>
      <option value="B">Option B</option>
    </x-select>
    <x-select v-model="selected" label="Options array" :options="options"/>
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
