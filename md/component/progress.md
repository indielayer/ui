# Progress
Bar that shows how far a task or process has completed. Use progress for uploads, multi-step jobs, and determinate loading states.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| animate | Boolean | true | Animates width changes when the percentage updates. |
| color | String | primary | Theme or CSS color used for the control accents. |
| gradient | Boolean |  | Uses a gradient fill instead of a solid color. |
| percentage | [Number, String] | 0 | Fill amount from 0 to 100. |
| thick | Boolean |  | Increases the bar thickness. |

### Slots
- _(none)_

### Events
- _(none)_

### Demos
#### Usage
```vue
<template>
  <div class="grid grid-cols-3 gap-4">
    <x-progress :percentage="10" color="amber"/>
    <x-progress :percentage="50" color="primary"/>
    <x-progress :percentage="100" color="success"/>
  </div>
</template>
```

#### Variants
```vue
<script setup lang="ts">
import { ref, onMounted } from 'vue'
const percentage = ref(0)

onMounted(() => {
  const interval = setInterval(() => {
    percentage.value += 5
    if (percentage.value >= 100) clearTimeout(interval)
  }, 100)
})
</script>

<template>
  <div class="grid grid-cols-3 gap-4">
    <x-progress :percentage="percentage" gradient color="sky" />
    <x-progress :percentage="percentage" color="rose" />
  </div>
</template>
```

HTML docs: https://indielayer.com/component/progress
