# Container
Layout wrapper that constrains content width and alignment for consistent page structure. Use containers to center and pad main content across breakpoints.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| fluid | Boolean | false | Removes max-width constraints so the container spans the full parent width. |
| tag | String | div | Root element tag. |

### Slots
- `default`: Container content.

### Events
- _(none)_

### Demos
#### Usage
```vue
<template>
  <x-container>Contained content</x-container>
</template>
```

HTML docs: https://indielayer.com/component/container
