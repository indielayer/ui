<script setup lang="ts">
import { ref } from 'vue'

const tab = ref('a')
const linkTab = ref(null)
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
