<script setup lang="ts">
import { ref } from 'vue'

const severity = ref('all')
const metric = ref()

const severities = [
  { value: 'all', label: 'All', prefix: 'bg-secondary-400', suffix: 'ANY' },
  { value: 'debug', label: 'Debug', prefix: 'bg-secondary-500', suffix: 'LOG' },
  { value: 'info', label: 'Info', prefix: 'bg-sky-500', suffix: 'LOG' },
  { value: 'warning', label: 'Warning', prefix: 'bg-warning-500', suffix: 'LOG' },
  { value: 'error', label: 'Error', prefix: 'bg-error-500', suffix: 'LOG' },
  { value: 'fatal', label: 'Fatal', prefix: 'bg-error-700', suffix: 'LOG' },
]

const metrics = [
  { value: 'arpu', label: 'ARPU', prefix: 'bg-emerald-500', suffix: 'REVENUE' },
  { value: 'active_users', label: 'Active Users', prefix: 'bg-sky-500', suffix: 'BINOMIAL' },
  { value: 'avg_installs', label: 'Avg Installs to Conversion', prefix: 'bg-amber-500', suffix: 'DURATION' },
  { value: 'installs', label: 'Installs', prefix: 'bg-violet-500', suffix: 'COUNT' },
  { value: 'playtime', label: 'Playtime', prefix: 'bg-fuchsia-500', suffix: 'DURATION' },
  { value: 'revenue', label: 'Revenue', prefix: 'bg-emerald-600', suffix: 'REVENUE' },
  { value: 'sessions', label: 'Sessions per User', prefix: 'bg-indigo-500', suffix: 'COUNT' },
]
</script>

<template>
  <div class="flex flex-wrap items-end gap-4">
    <!--
      Compact triggers + prefix/suffix: reproduces the old bug where
      contentBody min-w-0 + auto-size locked the panel to ~trigger width
      and clipped labels ("Fat", "ARPU…") while suffixes stayed visible.
      Panel should stay at least 280px wide.
    -->
    <div class="w-20">
      <x-select
        v-model="severity"
        label="Severity"
        :options="severities"
      >
        <template #prefix="{ item }">
          <div class="w-2 h-2 shrink-0 rounded-full" :class="item.prefix"></div>
        </template>
        <template #suffix="{ item }">
          <span class="text-xs text-primary-500 dark:text-primary-400">{{ item.suffix }}</span>
        </template>
      </x-select>
    </div>
    <div class="w-40">
      <x-select
        v-model="metric"
        label="Metric"
        placeholder="Select Metric"
        :options="metrics"
        filterable
      >
        <template #prefix="{ item }">
          <div class="w-2 h-2 shrink-0 rounded-full" :class="item.prefix"></div>
        </template>
        <template #suffix="{ item }">
          <span class="text-xs text-primary-500 dark:text-primary-400">{{ item.suffix }}</span>
        </template>
      </x-select>
    </div>
  </div>
</template>
