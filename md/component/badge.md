# Badge
Small status indicators that overlay or sit beside another element—counts, labels, or presence dots. Use badges to draw attention without interrupting the layout.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| align | String BadgeAlign | right | Horizontal placement of the badge relative to the content (left, right). |
| animated | Boolean |  | Adds a ping animation around the badge. |
| color | String | primary | Theme or CSS color used for the control accents. |
| icon | String |  | Icon name for the badge indicator. Prefer the content slot for custom content. |
| offsetX | [Number, String] |  | Horizontal offset in pixels from the aligned edge. |
| offsetY | [Number, String] |  | Vertical offset in pixels from the positioned edge. |
| outlined | Boolean |  | Adds a border around the badge. |
| position | String BadgePosition | top | Vertical placement of the badge relative to the content (top, bottom). |
| show | Boolean | true | Controls whether the badge indicator is visible. |
| size | String Size | md | Control size. One of xs, sm, md, lg, xl. |
| tag | String | div | Root element tag. |

### Slots
- `content`: Badge label or custom indicator content.
- `default`: Content the badge is attached to.

### Events
- _(none)_

### Demos
#### Usage
```vue
<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <x-badge color="pink" outlined size="lg" animated>
      <x-button color="pink" outlined light size="xl">Notifications</x-button>
    </x-badge>

    <x-badge
      color="pink"
      outlined
      animated
      offset-x="-12"
      offset-y="-10"
    >
      Text Example
    </x-badge>

    <x-badge color="indigo" position="top" align="right">
      <x-button color="indigo" outlined light>Updates</x-button>
      <template #content>
        22323
      </template>
    </x-badge>

    <x-badge class="mx-2" align="left">
      <x-avatar name="John Smith" rounded />
      <template #content>
        7
      </template>
    </x-badge>
    <x-badge color="green" class="mx-2" outlined position="bottom">
      <x-avatar rounded />
    </x-badge>
    <x-badge
      color="green"
      class="mx-2"
      outlined
      position="bottom"
      align="left"
    >
      <x-avatar name="John Smith" rounded />
    </x-badge>
    <x-badge color="green" class="mx-2" size="xl" outlined>
      <x-avatar rounded size="xl" />
    </x-badge>

    <x-badge color="green" class="mx-2" outlined>
      <x-avatar name="John Smith" rounded />
    </x-badge>
  </div>
</template>
```

HTML docs: https://indielayer.com/component/badge
