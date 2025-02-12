<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<undefined | string>()
const selected2 = ref<undefined | string>()
const options = ref([
  { value: 'A', label: 'Option A' },
  { value: 'B', label: 'Option B' },
  { value: 'C', label: 'Option C' },
])

// function to generate
function genOptions(x: number) {
  const options = []

  for (let i = 0; i < x; i++) {
    options.push({ value: i.toString(), label: 'Option ' + i, suffix: i })
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
    >
      <template #suffix="{ item }">
        <span class="text-secondary-400 text-xs font-mono w-2">#{{ item.suffix }}</span>
      </template>
    </x-select>
    <x-select
      v-model="selected"
      label="Custom input"
      :options="options"
      helper="Helper text"
      tooltip="Tooltip here"
    >
      <template #input="{ popover, label, disabled }">
        <button
          class="w-full text-left border rounded-md px-3 py-2"
          :disabled="disabled"
          @click="popover?.show()"
        >{{ label || 'Select an option' }}</button>
      </template>
    </x-select>
  </div>
</template>
