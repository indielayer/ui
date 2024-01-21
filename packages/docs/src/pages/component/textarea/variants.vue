<template>
  <div class="grid grid-cols-3 gap-4">
    <x-textarea v-model="sizes" label="xs" size="xs" />
    <x-textarea v-model="sizes" label="xs" size="sm" />
    <x-textarea v-model="sizes" label="md" />
    <x-textarea v-model="sizes" label="lg" size="lg" />
    <x-textarea v-model="sizes" label="xl" size="xl" />
  </div>
</template>

<script>
export default {
  data() { return { sizes: 'Text size' } },
}
</script>
