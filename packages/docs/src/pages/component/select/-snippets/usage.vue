<template>
  <!-- <div class="grid grid-cols-4 gap-4"> -->
  <x-select
    v-model="selected"
    label="Simple select"
    :options="options"
    placeholder="Placeholder"
    class="w-64"
  />
  <x-select v-model="selected" label="Options array" :options="options" class="mx-4"/>
  <x-select
    v-model="selectedMultiple"
    label="Options array"
    placeholder="Let's go baby"
    :options="options"
    multiple
    class="w-64"
  />
  <!-- </div> -->
</template>

<script>
export default {
  data() { return {
    selected: null,
    selectedMultiple: [],
    options: [
      { value: 'A', label: 'Option Ao qoiw oqi jdoqiwd oqid joqiw jdoijoi' },
      { value: 'B', label: 'Option B' },
    ],
  } },
  created() {
    for (let i = 0; i < 20; i++) {
      this.options.push({ value: i, label: 'Option ' + i })
    }
  },
}
</script>
