<script lang="ts">
const carouselSlideProps = {}

export type CarouselSlideProps = ExtractPublicPropTypes<typeof carouselSlideProps>

type InternalClasses = 'wrapper'
export interface CarouselSlideTheme extends ThemeComponent<CarouselSlideProps, InternalClasses> {}

export default {
  name: 'XCarouselSlide',
  validators: {},
}
</script>

<script setup lang="ts">
import { type ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(carouselSlideProps)

const { styles, classes, className } = useTheme('CarouselSlide', {}, props)
</script>

<template>
  <div
    :style="styles"
    :class="[
      className,
      $style['carousel-slide'],
      classes.wrapper,
    ]"
  >
    <slot></slot>
  </div>
</template>

<style lang="postcss" scoped module>
.carousel-slide {
  :slotted(img) {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
}
</style>
