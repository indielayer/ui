<template>
  <x-button @click="sendMsg">Toast</x-button>
  <x-toast ref="toaster"/>
</template>

<script>
export default {
  methods: {
    sendMsg() {
      this.$refs.toaster.log('Hello')
    },
  },
}
</script>
