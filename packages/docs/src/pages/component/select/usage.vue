<template>
  <x-select
    v-model="selected"
    label="Simple select"
    :options="options"
    helper="Helper text"
    native
    placeholder="Placeholder"
  />
  <x-select v-model="selected" label="Options array" :options="options" class="mx-4"/>

  <x-select
    v-model="selectedMultiple"
    label="Multi select"
    placeholder="Let's go baby"
    :options="options"
    multiple
  />
</template>

<script>
export default {
  data() {
    return {
      selected: null,
      selectedMultiple: ['A', 'B'],
      options: [
        { value: 'A', label: 'Option Ao qoiw oqi jdoqiwd oqid joqiw jdoijoi' },
        { value: 'B', label: 'Option B' },
      ],
    }
  },
  created() {
    for (let i = 0; i < 20; i++) {
      this.options.push({ value: i, label: 'Option ' + i })
    }
  },
}
</script>
