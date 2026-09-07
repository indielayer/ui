<script setup lang="ts">
import { ref } from 'vue'

const plan = ref('pro')
const theme = ref('light')
</script>

<template>
  <div class="grid gap-6 max-w-md">
    <p class="text-sm text-secondary-500 dark:text-secondary-400">
      Undeclared attrs reach the native <code class="text-xs">&lt;input type=&quot;radio&quot;&gt;</code>.
      Wrapper <code class="text-xs">class</code> styles the label around each option.
    </p>

    <div class="grid gap-2">
      <p class="text-sm font-medium">x-radio</p>
      <div class="flex flex-wrap gap-3">
        <x-radio
          v-model="plan"
          name="demo-plan"
          value="free"
          label="Free"
          class="ring-2 ring-secondary-300/60 rounded-lg p-2"
          data-testid="demo-plan-free"
        />
        <x-radio
          v-model="plan"
          name="demo-plan"
          value="pro"
          label="Pro"
          class="ring-2 ring-primary-400/50 rounded-lg p-2"
          aria-label="Pro plan"
          data-testid="demo-plan-pro"
          title="Native radio title on Pro"
        />
      </div>
    </div>

    <div class="grid gap-2">
      <p class="text-sm font-medium">x-radio-button</p>
      <div class="flex gap-0">
        <x-radio-button
          v-model="theme"
          value="light"
          label="Light"
          class="ring-2 ring-inset ring-primary-400/40"
          data-testid="demo-theme-light"
        />
        <x-radio-button
          v-model="theme"
          value="dark"
          label="Dark"
          data-testid="demo-theme-dark"
        />
      </div>
    </div>
  </div>
</template>
