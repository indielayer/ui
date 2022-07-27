<template>
  <div class="grid grid-cols-4 gap-4">
    <x-textarea
      flat
      class="mx-2"
      label="Flat"
      placeholder="flat"
      size="xl"
      helper="qwdqd"
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
  <div class="text-center">
    <div class="mx-2">
      <x-textarea v-model="sizes" label="xs" size="xs" />
      <x-button size="xs">Go</x-button>
    </div>
    <div class="mx-2">
      <x-textarea v-model="sizes" label="sm" size="sm" />
      <x-button size="sm">Go</x-button>
    </div>
    <div class="mx-2">
      <x-textarea v-model="sizes" label="md" size="md" />
      <x-avatar/>
      <x-button size="md">Go</x-button>
    </div>
    <div class="mx-2">
      <x-textarea
        v-model="sizes"
        label="lg"
        size="lg"
        error=""
      />
      <x-button size="lg">Go</x-button>
    </div>
    <div class="mx-2">
      <x-textarea v-model="sizes" label="xl" size="xl" />
      <x-button size="xl">Go</x-button>
    </div>
  </div>

</template>

<script>
export default {
  data() { return { sizes: 'Text size' } },
}
</script>
