<template>
  <x-button
    :icon="icon"
    size="lg"
    color="none"
    :class="animation"
    flat
    @click="copyText"
  />
</template>

<script>
export default {
  props: {
    text: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      icon: 'copy',
      animation: '',
    }
  },
  beforeUnmount() {
    clearTimeout(this.timeout)
  },
  methods: {
    copyText() {
      clearTimeout(this.timeout)
      // this.icon = 'copy'
      this.animation = 'animate-ping'
      this.copy(this.text)
      this.timeout = setTimeout(() => {
        // this.icon = 'copy'
        this.animation = ''
      }, 1000)
    },
    copy(text) {
      const el = document.createElement('textarea')

      el.value = text
      document.body.appendChild(el)
      el.select()
      document.execCommand('copy')
      document.body.removeChild(el)
    },
  },
}
</script>
