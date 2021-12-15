<template>
  <div class="grid grid-cols-4 gap-4">
    <x-radio
      v-model="selected"
      value="a"
      color="emerald"
      bordered
      label="Bordered"
    />
    <x-radio
      v-model="selected"
      value="a"
      color="rose"
      bordered
      label="Bordered with content"
    >
      I'm the content
    </x-radio>
    <x-radio
      v-model="selected"
      value="a"
      color="amber"
      glow
      label="Option C"
    />
    <x-radio
      v-model="selected"
      value="a"
      color="sky"
      glow
      label="Option D"
    />
  </div>
</template>

<script>
export default {
  data() { return { selected: 'a' } },
}
</script>
