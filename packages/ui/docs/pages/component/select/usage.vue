<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<undefined | string>()
const selected2 = ref<undefined | string>()
const selectedMultiple = ref<string[]>(['A', 'B'])
const options = ref([
  { value: 'A', label: 'Option A', disabled: true },
  { value: 'B', label: 'Option B' },
])

// function to generate
function genOptions(x: number) {
  const options = []

  for (let i = 0; i < x; i++) {
    options.push({ value: i.toString(), label: 'Option ' + i })
  }

  return options
}

const options2 = ref(genOptions(1000))
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
      v-model="selected2"
      label="Filterable - virtual list"
      placeholder="Placeholder"
      filterable
      virtual-list
      :virtual-list-item-height="33"
      :options="options2"
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
