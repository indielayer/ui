<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<undefined | string>()
const selectedMultiple = ref<string[]>(['A', 'B'])
const options = ref([
  { value: 'A', label: 'Option A', disabled: true },
  { value: 'B', label: 'Option B' },
])

for (let i = 0; i < 20; i++) {
  options.value.push({ value: i.toString(), label: 'Option ' + i })
}
</script>

<template>
  <div class="grid md:grid-cols-3 gap-4">
    <x-select
      v-model="selected"
      label="Simple native select"
      placeholder="Placeholder"
      :options="options"
      helper="Helper text"
      tooltip="Tooltip here"
      native
    />
    <x-select
      v-model="selected"
      label="Dropdown select"
      placeholder="Placeholder"
      filterable
      :options="options"
    />
    <x-select
      v-model="selectedMultiple"
      label="Multi select"
      placeholder="Multiple"
      :options="options"
      filterable
      multiple
    />
  </div>
</template>
