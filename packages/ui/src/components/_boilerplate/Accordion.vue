<script lang="ts">
const accordionProps = {}

export type AccordionProps = ExtractPublicPropTypes<typeof accordionProps>

type InternalClasses = 'wrapper'
export interface AccordionTheme extends ThemeComponent<AccordionProps, InternalClasses> {}

export default {
  name: 'XAccordion',
  validators: {},
}
</script>

<script setup lang="ts">
import { type ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(accordionProps)

const { styles, classes, className } = useTheme('Accordion', {}, props)
</script>

<template>
  <div
    :style="styles"
    :class="[
      className,
      classes.wrapper,
    ]"
  >
  </div>
</template>
