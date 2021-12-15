<template>
  <img :src="source" />
</template>

<script>
const fallback = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

export default {
  props: {
    src: {
      type: String,
      default: '',
    },
  },

  data() {
    return {
      source: fallback,
    }
  },

  mounted() {
    const img = new Image()

    img.onload = () => { this.source = this.src }
    img.onerror = () => { }
    img.src = this.src
  },
}
</script>
