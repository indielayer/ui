<template>
  <div class="grid grid-cols-4 gap-4">
    <x-radio v-model="selected" value="a" label="Option A" />
    <x-radio v-model="selected" value="b" label="Option B" />
    <x-radio v-model="selected" value="c" label="Option C" />
    <x-radio v-model="selected" value="d" label="Option D" />
  </div>
</template>

<script>
export default {
  data() { return { selected: 'a' } },
}
</script>
