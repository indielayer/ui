<template>
  <x-tabs v-model="tab" class="pb-10" variant="line">
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
  </x-tabs>
  <x-tabs v-model="tab" class="pb-10" variant="line" grow>
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
  </x-tabs>
  <x-tabs v-model="tab" class="pb-10" variant="line" ghost>
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
  </x-tabs>
  <x-tabs v-model="tab" class="pb-10" variant="block">
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
  </x-tabs>
  <x-tabs v-model="tab" class="pb-10" variant="block" grow>
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
  </x-tabs>
  <x-tabs v-model="tab" class="pb-10" variant="block" ghost>
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
  </x-tabs>
</template>

<script>
export default {
  data() { return { tab: 'a' } },
}
</script>
