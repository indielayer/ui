<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const paginationItemProps = {
  ...useCommon.props(),
  value: {
    type: Number,
    default: 0,
    description: 'Page number shown on the control.',
  },
  selected: {
    type: Boolean,
    description: 'Marks this page as the current selection.',
  },
  links: optionalBooleanProp('Renders as a link to `?page=` instead of a button.'),
}

export type PaginationItemProps = ExtractPublicPropTypes<typeof paginationItemProps>

type InternalClasses = 'wrapper'
export interface PaginationItemTheme extends ThemeComponent<PaginationItemProps, InternalClasses> {}

export default {
  name: 'XPaginationItem',
  validators: {
    ...useCommon.validators(),
  },
  docs: {
    emits: {
      input: 'Emitted with the page number when an unselected item is clicked.',
    },
  },
}
</script>

<script setup lang="ts">
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useCommon } from '../../composables/useCommon'

import XButton from '../button/Button.vue'

import type { ExtractPublicPropTypes } from 'vue'

const props = defineProps(paginationItemProps)

defineEmits(['input'])

const { styles, classes, className } = useTheme('PaginationItem', {}, props)
</script>

<template>
  <li>
    <x-button
      :to="links ? `?page=${value}` : undefined"
      :size="size"
      :style="styles"
      :class="[
        className,
        classes.wrapper
      ]"
      :outlined="!selected"
      :color="selected ? 'primary' : undefined"
      @click="!selected ? $emit('input', value) : null"
    >
      {{ value }}
    </x-button>
  </li>
</template>
