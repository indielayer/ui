<script setup lang="ts">
import { ref } from 'vue'

const tab = ref('a')
const metric = ref('unique')
const view = ref('grid')

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
  <x-tab-group class="pb-10" exact>
    <x-tab to="/component/tabs" label="Tabs link">
      content a
    </x-tab>
    <x-tab to="/component/slider" label="Tabs link B">
      content b
    </x-tab>
  </x-tab-group>
</template>
