<template>
  <div class="grid grid-cols-4 gap-4">
    <x-radio
      v-model="selected"
      value="a"
      color="rose"
      label="Option A"
    >
      option extra content
    </x-radio>
    <x-radio
      v-model="selected"
      value="b"
      color="amber"
      glow
      label="Option B"
    >Glow</x-radio>
    <x-radio
      v-model="selected"
      value="c"
      color="sky"
      glow
      label="Option C"
    >Glow</x-radio>
    <x-radio
      v-model="selected"
      value="d"
      color="indigo"
      glow
      label="Option D"
    >Glow</x-radio>
  </div>
</template>

<script>
export default {
  data() { return { selected: 'a' } },
}
</script>
