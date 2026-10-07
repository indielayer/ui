# Avatar
Displays a user's photo, initials, or icon in a compact frame. Use avatars in lists, headers, and comments to identify people at a glance.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| alt | String |  | Alt text for the image when `image` is set. |
| color | String | primary | Theme or CSS color used for the control accents. |
| image | String |  | Image URL. Falls back to initials or the avatar icon if unloadable. |
| name | String |  | Display name used to derive initials when no image is loaded. |
| outlined | Boolean |  | Outline style with a transparent fill. |
| rounded | Boolean |  | Fully rounded corners (circle). |
| size | String Size | md | Control size. One of xs, sm, md, lg, xl. |
| tag | String | div | Root element tag. |

### Slots
- `avatarIcon`: Fallback icon when no name or image is available.
- `default`

### Events
- _(none)_

### Demos
#### Usage
```vue
<template>
  <div class="space-x-2">
    <x-avatar name="John Smith" rounded />
    <x-avatar name="Andrew Colt" />
    <x-badge color="green" outlined position="bottom">
      <x-avatar rounded name="Janet" image="https://gravatar.com/avatar/aa99b351245441b8ca95d54a52d2998c" />
    </x-badge>
  </div>
</template>
```

#### Size
```vue
<template>
  <div class="space-x-2">
    <x-avatar size="xs" />
    <x-avatar size="sm" />
    <x-avatar />
    <x-avatar size="lg" />
    <x-avatar size="xl" />
  </div>
</template>
```

#### Variants
```vue
<template>
  <div class="space-x-2">
    <x-avatar name="John Smith" color="slate" />
    <x-avatar rounded />
    <x-avatar name="John Smith" color="orange" rounded outlined />
    <x-avatar name="John Smith" color="sky" outlined />
  </div>
</template>
```

HTML docs: https://indielayer.com/component/avatar
