<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from '@indielayer/ui'

const selected = ref('percentile')
const options = ref<SelectOption[]>([
  {
    value: 'percentile',
    label: 'By percentile',
    description: 'Promote and demote by cohort placement percentages.',
  },
  {
    value: 'rank',
    label: 'By Rank',
    description: 'Promote and demote using tier change on Rank-based Rewards.',
  },
])
</script>

<template>
  <div class="max-w-sm">
    <x-select
      v-model="selected"
      label="How players move between tiers"
      :options="options"
    />
  </div>
</template>
