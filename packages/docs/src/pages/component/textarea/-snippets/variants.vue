<template>
  <div class="grid grid-cols-4 gap-4">
    <x-textarea
      v-model="sizes"
      flat
      class="mx-2"
      label="Flat"
      placeholder="flat"
      size="xl"
    />
  </div>

  <x-divider class="my-4"/>

  <div class="text-center">
    <x-textarea v-model="sizes" class="mx-2" label="xs" size="xs" />
    <x-textarea v-model="sizes" class="mx-2" label="xs" size="sm" />
    <x-textarea v-model="sizes" class="mx-2" label="md" />
    <x-textarea v-model="sizes" class="mx-2" label="lg" size="lg" />
    <x-textarea v-model="sizes" class="mx-2" label="xl" size="xl" />
  </div>
</template>

<script>
export default {
  data() { return { sizes: 'Text size' } },
}
</script>
