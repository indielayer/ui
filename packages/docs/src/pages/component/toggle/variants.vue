<template>
  <div class="grid grid-cols-4 gap-4">
    <x-toggle v-model="checked" glow color="emerald" label="Glow" />
    <x-toggle v-model="checked" glow color="rose" label="Do you agree?" />
    <x-toggle v-model="checked" glow color="amber" label="Maybe not?" />
    <x-toggle v-model="checked" glow color="sky" label="All the T&C? Really?" />
  </div>

  <x-divider class="my-4"/>

  <div class="text-center">
    <x-toggle v-model="checked" class="mx-2" size="xs" label="xs"/>
    <x-toggle v-model="checked" class="mx-2" size="sm" label="sm"/>
    <x-toggle v-model="checked" class="mx-2" label="md"/>
    <x-toggle v-model="checked" class="mx-2" size="lg" label="lg"/>
    <x-toggle v-model="checked" class="mx-2" size="xl" label="xl"/>
  </div>
</template>

<script>
export default {
  data() { return { checked: true } },
}
</script>
