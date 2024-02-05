<template>
  <div class="grid grid-cols-3 gap-4">
    <x-select
      v-model="selected"
      label="Simple native select"
      placeholder="Placeholder"
      :options="options"
      helper="Helper text"
      tooltip="Tooltip here"
      native
    />
    <x-select
      v-model="selected"
      label="Dropdown select"
      placeholder="Placeholder"
      :options="options"
    />
    <x-select
      v-model="selectedMultiple"
      label="Multi select"
      placeholder="Let's go baby"
      :options="options"
      multiple
    />
  </div>
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
