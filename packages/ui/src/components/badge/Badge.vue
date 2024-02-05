<script lang="ts">
const badgeAlign = ['left', 'right'] as const
const badgePosition = ['top', 'bottom'] as const
const badgeProps = {
  ...useCommon.props(),
  ...useColors.props('primary'),
  tag: {
    type: String,
    default: 'div',
  },
  position: {
    type: String as PropType<BadgePosition>,
    default: 'top',
  },
  align: {
    type: String as PropType<BadgeAlign>,
    default: 'right',
  },
  offsetX: [Number, String],
  offsetY: [Number, String],
  animated: Boolean,
  outlined: Boolean,
  icon: String,
  show: {
    type: Boolean,
    default: true,
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
}
</script>

<script setup lang="ts">
import { computed, useSlots, type PropType, type ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useCommon } from '../../composables/useCommon'
import { useColors } from '../../composables/useColors'

const props = defineProps(badgeProps)

const slots = useSlots()

const positionClasses = computed(() => {
  const classes = []

  if (props.position === 'top') classes.push('top-0')
  if (props.position === 'bottom') classes.push('bottom-0')
  if (props.align === 'left') classes.push('left-0')
  if (props.align === 'right') classes.push('right-0')
  if (slots.content) classes.push('-m-[7.5%]')
  else if (props.outlined) {
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
        class="absolute rounded-full z-10 bg-[color:var(--x-badge-bg)]"
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
