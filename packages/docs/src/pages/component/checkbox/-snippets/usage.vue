<template>
  <div class="grid grid-cols-5 gap-4">
    <x-checkbox v-model="checked" color="primary" label="Primary" />
    <x-checkbox v-model="checked" color="secondary" label="Secondary" />
    <x-checkbox v-model="checked" color="success" label="Success" />
    <x-checkbox v-model="checked" color="warning" label="Warning" />
    <x-checkbox v-model="checked" color="error" label="Error" />
  </div>
</template>

<script>
export default {
  data() { return { checked: true } },
}
</script>
