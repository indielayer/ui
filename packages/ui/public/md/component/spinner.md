# Spinner
Animated indicator that a background process is still running. Use spinners for indeterminate loading when completion percentage is unknown.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| icon | String | <g stroke-width=0><path fill=currentColor d=M12 | SVG markup or icon name used for the spinner. |
| size | String Size | md | Control size. One of xs, sm, md, lg, xl. |

### Slots
- _(none)_

### Events
- _(none)_

### Demos
#### Usage
```vue
<template>
  <x-spinner/>
</template>
```

#### Variants
```vue
<template>
  <div class="flex items-center gap-4">
    <x-spinner size="xs" />
    <x-spinner size="sm" />
    <x-spinner />
    <x-spinner size="lg" />
    <x-spinner size="xl" />
  </div>
</template>
```

HTML docs: https://indielayer.com/component/spinner
