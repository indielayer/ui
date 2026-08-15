# Skeleton
Placeholder shapes that mirror content layout while data loads. Use skeletons to reduce layout shift and improve perceived loading performance.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| shape | String SkeletonShape | line | Placeholder shape (line or circle). |
| tag | String | div | Root element tag. |

### Slots
- _(none)_

### Events
- _(none)_

### Demos
#### Usage
```vue
<template>
  <div class="flex">
    <x-skeleton class="w-14 h-14 rounded-full shrink-0 mr-2"/>
    <div class="w-full">
      <x-skeleton/>
      <x-skeleton class="mt-2"/>
    </div>
  </div>
  <x-skeleton class="w-full h-20 mt-2"/>
</template>
```

HTML docs: https://indielayer.com/component/skeleton
