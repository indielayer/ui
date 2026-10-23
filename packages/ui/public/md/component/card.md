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
import { ref } from 'vue'

const name = ref('John Smith')
const email = ref('jsmith@indielayer.com')
</script>

<template>
  <div class="space-y-4 max-w-sm">
    <x-card class="p-4 flex items-center">
      <x-avatar name="John Smith" rounded />
      <div class="ml-4">
        <div class="font-bold">John Smith</div>
        <div class="text-secondary-500 text-sm">jsmith@indielayer.com</div>
      </div>
    </x-card>

    <x-card flat class="border">
      <div class="p-4">
        <div class="font-semibold">Project update</div>
        <p class="text-secondary-500 text-sm mt-1">
          The dashboard redesign is ready for review. Feedback is due by Friday.
        </p>
      </div>
      <x-divider />
      <div class="p-3 flex justify-end gap-2">
        <x-button size="sm" ghost>Dismiss</x-button>
        <x-button size="sm" color="primary">Review</x-button>
      </div>
    </x-card>

    <x-card class="p-4">
      <div class="font-semibold mb-3">Edit profile</div>
      <x-input v-model="name" label="Name" hide-footer />
      <x-input
        v-model="email"
        label="Email"
        type="email"
        hide-footer
        class="mt-2"
      />
      <div class="flex justify-end mt-4">
        <x-button size="sm" color="primary">Save</x-button>
      </div>
    </x-card>
  </div>
</template>
```

HTML docs: https://indielayer.com/component/card
