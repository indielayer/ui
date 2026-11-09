# Tooltip
Tooltips display contextual help on hover. Use XToggleTip for a compact info-icon pattern beside labels.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| disabled | Boolean |  | Disables showing the tooltip. |
| position | String TooltipPosition | bottom | Preferred placement relative to the trigger (top, bottom, left, right). |
| tag | String | div | Root element tag wrapping the trigger. |
| tooltip | String |  | Tooltip text shown on hover. Prefer the tooltip slot for custom content. |

### Slots
- `default`: Trigger content the tooltip is attached to.
- `tooltip`: Custom tooltip content; overrides the `tooltip` prop.

### Events
- _(none)_

### Demos
#### Usage
```vue
<template>
  <div class="flex flex-wrap items-center gap-4">
    <x-tooltip tooltip="Save your changes">
      <x-button icon="check" aria-label="Save" />
    </x-tooltip>

    <x-tooltip tooltip="More options">
      <x-button ghost icon="smile" aria-label="More options" />
    </x-tooltip>
  </div>
</template>
```

#### Content
```vue
<template>
  <x-tooltip position="bottom">
    <x-button color="primary">Hover for details</x-button>
    <template #tooltip>
      <div class="font-semibold text-white mb-1">Export report</div>
      <div class="text-secondary-300 text-xs leading-relaxed max-w-[14rem]">
        Download a CSV snapshot of the current filters. Large exports may take a few seconds.
      </div>
    </template>
  </x-tooltip>
</template>
```

#### Placement
```vue
<script setup lang="ts">
const placements = ['top', 'bottom', 'left', 'right'] as const
</script>

<template>
  <div class="flex flex-wrap items-center justify-center gap-6 py-6 px-4 max-w-md rounded-lg bg-secondary-50 dark:bg-secondary-900/50">
    <x-tooltip
      v-for="placement in placements"
      :key="placement"
      :position="placement"
      :tooltip="`Tooltip on ${placement}`"
    >
      <x-button outlined class="capitalize min-w-[5rem]">
        {{ placement }}
      </x-button>
    </x-tooltip>
  </div>
</template>
```

#### States
```vue
<template>
  <x-tooltip tooltip="You cannot perform this action" disabled>
    <x-button disabled>Unavailable</x-button>
  </x-tooltip>
</template>
```

#### Toggle Tip
```vue
<template>
  <div class="flex items-center gap-2">
    <span class="text-sm text-secondary-800 dark:text-secondary-200">API rate limit</span>
    <x-toggle-tip content="Requests are capped at 1,000 per hour. Upgrade your plan to raise the limit." />
  </div>
</template>
```

HTML docs: https://indielayer.com/component/tooltip
