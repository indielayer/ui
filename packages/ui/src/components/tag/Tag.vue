<script lang="ts">
const tagProps = {
  ...useCommon.props(),
  ...useColors.props('slate'),
  tag: {
    type: String,
    default: 'span',
  },
  rounded: Boolean,
  removable: Boolean,
  outlined: Boolean,
  disabled: Boolean,
}

export type TagProps = ExtractPublicPropTypes<typeof tagProps>

type InternalClasses = 'wrapper'
export interface TagTheme extends ThemeComponent<TagProps, InternalClasses> {}

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
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { closeIcon } from '../../common/icons'

import XIcon from '../icon/Icon.vue'

const props = defineProps(tagProps)

defineEmits(['remove'])

const closeIconSize = computed(() => {
  if (props.size === 'xs') return 'xs'
  else if (props.size === 'sm') return 'sm'
  else if (props.size === 'lg') return 'md'
  else if (props.size === 'xl') return 'lg'

  return 'sm'
})

const { styles, classes, className } = useTheme('Tag', {}, props)
</script>

<template>
  <component
    :is="tag"
    class="text-[color:var(--x-tag-text)] dark:text-[color:var(--x-tag-dark-text)] border"
    :style="styles"
    :class="
      [
        className,
        classes.wrapper,
        outlined ?
          'border-[color:var(--x-tag-border)] dark:border-[color:var(--x-tag-dark-border)]' :
          'border-transparent bg-[color:var(--x-tag-bg)] dark:bg-[color:var(--x-tag-dark-bg)]',
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
        class="ml-1.5 -mt-0.5 cursor-pointer transition-colors duration-150"
        :class="[disabled ? 'text-secondary-400' : 'hover:text-secondary-500']"
        @click="(e: Event) => !disabled && $emit('remove', e)"
      />
    </span>

    <slot v-else></slot>
  </component>
</template>
