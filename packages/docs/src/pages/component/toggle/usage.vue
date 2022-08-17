<template>
  <div class="grid grid-cols-4 gap-4">
    <x-toggle v-model="checked" color="primary" label="Primary" />
    <x-toggle v-model="checked" color="secondary" label="Secondary" />
    <x-toggle v-model="checked" color="success" label="Success" />
    <x-toggle v-model="checked" color="warning" label="Warning" />
  </div>
</template>

<script>
export default {
  data() { return { checked: true } },
}
</script>
