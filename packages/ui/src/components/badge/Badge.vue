<script lang="ts">
export default { name: 'XBadge' }
</script>

<script setup lang="ts">
import { computed, useSlots, type PropType } from 'vue'
import { useTheme } from '../../composables/theme'
import { useCommon } from '../../composables/common'
import { useColors } from '../../composables/colors'

import theme from './Badge.theme'

const props = defineProps({
  ...useCommon.props(),
  ...useColors.props('primary'),
  tag: {
    type: String,
    default: 'div',
  },
  position: {
    type: String as PropType<'top' | 'bottom'>,
    default: 'top',
  },
  align: {
    type: String as PropType<'left' | 'right'>,
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
})

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

const { styles, classes, className } = useTheme('badge', theme, props)
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
            'border-2 border-gray-50 dark:border-gray-900': outlined,
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
