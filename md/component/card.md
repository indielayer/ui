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
<template>
  <div class="space-y-4">
    <x-card class="p-4">I'm a normal card</x-card>
    <x-card class="p-4" flat>I'm a flat card</x-card>
  </div>
</template>
```

HTML docs: https://indielayer.com/component/card
