<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import { useCSS } from '@/composables/css'
import { useCommon } from '@/composables/common'
import { useColors } from '@/composables/colors'

export default defineComponent({
  name: 'XBadge',

  props: {
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
    animated: Boolean,
    outlined: Boolean,
    icon: String,
    show: {
      type: Boolean,
      default: true,
    },
  },

  setup(props, { slots }) {
    const css = useCSS('badge')
    const colors = useColors()
    const styles = computed(() => {
      const color = colors.getPalette(props.color)

      return css.get('bg', color[500])
    })

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

    return {
      styles,
      positionClasses,
    }
  },
})
</script>

<template>
  <component
    :is="tag"
    class="inline-block"
    :style="styles"
  >
    <div class="relative inline-block">
      <slot></slot>
      <div
        v-if="show"
        class="absolute rounded-full z-10 bg-[color:var(--x-badge-bg)]"
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
            $slots.content ? 'flex items-center justify-center min-w-[1.25rem] h-5 px-0.5' : {
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
