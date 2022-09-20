<script lang="ts">
export default { name: 'XImage' }
</script>

<script setup lang="ts">
import { watch, ref } from 'vue'
import { useTheme } from '../../composables/theme'

import theme from './Image.theme'

const fallback = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

const props = defineProps({
  src: String,
})

const source = ref<string | undefined>(fallback)

if (typeof window !== 'undefined' && Image) {
  watch(() => props.src, (src) => {
    if (!src) return
    const img = new Image()

    img.onload = () => { source.value = props.src }
    img.onerror = () => { }
    img.src = src
  }, {
    immediate: true,
  })
}

const { styles, classes, className } = useTheme('image', theme, props)
</script>

<template>
  <img :class="[className, classes.wrapper]" :style="styles" :src="source" />
</template>
