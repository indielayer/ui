# Card
A bordered content container for grouping related information, media, and actions. Use cards in grids and dashboards when each block should stand alone.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| flat | Boolean |  | Removes elevation and border emphasis. |
| tag | String | div | Root element tag. |

### Slots
- `default`: Card content.

### Events
- _(none)_

### Demos
#### Usage
```vue
<script setup lang="ts">
import { computed, ref } from 'vue'

const name = ref('John Smith')
const email = ref('jsmith@indielayer.com')
const metric = ref('unique')

const metricCopy = computed(() => (metric.value === 'unique'
  ? { value: '12,480', label: 'Unique visitors this week' }
  : { value: '31,902', label: 'Total page views this week' }))
</script>

<template>
  <div class="space-y-4 max-w-sm">
    <x-card class="p-4 flex items-center gap-3">
      <x-avatar
        name="John Smith"
        color="primary"
        rounded
      />
      <div class="min-w-0">
        <div class="font-medium text-secondary-900 dark:text-secondary-100">
          John Smith
        </div>
        <div class="text-sm text-secondary-500 dark:text-secondary-400 truncate">
          jsmith@indielayer.com
        </div>
      </div>
    </x-card>

    <x-card>
      <div class="p-4">
        <div class="flex items-center justify-between gap-3">
          <div class="font-medium text-secondary-900 dark:text-secondary-100">
            Project update
          </div>
          <x-tag
            size="sm"
            color="primary"
            light
            rounded
          >
            In review
          </x-tag>
        </div>
        <p class="text-sm text-secondary-500 dark:text-secondary-400 mt-1.5">
          The dashboard redesign is ready for review. Feedback is due by Friday.
        </p>
      </div>
      <x-divider />
      <div class="px-3 py-2.5 flex justify-end gap-2">
        <x-button
          size="sm"
          ghost
        >
          Dismiss
        </x-button>
        <x-button
          size="sm"
          color="primary"
        >
          Review
        </x-button>
      </div>
    </x-card>

    <x-card class="p-4">
      <div class="font-medium text-secondary-900 dark:text-secondary-100 mb-3">
        Edit profile
      </div>
      <div class="space-y-2">
        <x-input
          v-model="name"
          label="Name"
          hide-footer
        />
        <x-input
          v-model="email"
          label="Email"
          type="email"
          hide-footer
        />
      </div>
      <div class="flex justify-end mt-4">
        <x-button
          size="sm"
          color="primary"
        >
          Save
        </x-button>
      </div>
    </x-card>

    <x-card class="p-4">
      <div class="flex items-center justify-between gap-3 mb-3">
        <div class="font-medium text-secondary-900 dark:text-secondary-100">
          Traffic
        </div>
        <x-tab-group
          v-model="metric"
          size="sm"
          variant="compact"
        >
          <x-tab value="unique" label="Unique" />
          <x-tab value="total" label="Total" />
        </x-tab-group>
      </div>
      <div class="text-2xl font-semibold text-secondary-900 dark:text-secondary-50 tabular-nums">
        {{ metricCopy.value }}
      </div>
      <p class="text-sm text-secondary-500 dark:text-secondary-400 mt-1">
        {{ metricCopy.label }}
      </p>
    </x-card>
  </div>
</template>
```

HTML docs: https://indielayer.com/component/card
