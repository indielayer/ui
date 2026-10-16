# Tabs
Tabbed navigation that switches between related views in the same region. Use x-tab-group with x-tab when content shares context but not space.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| align | String 'left'  \|  'center'  \|  'right' | left | Horizontal alignment of tabs in the list. |
| color | String |  | Theme or CSS color used for the control accents. |
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
const metric = ref('unique')
const view = ref('grid')
const level = ref('all')

let nextTabId = 4
const dynamicTab = ref(1)
const dynamicTabs = ref([
  { value: 1, label: 'Tab 1' },
  { value: 2, label: 'Tab 2' },
  { value: 3, label: 'Tab 3' },
])

function addTab() {
  const value = nextTabId++

  dynamicTabs.value.push({ value, label: `Tab ${value}` })
  dynamicTab.value = value
}

function removeTab(value: number) {
  const index = dynamicTabs.value.findIndex((t) => t.value === value)

  if (index === -1) return

  dynamicTabs.value.splice(index, 1)
}
</script>

<template>
  <x-tab-group
    v-model="tab"
    class="pb-10"
    variant="line"
    :full-width="false"
    color="primary"
  >
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

  <p>Add and remove tabs</p>
  <div class="pb-10">
    <div class="mb-3">
      <x-button size="sm" @click="addTab">
        Add tab
      </x-button>
    </div>
    <x-tab-group
      v-model="dynamicTab"
      variant="block"
      :full-width="false"
    >
      <x-tab
        v-for="t in dynamicTabs"
        :key="t.value"
        :value="t.value"
        :label="t.label"
        removable
        @remove="removeTab(t.value)"
      >
        Content for {{ t.label }}
      </x-tab>
    </x-tab-group>
  </div>

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
  <div class="flex flex-wrap gap-4 items-start pb-10">
    <x-tab-group
      v-model="metric"
      variant="compact"
    >
      <x-tab value="unique" label="Unique" />
      <x-tab value="total" label="Total" />
    </x-tab-group>

    <x-tab-group
      v-model="view"
      size="sm"
      variant="compact"
    >
      <x-tab value="grid" icon="sun" tooltip="Grid view" />
      <x-tab value="list" icon="moon" tooltip="List view" />
    </x-tab-group>

    <x-tab-group
      v-model="level"
      size="sm"
      ghost
      variant="compact"
    >
      <x-tab value="all" label="All" />
      <x-tab value="debug" label="Debug" />
      <x-tab value="info" label="Info" color="sky" />
      <x-tab value="warn" label="Warn" color="warning" />
      <x-tab value="error" label="Error" color="error" />
    </x-tab-group>
  </div>

  <p>Automatic link as value</p>
  <x-tab-group class="pb-10" exact>
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
