<template>
  <div class="grid grid-cols-4 gap-4">
    <x-checkbox v-model="checked" glow color="emerald" label="Glow" />
    <x-checkbox v-model="checked" glow color="rose" label="Do you agree?" />
    <x-checkbox v-model="checked" glow color="amber" label="Maybe not?" />
    <x-checkbox v-model="checked" glow color="sky" label="All the T&C? Really?" />
  </div>

  <x-divider class="my-4"/>

  <div class="text-center">
    <x-checkbox v-model="checked" class="mx-2" size="xs">xs</x-checkbox>
    <x-checkbox v-model="checked" class="mx-2" size="sm">sm</x-checkbox>
    <x-checkbox v-model="checked" class="mx-2">md</x-checkbox>
    <x-checkbox v-model="checked" class="mx-2" size="lg">lg</x-checkbox>
    <x-checkbox v-model="checked" class="mx-2" size="xl">xl</x-checkbox>
  </div>
</template>

<script>
export default {
  data() { return { checked: true } },
}
</script>
