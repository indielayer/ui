<template>
  <div class="grid grid-cols-4 gap-4">
    <x-toggle disabled label="Disabled" />
    <x-toggle v-model="checked" loading label="Loading" color="blue"/>
    <x-toggle error="Invalid input" label="Error"/>
  </div>
</template>

<script>
export default {
  data() { return { checked: true } },
}
</script>
