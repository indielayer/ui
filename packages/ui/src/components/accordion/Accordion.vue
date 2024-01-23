<script lang="ts">
const accordionProps = {
  tag: {
    type: String,
    default: 'div',
  },
  disabled: Boolean,
  expanded: Boolean,
  showIcon: {
    type: Boolean,
    default: true,
  },
  icon: String,
  iconAlign: String as PropType<AccordionItemAlign>,
}

export type AccordionProps = ExtractPublicPropTypes<typeof accordionProps>

type InternalClasses = 'wrapper'
export interface AccordionTheme extends ThemeComponent<AccordionProps, InternalClasses> {}

export default {
  name: 'XAccordion',
  validators: {},
}
</script>

<script setup lang="ts">
import { type ExtractPublicPropTypes, type PropType, provide } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import type { AccordionItemAlign } from './AccordionItem.vue'
import { injectAccordionKey } from '../../composables/keys'

const props = defineProps(accordionProps)

provide(injectAccordionKey, props)

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
    <slot></slot>
  </div>
</template>
