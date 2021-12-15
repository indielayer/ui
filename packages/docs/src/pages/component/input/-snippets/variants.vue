<template>
  <div class="grid grid-cols-3 gap-4">
    <x-input v-model="password" label="Password input" type="password" show-password-toggle />
    <x-input v-model="other" label="Input with icon">
      <template #icon>
        <x-icon icon="search"/>
      </template>
    </x-input>
    <x-input v-model="other" label="Icon on the right" icon-right>
      <template #icon>
        <x-icon icon="search"/>
      </template>
    </x-input>
  </div>

  <x-divider class="my-4"/>

  <div class="text-center">
    <x-input v-model="sizes" class="mx-2" label="xs" size="xs" />
    <x-input v-model="sizes" class="mx-2" label="xs" size="sm" />
    <x-input v-model="sizes" class="mx-2" label="md" />
    <x-input v-model="sizes" class="mx-2" label="lg" size="lg" />
    <x-input v-model="sizes" class="mx-2" label="xl" size="xl" />
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
