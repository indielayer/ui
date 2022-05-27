<script lang="ts">
import { defineComponent, watch, ref } from 'vue'

const fallback = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

export default defineComponent({
  name: 'XImage',

  props: {
    src: String,
  },

  setup(props) {
    const source = ref<string | undefined>(fallback)

    watch(() => props.src, (src) => {
      if (!src) return
      const img = new Image()

      img.onload = () => { source.value = props.src }
      img.onerror = () => { }
      img.src = src
    }, {
      immediate: true,
    })

    return {
      source,
    }
  },
})
</script>

<template>
  <img :src="source" />
</template>
