<template>
  <div class="grid grid-cols-5 gap-4">
    <x-checkbox v-model="checked" color="primary" label="Primary" />
    <x-checkbox color="secondary" label="Secondary" />
    <x-checkbox color="success" label="Success" />
    <x-checkbox color="warning" label="Warning" />
    <x-checkbox color="error" label="Error" />
  </div>
</template>

<script>
export default {
  data() { return { checked: true } },
}
</script>
