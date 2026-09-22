# Breadcrumbs
Shows the current page's place in a navigational hierarchy. Use breadcrumbs for deep page trees so users can jump back to parent sections.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| color | String |  | Theme or CSS color used for the control accents. |
| icon | String |  | Icon name used as the separator between items. |
| items | Array BreadcrumbsItem[] |  | Breadcrumb items with label and optional to, href, icon, and style overrides. |
| separator | String | / | Text separator between items when `icon` is not set. |
| shadow | Boolean |  | Applies the link shadow style to items. |
| underline | Boolean |  | Underlines item links. |

### Slots
- _(none)_

### Events
- _(none)_

### Demos
#### Usage
```vue
<script setup lang="ts">
const simple = [
  { to: '#', label: 'Breadcrumb item 1' },
  { to: '#', label: 'Breadcrumb item 2' },
  { to: '#', label: 'Breadcrumb item 3' },
  { to: '#', label: 'Breadcrumb item 4' },
]
const breadcrumbs = [
  { to: '#', label: 'Breadcrumb item 1', icon: 'smile' },
  { to: '#', label: 'Breadcrumb item 2', color: 'purple', shadow: true },
  { to: '#', label: 'Breadcrumb item 3', icon: 'twitter', color: 'yellow' },
  { to: '#', label: 'Breadcrumb item 4' },
]
</script>

<template>
  <x-breadcrumbs :items="simple" color="primary" />
  <x-breadcrumbs :items="breadcrumbs" color="primary" />
</template>
```

HTML docs: https://indielayer.com/component/breadcrumbs
