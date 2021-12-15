<template>
  <div class="grid grid-cols-4 gap-4">
    <x-textarea v-model="name" label="Normal textarea" placeholder="Placeholder" />
    <x-textarea v-model="multiline" label="Multiline adjust" />
  </div>
</template>

<script>
export default {
  data() { return {
    name: '',
    multiline: 'auto\nadjusted\nheight',
  } },
}
</script>
