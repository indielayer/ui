<template>
  <x-button
    ghost
    class="-ml-2"
    :icon-left="colorMode === 'light' ? 'sun' : 'moon'"
    @click="toggle"
  />
</template>

<script>
export default {
  data() {
    return {
      colorMode: 'light',
    }
  },
  created() {
    try {
      const colorMode = localStorage.getItem('color-mode')

      if (colorMode) this.colorMode = colorMode
    } catch (e) {
      this.colorMode = 'light'
    }

    this.updateMode()
  },
  methods: {
    toggle() {
      this.colorMode = (this.colorMode === 'light') ? 'dark' : 'light'

      this.updateMode()

      try {
        localStorage.setItem('color-mode', this.colorMode)
      } catch (e) {
        this.colorMode = 'light'
      }
    },
    updateMode() {
      this.colorMode === 'light'
        ? document.querySelector('html').classList.remove('dark')
        : document.querySelector('html').classList.add('dark')
    },
  },
}
</script>
