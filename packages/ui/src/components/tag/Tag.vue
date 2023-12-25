<script lang="ts">
const tagProps = {
  ...useCommon.props(),
  ...useColors.props('gray'),
  tag: {
    type: String,
    default: 'span',
  },
  rounded: Boolean,
  removable: Boolean,
  outlined: Boolean,
}

export type TagProps = ExtractPublicPropTypes<typeof tagProps>

export default {
  name: 'XTag',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import { computed, type ExtractPublicPropTypes } from 'vue'
import { useColors } from '../../composables/useColors'
import { useCommon } from '../../composables/useCommon'
import { useTheme } from '../../composables/useTheme'
import { closeIcon } from '../../common/icons'

import XIcon from '../icon/Icon.vue'

import theme from './Tag.theme'

const props = defineProps(tagProps)

defineEmits(['remove'])

const closeIconSize = computed(() => {
  if (props.size === 'xs') return 'xs'
  else if (props.size === 'sm') return 'sm'
  else if (props.size === 'lg') return 'md'
  else if (props.size === 'xl') return 'lg'

  return 'sm'
})

const { styles, classes, className } = useTheme('tag', theme, props)
</script>

<template>
  <component
    :is="tag"
    class="text-[color:var(--x-tag-text)] dark:text-[color:var(--x-tag-dark-text)] border-[color:var(--x-tag-border)"
    :style="styles"
    :class="
      [
        className,
        classes.wrapper,
        outlined ? 'border' : 'bg-[color:var(--x-tag-bg)]',
        rounded ? 'rounded-full' : 'rounded'
      ]"
  >
    <span
      v-if="removable"
      class="max-w-full truncate"
    >
      <slot></slot>
      <x-icon
        :size="closeIconSize"
        :icon="closeIcon"
        class="ml-1 cursor-pointer hover:text-gray-700 transition-colors duration-150"
        @click="(e: Event) => $emit('remove', e)"
      />
    </span>

    <slot v-else></slot>
  </component>
</template>
