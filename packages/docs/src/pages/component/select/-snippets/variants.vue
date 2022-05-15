<template>
  <!-- <div class="text-center">
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
  </div> -->
  <div class="text-center">
    <div class="mx-2">
      <x-select
        v-model="selected"
        label="lets go"
        :options="options"
        placeholder="xs"
        size="xs"
      />
      <x-button size="xs">Go</x-button>
    </div>
    <div class="mx-2">
      <x-select
        v-model="selected"
        :options="options"
        multiple
        placeholder="sm"
        size="sm"
      />
      <x-button size="sm">Go</x-button>
    </div>
    <div class="mx-2">
      <x-select v-model="selected" :options="options" placeholder="md"/>
      <x-button size="md">Go</x-button>
    </div>
    <div class="mx-2">
      <x-select
        v-model="selected"
        :options="options"
        placeholder="lg"
        size="lg"
      />
      <x-button size="lg">Go</x-button>
    </div>
    <div class="mx-2">
      <x-select
        v-model="selected"
        :options="options"
        placeholder="xl"
        size="xl"
      />
      <x-button size="xl">Go</x-button>
    </div>
  </div></template>

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
