<template>
  <x-tabs v-model="tab">
    <x-tab value="a">Tab A</x-tab>
    <x-tab value="b" color="amber">Tab B</x-tab>
    <x-tab value="c" color="rose">Tab C</x-tab>
  </x-tabs>
</template>

<script>
export default {
  data() { return { tab: 'a' } },
}
</script>
