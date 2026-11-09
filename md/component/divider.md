# Divider
A horizontal or vertical rule that separates sections of content. Use dividers in lists, toolbars, and layouts to create clear visual breaks.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| label | String |  | Optional text shown between the divider lines. |
| vertical | Boolean |  | Renders the divider vertically instead of horizontally. |

### Slots
- _(none)_

### Events
- _(none)_

### Demos
#### Usage
```vue
<template>
  <div>
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio, nulla.</p>
    <x-divider class="my-2" />
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, impedit?</p>
  </div>
</template>
```

#### Label
```vue
<template>
  <div class="text-center">
    <p class="text-2xl">Top</p>
    <x-divider class="my-2" label="OR" />
    <p class="text-2xl">Bottom</p>
  </div>
  <div class="text-center flex items-center mt-10">
    <p class="text-2xl w-full">Left</p>
    <x-divider class="mx-2 h-28" vertical label="OR" />
    <p class="text-2xl w-full">Right</p>
  </div>
</template>
```

#### Vertical
```vue
<template>
  <div class="flex items-center justify-center h-28">
    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Optio, nulla.</p>
    <x-divider class="mx-4" vertical />
    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ad, impedit?</p>
  </div>
</template>
```

HTML docs: https://indielayer.com/component/divider
