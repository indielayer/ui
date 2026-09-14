# Button
Clickable controls for primary actions—submit, open dialogs, or run commands. Customize style, size, and icons; group related actions with x-button-group.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| block | Boolean |  | Stretches to the full width of the parent. |
| color | String |  | Theme or CSS color used for the control accents. |
| disabled | Boolean |  | Disables interaction and applies disabled styling. |
| flat | Boolean |  | Removes elevation and border emphasis. |
| ghost | Boolean |  | Minimal style with no background until hover. |
| glow | Boolean |  | Soft colored glow behind the control. |
| icon | String |  | Shortcut for `iconLeft`. |
| iconLeft | String |  | Icon name shown before the label. |
| iconRight | String |  | Icon name shown after the label. |
| light | Boolean |  | Tinted background using the color at low opacity. |
| loading | Boolean |  | Shows a loading indicator and blocks interaction. |
| loadingLabel | String |  | Accessible label announced while loading. |
| loadingStatus | String LoaderStatus | active | Loader visual status (for example active or indeterminate). |
| outlined | Boolean |  | Outline style with a transparent fill. |
| rounded | Boolean |  | Fully rounded corners (pill shape). |
| size | String Size | md | Control size. One of xs, sm, md, lg, xl. |
| tag | String | button | Root element tag. Becomes a router-link when `to` is set. |
| to | [String, Object] |  | Vue Router location; renders as a link when set. |
| tooltip | String |  | Tooltip text shown on hover. Prefer the tooltip slot for custom content. |
| tooltipPosition | String TooltipPosition | top | Tooltip placement relative to the button. |
| type | String | button | Native button type when `tag` is `button` (button, submit, reset). |

### Slots
- `default`: Button label and content.
- `tooltip`: Custom tooltip content; overrides the `tooltip` prop.

### Events
- _(none)_

### Methods
- `blur`: Remove focus from the underlying control.
- `focus`: Focus the underlying control.

### Demos
#### Usage
```vue
<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <x-button>Default</x-button>
    <x-button color="primary" icon-right="star">Submit</x-button>
    <x-button color="primary" light>Light</x-button>
    <x-button color="primary" ghost>Ghost</x-button>
    <x-button color="primary" outlined>Outlined</x-button>
    <x-button color="primary" loading loading-label="Uploading..">Loading</x-button>
    <x-button color="primary" rounded>filled Rounded</x-button>
    <x-button color="primary" light outlined>light + outlined</x-button>
  </div>
</template>
```

#### Button Group
```vue
<template>
  <div class="grid md:grid-cols-4 gap-4">
    <x-button-group>
      <x-button >Cancel</x-button>
      <x-button color="primary">Save</x-button>
    </x-button-group>
    <x-button-group color="primary" light outlined>
      <x-button>left</x-button>
      <x-button>middle</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="primary" light outlined>
      <x-button icon="edit" tooltip="Edit" />
      <x-button icon="code" tooltip="Code" />
      <x-button icon="smile" tooltip="Smile" />
    </x-button-group>
    <x-button-group color="indigo" outlined disabled>
      <x-button>left</x-button>
      <x-button>middle</x-button>
    </x-button-group>
  </div>
</template>
```

#### Icons
```vue
<template>
  <div class="space-x-4">
    <x-button icon="smile"/>
    <x-button icon="heart" />
    <x-button icon="heart">Label</x-button>
    <x-button icon-right="heart">Label</x-button>
    <x-button icon="star" icon-right="smile"/>
  </div>
</template>
```

#### Size
```vue
<template>
  <div class="space-x-4">
    <x-button size="xs">xs</x-button>
    <x-button size="sm">sm</x-button>
    <x-button>md</x-button>
    <x-button size="lg">lg</x-button>
    <x-button size="xl">xl</x-button>
  </div>
</template>
```

#### States
```vue
<template>
  <div class="space-x-4">
    <x-button disabled>Disabled</x-button>
    <x-button loading>Disabled</x-button>
  </div>
</template>
```

#### Tooltip
```vue
<template>
  <div class="flex flex-wrap items-center gap-4">
    <x-button icon="check" tooltip="Save your changes" />
    <x-button ghost icon="smile" tooltip="More options" />
    <x-button icon="heart" tooltip="Favorite" tooltip-position="bottom" />
    <x-button tooltip="Delete this item" tooltip-position="right">
      Delete
    </x-button>
  </div>
</template>
```

#### Variants
```vue
<template>
  <div class="grid md:grid-cols-3 gap-4">
    <x-button color="#F46262" light>Custom color</x-button>
    <x-button color="primary" light glow>It's glowing</x-button>
    <x-button color="pink" outlined light glow>Glow</x-button>
  </div>
</template>
```

HTML docs: https://indielayer.com/component/button
