<script lang="ts">
const imageProps = {
  src: String,
}

export type ImageProps = ExtractPublicPropTypes<typeof imageProps>

type InternalClasses = 'wrapper'
export interface ImageTheme extends ThemeComponent<ImageProps, InternalClasses> {}

export default { name: 'XImage' }
</script>

<script setup lang="ts">
import { watch, ref, type ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const fallback = 'data:image/gif;base64,R0lGODlhAQABAAD/ACwAAAAAAQABAAACADs='

const props = defineProps(imageProps)

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

const { styles, classes, className } = useTheme('Image', {}, props)
</script>

<template>
  <img :class="[className, classes.wrapper]" :style="styles" :src="source" />
</template>
