<template>
  <div class="grid grid-cols-4 gap-4">
    <x-textarea v-model="name" disabled label="Disabled"/>
    <x-textarea v-model="name" label="Error" error="Invalid input" />
  </div>
</template>

<script>
export default {
  data() { return { name: 'disabled' } },
}
</script>
