# Link
Styled anchor for navigating to another page or external URL. Use x-link when you need consistent link styling, external indicators, and accessibility.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| color | String | secondary | Theme or CSS color used for the control accents. |
| external | Boolean |  | Appends an external-link icon after the label. |
| shadow | Boolean |  | Inset shadow highlight under the link text. |
| tag | String | a | Root element tag. Becomes a router-link when `to` is set. |
| to | [String, Object] |  | Vue Router location; renders as a link when set. |
| underline | Boolean |  | Underlines the link text. |

### Slots
- `default`: Link label and content.

### Events
- _(none)_

### Demos
#### Usage
```vue
<template>
  <div>
    If you don't have an account yet, you can <x-link color="primary">contact our customer success team</x-link> to get started with Indielayer UI, get a <x-link shadow color="pink" external>product demo</x-link>, or request a specific sales inquiry.
  </div>
  <div class="mt-4 space-x-2">
    <x-link to="/component/link">Simple link</x-link>
    <x-link to="link" underline>Underline</x-link>
    <x-link to="link" color="orange">Colorfull</x-link>
    <x-link to="link" shadow color="primary">Shadow</x-link>
    <x-link href="https://github.com/indielayer/ui" target="_blank" external>External link</x-link>
  </div>
</template>
```

HTML docs: https://indielayer.com/component/link
