<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const badgeAlign = ['left', 'right'] as const
const badgePosition = ['top', 'bottom'] as const
const badgeProps = {
  ...useCommon.props(),
  ...useColors.props('primary'),
  tag: {
    type: String,
    default: 'div',
    description: 'Root element tag.',
  },
  position: {
    type: String as PropType<BadgePosition>,
    default: 'top',
    description: 'Vertical placement of the badge relative to the content (top, bottom).',
  },
  align: {
    type: String as PropType<BadgeAlign>,
    default: 'right',
    description: 'Horizontal placement of the badge relative to the content (left, right).',
  },
  offsetX: {
    type: [Number, String],
    description: 'Horizontal offset in pixels from the aligned edge.',
  },
  offsetY: {
    type: [Number, String],
    description: 'Vertical offset in pixels from the positioned edge.',
  },
  animated: optionalBooleanProp('Adds a ping animation around the badge.'),
  outlined: optionalBooleanProp('Adds a border around the badge.'),
  icon: {
    type: String,
    description: 'Icon name for the badge indicator. Prefer the content slot for custom content.',
  },
  show: {
    type: Boolean,
    default: true,
    description: 'Controls whether the badge indicator is visible.',
  },
}

export type BadgePosition = typeof badgePosition[number]
export type BadgeAlign = typeof badgeAlign[number]
export type BadgeProps = ExtractPublicPropTypes<typeof badgeProps>

type InternalClasses = 'wrapper'
export interface BadgeTheme extends ThemeComponent<BadgeProps, InternalClasses> {}

export default {
  name: 'XBadge',
  validators: {
    ...useCommon.validators(),
    position: badgePosition,
    align: badgeAlign,
  },
  docs: {
    slots: {
      default: 'Content the badge is attached to.',
      content: 'Badge label or custom indicator content.',
    },
  },
}
</script>

<script setup lang="ts">
import { computed, useSlots, type PropType, type ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useResolvedComponentProps } from '../../composables/resolveComponentDefaults'
import { useCommon } from '../../composables/useCommon'
import { useColors } from '../../composables/useColors'

const props = defineProps(badgeProps)
const resolvedProps = useResolvedComponentProps('Badge', props)

const slots = useSlots()

const positionClasses = computed(() => {
  const classes = []

  if (props.position === 'top') classes.push('top-0')
  if (props.position === 'bottom') classes.push('bottom-0')
  if (props.align === 'left') classes.push('left-0')
  if (props.align === 'right') classes.push('right-0')
  if (slots.content) classes.push('-m-[7.5%]')
  else if (resolvedProps.value.outlined) {
    classes.push('-m-[5%]')
  } else {
    classes.push('-m-[3.5%]')
  }

  return classes
})

const offsetStyle = computed(() => {
  const style: any = {}

  if (props.offsetX) style[props.align === 'left' ? 'marginLeft' : 'marginRight'] = props.offsetX + 'px'
  if (props.offsetY) style[props.position === 'top' ? 'marginTop' : 'marginBottom'] = props.offsetY + 'px'

  return style
})

const { styles, classes, className } = useTheme('Badge', {}, props)
</script>

<template>
  <component
    :is="tag"
    :style="styles"
    :class="[
      className,
      classes.wrapper
    ]"
  >
    <div class="relative inline-block">
      <slot></slot>
      <div
        v-if="show"
        class="absolute rounded-full z-10 bg-[color:var(--x-badge-bg)] pointer-events-none"
        :style="offsetStyle"
        :class="[
          positionClasses,
          {
            'border-2 border-secondary-50 dark:border-secondary-900': outlined,
          }
        ]"
      >
        <div
          v-if="animated"
          class="animate-ping opacity-75 absolute top-0 left-0 rounded-full h-full w-full z-10 bg-[color:var(--x-badge-bg)]"
        ></div>
        <div
          class="text-xs text-white overflow-hidden"
          :class="[
            $slots.content ? 'flex items-center justify-center min-w-[1.25rem] h-5 px-1.5' : {
              'p-1': size === 'xs',
              'p-[0.312rem]': size === 'sm',
              'p-1.5': !size || !['xs', 'sm', 'lg', 'xl'].includes(size),
              'p-2': size === 'lg',
              'p-2.5': size === 'xl',
            }
          ]"
        >
          <slot name="content"></slot>
        </div>
      </div>
    </div>
  </component>
</template>
