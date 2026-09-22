# Menu
Dropdown list of actionable items triggered from a button or other control. Use x-menu with x-menu-item for contextual actions and navigation.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| collapseIcon | String |  | Default icon for collapsible group headers. |
| collapsible | Boolean | true | Allows nested groups to collapse when they have child items. |
| color | String | secondary | Theme or CSS color used for the control accents. |
| disabled | Boolean |  | Disables all menu items. |
| expanded | Boolean |  | Default expanded state for collapsible groups. |
| filled | Boolean | true | Filled item backgrounds (vs. minimal text-only look). |
| items | Array MenuArrayItem[] |  | Menu tree. Each item may nest `items`, links, icons, and dividers. |
| minimal | Boolean |  | Hides item labels; icons-only layout. |
| rounded | Boolean | true | Applies rounded corners to menu items. |
| size | String Size | md | Control size. One of xs, sm, md, lg, xl. |

### Slots
- `default`

### Events
- `expand`: Emitted when a nested group expands or a linked item becomes active.
- `item-click`: Emitted when a menu item is clicked.

### Demos
#### Usage
```vue
<script setup lang="ts">
import type { MenuArrayItem } from '@indielayer/ui'

const menu1 = [{
  label: 'Open',
  active: false,
  value: 'a',
  disabled: true,
}, {
  label: 'Close',
  active: false,
  value: 'b',
}, {
  divider: true,
}, {
  label: 'Sign out',
  color: 'error',
  active: false,
  value: 'c',
}]
const menu2: MenuArrayItem[] = [{
  label: 'Menu item 1',
  value: '',
  target: '_blank',
  icon: 'smile',
  href: 'https://indielayer.com',
  prefix: '👉',
  suffix: '👈',
}, {
  to: 'menu',
  label: 'Menu item 2',
  value: '',
  icon: 'smile',
  exact: true,
}, {
  label: 'Menu item 3',
  value: '',
  exact: true,
  icon: 'smile',
  items: [{
    label: 'derp',
  }],
}, {
  divider: true,
}, {
  label: 'Sub-menu (non-collapsible)',
  loading: false,
  collapsible: false,
  items: [{
    label: 'Option',
    value: '',
    icon: 'smile',
  }, {
    label: 'Links (sub-menu collapsible)',
    value: '',
    items: [{
      to: 'menu',
      label: 'Link to \'menu\'',
      value: '',
    }],
  }],
}, {
  label: 'Last menu item',
  value: '',
  icon: 'heart',
  exact: true,
  onClick: () => {},
  disabled: false,
}]
</script>

<template>
  <x-menu :items="menu1" />
  <x-divider class="my-8"/>
  <x-menu :items="menu2" />
</template>
```

HTML docs: https://indielayer.com/component/menu
