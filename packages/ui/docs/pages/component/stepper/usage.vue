<script setup lang="ts">
import { ref } from 'vue'

const stepperRef = ref()
const active = ref('details')
const steps = [
  { value: 'details', title: 'Details' },
  { value: 'settings', title: 'Settings', optional: true },
  { value: 'review', title: 'Review' },
]
</script>

<template>
  <div class="max-w-2xl">
    <x-stepper
      ref="stepperRef"
      v-model="active"
      :steps="steps"
      orientation="horizontal"
      label-placement="bottom"
      class="min-h-[10rem]"
    >
      <template #details>
        <p class="text-sm font-medium text-secondary-800 dark:text-secondary-200 mb-1">
          Basic information
        </p>
        <p class="text-sm text-secondary-600 dark:text-secondary-400">
          Enter your project details here.
        </p>
      </template>
      <template #settings>
        <p class="text-sm font-medium text-secondary-800 dark:text-secondary-200 mb-1">
          Optional preferences
        </p>
        <p class="text-sm text-secondary-600 dark:text-secondary-400">
          Configure optional settings, or skip ahead with Next.
        </p>
      </template>
      <template #review>
        <p class="text-sm font-medium text-secondary-800 dark:text-secondary-200 mb-1">
          Confirm and finish
        </p>
        <p class="text-sm text-secondary-600 dark:text-secondary-400">
          Review everything before submitting.
        </p>
      </template>
    </x-stepper>

    <div class="flex justify-end gap-2 mt-4">
      <x-button
        ghost
        :disabled="stepperRef?.isFirst"
        @click="stepperRef?.prev()"
      >
        Previous
      </x-button>
      <x-button
        :disabled="stepperRef?.isLast"
        @click="stepperRef?.next()"
      >
        Next
      </x-button>
    </div>
  </div>
</template>
