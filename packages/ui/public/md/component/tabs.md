# Tabs
Tabbed navigation that switches between related views in the same region. Use x-tab-group with x-tab when content shares context but not space.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| align | String 'left'  \|  'center'  \|  'right' | left | Horizontal alignment of tabs in the list. |
| color | String | primary | Theme or CSS color used for the control accents. |
| exact | Boolean |  | Default exact route matching for linked tabs. |
| fullWidth | Boolean | true | Stretches the tab list to the container width. |
| ghost | Boolean |  | Subtle styling with less background emphasis. |
| grow | Boolean |  | Stretches tabs to fill the list width. |
| modelValue | [String, Number] |  | Active tab value (v-model). |
| size | String Size | md | Control size. One of xs, sm, md, lg, xl. |
| variant | String 'line'  \|  'block'  \|  'compact' | line | Visual style of the tab list (line, block, or compact). |

### Slots
- `default`: Tab triggers (typically x-tab children).

### Events
- `update:modelValue`: Emitted when the active tab changes (v-model).

### Demos
#### Usage
```vue
<script setup lang="ts">
import { ref } from 'vue'

const tab = ref('a')
const linkTab = ref(null)
const metric = ref('unique')
const view = ref('grid')
</script>

<template>
  <x-tab-group v-model="tab" class="pb-10" variant="line" :full-width="false">
    <x-tab value="a" label="Tab A" icon="smile">
      content a
    </x-tab>
    <x-tab value="b" label="Tab B">
      content b
    </x-tab>
    <x-tab value="c" label="Tab c">
      content c
    </x-tab>
    <x-tab value="d" label="Tab d">
      content d
    </x-tab>
    <x-tab value="e" label="Tab e">
      content e
    </x-tab>
  </x-tab-group>
  <x-tab-group
    v-model="tab"
    class="pb-10"
    variant="line"
    grow
  >
    <x-tab value="a" label="Tab A">
      content a
    </x-tab>
    <x-tab value="b" label="Tab B">
      content b
    </x-tab>
    <x-tab value="c" label="Tab c">
      content c
    </x-tab>
    <x-tab value="d" label="Tab d">
      content d
    </x-tab>
    <x-tab value="e" label="Tab e">
      content e
    </x-tab>
  </x-tab-group>
  <x-tab-group v-model="tab" class="pb-10" variant="line" ghost>
    <x-tab value="a" label="Tab A">
      content a
    </x-tab>
    <x-tab value="b" label="Tab B">
      content b
    </x-tab>
    <x-tab value="c" label="Tab c">
      content c
    </x-tab>
    <x-tab value="d" label="Tab d">
      content d
    </x-tab>
    <x-tab value="e" label="Tab e">
      content e
    </x-tab>
  </x-tab-group>
  <x-tab-group
    v-model="tab"
    class="pb-10"
    variant="block"
    grow
  >
    <x-tab value="a" label="Tab A">
      content a
    </x-tab>
    <x-tab value="b" label="Tab B">
      content b
    </x-tab>
    <x-tab value="c" label="Tab c">
      content c
    </x-tab>
    <x-tab value="d" label="Tab d">
      content d
    </x-tab>
    <x-tab value="e" label="Tab e">
      content e
    </x-tab>
  </x-tab-group>
  <x-tab-group
    v-model="tab"
    class="pb-10"
    variant="block"
    grow
    :full-width="false"
  >
    <x-tab value="a" label="Tab A" removable>
      content a
    </x-tab>
    <x-tab value="b" label="Tab B" icon="smile">
      content b
    </x-tab>
    <x-tab value="c" label="Tab c">
      content c
    </x-tab>
    <x-tab value="d" label="Tab d">
      content d
    </x-tab>
    <x-tab value="e" label="Tab e">
      content e
    </x-tab>
  </x-tab-group>
  <x-tab-group
    v-model="tab"
    class="pb-10"
    variant="block"
    :full-width="false"
    ghost
  >
    <x-tab value="a" label="Tab A">
      content a
    </x-tab>
    <x-tab value="b" label="Tab B">
      content b
    </x-tab>
    <x-tab value="c" label="Tab c">
      content c
    </x-tab>
    <x-tab value="d" label="Tab d">
      content d
    </x-tab>
    <x-tab value="e" label="Tab e">
      content e
    </x-tab>
  </x-tab-group>

  <p>Compact</p>
  <div class="flex gap-4 items-start">
    <x-tab-group
      v-model="metric"
      color="indigo"
      class="pb-10"
      variant="compact"
    >
      <x-tab value="unique" label="Unique" />
      <x-tab value="total" label="Total" />
    </x-tab-group>

    <x-tab-group
      v-model="view"
      color="indigo"
      class="pb-10"
      size="md"
      variant="compact"
    >
      <x-tab value="grid" icon="sun" tooltip="Grid view" />
      <x-tab value="list" icon="moon" tooltip="List view" />
    </x-tab-group>
  </div>

  <p>Automatic link as value</p>
  <x-tab-group v-model="linkTab" class="pb-10" exact>
    <x-tab to="/component/tabs" label="Tabs link">
      content a
    </x-tab>
    <x-tab to="/component/slider" label="Tabs link B">
      content b
    </x-tab>
  </x-tab-group>
</template>
```

HTML docs: https://indielayer.com/component/tabs
