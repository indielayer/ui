# Alert
Inline notices for system, feature, or page status—success, warning, error, or info. Use alerts when the message should stay visible until addressed.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| closeLabel | String |  | Accessible label for the remove button. |
| color | String |  | Theme or CSS color used for the control accents. |
| glow | Boolean |  | Soft colored glow behind the alert. |
| light | Boolean |  | Tinted background using the color at low opacity. |
| outlined | Boolean |  | Outline style with a transparent fill. |
| removable | Boolean |  | Shows a close control that emits `remove`. |
| type | String AlertType |  | Semantic alert type (info, success, error, warning). Controls the default icon. |

### Slots
- `default`: Alert message content.
- `icon`: Custom icon; overrides the type-based icon.
- `removeIcon`: Custom icon for the remove button.

### Events
- `remove`: Emitted when the remove button is clicked.

### Demos
#### Usage
```vue
<script setup lang="ts">
import { useNotifications } from '@indielayer/ui'

const notifications = useNotifications()
</script>

<template>
  <div class="grid gap-4">
    <x-alert>Default</x-alert>
    <x-alert color="primary" outlined>Outlined</x-alert>
    <x-alert color="primary" outlined light>Outlined</x-alert>
    <x-alert
      color="sky"
      type="info"
      light
      removable
      @remove="notifications?.log('remove')"
    >
      Hello
    </x-alert>
    <x-alert color="error" outlined type="error" light>Error</x-alert>
    <x-alert
      color="warning"
      light
      type="warning"
      removable
      @remove="notifications?.log('remove')"
    >
      Warning
    </x-alert>
    <x-alert
      color="emerald"
      type="success"
      glow
      light
      removable
      outlined
      @remove="notifications?.log('remove')"
    >
      Success
    </x-alert>
    <x-alert color="emerald" type="success">Success</x-alert>
  </div>
</template>
```

HTML docs: https://indielayer.com/component/alert
