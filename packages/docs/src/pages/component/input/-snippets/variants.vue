<template>
  <div class="grid grid-cols-3 gap-4">
    <x-input
      v-model="password"
      label="Password input"
      type="password"
      show-password-toggle
    />
    <x-input v-model="other" label="Input with icon" icon-left="smile"/>
    <x-input v-model="other" label="Icon on the right" icon-right="smile" />
  </div>

  <x-divider class="my-4"/>

  <div class="text-center">
    <div class="mx-2">
      <x-input v-model="sizes" label="xs" size="xs" />
      <x-button size="xs">Go</x-button>
    </div>
    <div class="mx-2">
      <x-input v-model="sizes" label="sm" size="sm" />
      <x-button size="sm">Go</x-button>
    </div>
    <div class="mx-2">
      <x-input v-model="sizes" label="md" size="md" />
      <x-avatar/>
      <x-button size="md">Go</x-button>
    </div>
    <div class="mx-2">
      <x-input
        v-model="sizes"
        label="lg"
        size="lg"
        error=""
        helper="helper line"
      />
      <x-button size="lg">Go</x-button>
    </div>
    <div class="mx-2">
      <x-input v-model="sizes" label="xl" size="xl" />
      <x-button size="xl">Go</x-button>
    </div>
  </div>
</template>

<script>
export default {
  data() { return {
    password: 'secret',
    other: 'I have an icon',
    sizes: 'Text size',
  } },
}
</script>
