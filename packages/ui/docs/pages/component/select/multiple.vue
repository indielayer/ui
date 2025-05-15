<script setup lang="ts">
import { ref } from 'vue'

const selectedMultiple = ref<string[]>(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M'])

const options = ref([
  { value: 'A', label: 'Option lorem ipsum lorem ipsum lorem ipsum lorem ipsum lorem ipsum', color: 'bg-red-500' },
  { value: 'B', label: 'Option B ipsum', color: 'bg-orange-500' },
  { value: 'C', label: 'Option C lorem ipsum', color: 'bg-amber-500' },
  { value: 'D', label: 'D', color: 'bg-yellow-500' },
  { value: 'E', label: 'E ipsum', color: 'bg-lime-500' },
  { value: 'F', label: 'Option F', color: 'bg-green-500' },
  { value: 'G', label: 'Option lorem ipsum qoiwjdoqiwjdoqiwjdoqiwjdoi', color: 'bg-emerald-500' },
  { value: 'H', label: 'Option H', color: 'bg-teal-500' },
  { value: 'I', label: 'lorem ipsum dolo', color: 'bg-cyan-500' },
  { value: 'J', label: 'Option J', color: 'bg-sky-500' },
  { value: 'K', label: 'Option K', color: 'bg-blue-500' },
  { value: 'L', label: 'consectetur adipi', color: 'bg-indigo-500' },
  { value: 'M', label: 'Option M', color: 'bg-violet-500' },
])

const optionsWithColors = options.value.map((option) => {
  return {
    ...option,
    prefix: option.color,
  }
})
</script>

<template>
  <div class="grid md:grid-cols-2 gap-4">
    <x-select
      v-model="selectedMultiple"
      label="Multi select"
      placeholder="Multiple"
      :options="options"
      filterable
      multiple
    />
    <x-select
      v-model="selectedMultiple"
      label="Multi select - truncate"
      placeholder="Multiple"
      :options="options"
      multiple
      truncate
      clearable
    />
    <x-select
      v-model="selectedMultiple"
      label="Multi select - checkbox"
      placeholder="Multiple"
      :options="options"
      multiple-checkbox
      filterable
    />
    <x-select
      v-model="selectedMultiple"
      label="Multi select - checkbox - prefix items"
      placeholder="Multiple"
      :options="optionsWithColors"
      multiple-checkbox
      filterable
      clearable
    >
      <template #prefix="{ item }">
        <div class="w-2 h-2 rounded-full" :class="item.prefix"></div>
      </template>
      <template #tag-prefix="{ item }">
        <div class="w-2 h-2 shrink-0 rounded-full" :class="item.prefix"></div>
      </template>
    </x-select>
  </div>
</template>
