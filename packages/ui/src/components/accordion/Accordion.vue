<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const accordionProps = {
  tag: {
    type: String,
    default: 'div',
    description: 'Root element tag.',
  },
  disabled: {
    type: Boolean,
    description: 'Disables all accordion items when set.',
  },
  expanded: optionalBooleanProp('Default expanded state passed to child items.'),
  showIcon: {
    type: Boolean,
    default: true,
    description: 'Shows the expand/collapse icon on child items.',
  },
  icon: {
    type: String,
    description: 'Default expand/collapse icon name for child items.',
  },
  iconAlign: {
    type: String as PropType<AccordionItemAlign>,
    description: 'Default icon alignment for child items (left or right).',
  },
}

export type AccordionProps = ExtractPublicPropTypes<typeof accordionProps>

export type AccordionInjection = AccordionProps & {
  isInsideAccordion: boolean;
}

type InternalClasses = 'wrapper'
export interface AccordionTheme extends ThemeComponent<AccordionProps, InternalClasses> {}

export default {
  name: 'XAccordion',
  validators: {},
  docs: {
    slots: {
      default: 'Accordion items (typically x-accordion-item children).',
    },
  },
}
</script>

<script setup lang="ts">
import { type ExtractPublicPropTypes, type PropType, provide } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import type { AccordionItemAlign } from './AccordionItem.vue'
import { injectAccordionKey } from '../../composables/keys'

const props = defineProps(accordionProps)

provide(injectAccordionKey, { ...props, isInsideAccordion: true })

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
