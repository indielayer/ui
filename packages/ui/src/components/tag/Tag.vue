<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const tagProps = {
  ...useCommon.props(),
  ...useColors.props('secondary'),
  tag: {
    type: String,
    default: 'span',
    description: 'Root element tag. Becomes an anchor or router-link when `href` or `to` is set.',
  },
  rounded: optionalBooleanProp('Fully rounded corners (pill shape).'),
  removable: optionalBooleanProp('Shows a remove control that emits `remove`.'),
  outlined: optionalBooleanProp('Outline style with a transparent fill.'),
  filled: optionalBooleanProp('Filled style using the theme color.'),
  disabled: {
    type: Boolean,
    description: 'Disables the remove control and applies disabled styling.',
  },
  to: {
    type: [String, Object],
    description: 'Vue Router location; renders as a link when set.',
  },
}

export type TagProps = ExtractPublicPropTypes<typeof tagProps>

type InternalClasses = 'wrapper'
export interface TagTheme extends ThemeComponent<TagProps, InternalClasses> {}

export default {
  name: 'XTag',
  validators: {
    ...useCommon.validators(),
  },
  docs: {
    slots: {
      default: 'Tag label and content.',
      prefix: 'Content shown before the label.',
    },
    emits: {
      remove: 'Emitted when the remove icon is clicked.',
    },
  },
}
</script>

<script setup lang="ts">
import { computed, useAttrs, type ExtractPublicPropTypes } from 'vue'
import { useColors } from '../../composables/useColors'
import { useCommon } from '../../composables/useCommon'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useResolvedComponentProps } from '../../composables/resolveComponentDefaults'
import { closeIcon } from '../../common/icons'

import XIcon from '../icon/Icon.vue'

const props = defineProps(tagProps)
const resolvedProps = useResolvedComponentProps('Tag', props)

defineEmits(['remove'])

const closeIconSize = computed(() => {
  if (props.size === 'xs') return 'xs'
  else if (props.size === 'sm') return 'sm'
  else if (props.size === 'lg') return 'md'
  else if (props.size === 'xl') return 'lg'

  return 'sm'
})

const attrs = useAttrs()
const htmlTag = computed(() => (attrs.href ? 'a' : props.to ? 'router-link' : props.tag))

const { styles, classes, className } = useTheme('Tag', {}, props)
</script>

<template>
  <component
    :is="htmlTag"
    :to="to"
    class="text-[color:var(--x-tag-text)] dark:text-[color:var(--x-tag-dark-text)] border relative"
    :style="styles"
    :class="
      [
        className,
        classes.wrapper,
        resolvedProps.outlined ?
          'border-[color:var(--x-tag-border)] dark:border-[color:var(--x-tag-dark-border)]' :
          '!border-transparent bg-[color:var(--x-tag-bg)] dark:bg-[color:var(--x-tag-dark-bg)]',
        resolvedProps.rounded ? 'rounded-full' : 'rounded'
      ]"
  >
    <span
      class="max-w-full"
      :class="{'pr-4': resolvedProps.removable }"
    >
      <div class="flex items-center gap-2">
        <slot name="prefix"></slot>

        <div class="truncate">
          <slot></slot>
        </div>
      </div>

      <div v-if="resolvedProps.removable" class="absolute right-1.5 top-0 h-full flex items-center">
        <x-icon
          :size="closeIconSize"
          :icon="closeIcon"
          class="cursor-pointer transition-colors duration-150"
          :class="[disabled ? 'text-secondary-400' : 'hover:text-secondary-500']"
          @click.prevent="(e: Event) => !disabled && $emit('remove', e)"
        />
      </div>
    </span>
  </component>
</template>
