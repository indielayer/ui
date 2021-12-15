<template>
  <div class="text-center">
    <x-select
      v-model="selected"
      class="mx-2"
      :options="options"
      placeholder="xs"
      size="xs"
    />
    <x-select
      v-model="selected"
      class="mx-2"
      :options="options"
      placeholder="sm"
      size="sm"
    />
    <x-select v-model="selected" class="mx-2" :options="options" placeholder="md"/>
    <x-select
      v-model="selected"
      class="mx-2"
      :options="options"
      placeholder="lg"
      size="lg"
    />
    <x-select
      v-model="selected"
      class="mx-2"
      :options="options"
      placeholder="xl"
      size="xl"
    />
  </div>
</template>

<script>
export default {
  data() { return {
    selected: '',
    options: [
      { value: 'A', label: 'Option A' },
      { value: 'B', label: 'Option B' },
    ],
  } },
}
</script>
