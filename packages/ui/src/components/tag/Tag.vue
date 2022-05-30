<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useCSS } from '../../composables/css'
import { useColors } from '../../composables/colors'
import { useCommon } from '../../composables/common'

export default defineComponent({
  name: 'XTag',

  props: {
    ...useCommon.props(),
    ...useColors.props('gray'),
    tag: {
      type: String,
      default: 'span',
    },
    rounded: Boolean,
    removable: Boolean,
    outlined: Boolean,
  },

  emits: ['remove'],

  setup(props) {
    const css = useCSS()
    const colors = useColors()
    const styles = computed(() => {
      const color = colors.getPalette(props.color)

      return css.variables({
        bg: color[100],
        text: color[800],
        border: color[800],
        dark: {
          text: props.outlined ? color[200] : color[800],
        },
      })
    })

    const sizeClasses = computed(() => {
      if (props.size === 'xs') return 'px-2 py-1 text-xs'
      else if (props.size === 'sm') return 'px-2 py-1 text-sm'
      else if (props.size === 'lg') return 'px-4 py-3 text-lg'
      else if (props.size === 'xl') return 'px-6 py-6 text-xl'

      return 'px-3 py-2'
    })

    return {
      styles,
      sizeClasses,
    }
  },
})
</script>

<template>
  <component
    :is="tag"
    class="inline-flex items-center leading-none whitespace-nowrap
      text-[color:var(--x-text)]
      dark:text-[color:var(--x-dark-text)]
      border-[color:var(--x-border)
      "
    :style="styles"
    :class="
      [
        sizeClasses,
        outlined ? 'border' : 'bg-[color:var(--x-bg)]',
        rounded ? 'rounded-full' : 'rounded'
      ]"
  >
    <span
      v-if="removable"
      class="flex items-center"
    >
      <slot></slot>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-linecap="round"
        fill="none"
        role="presentation"
        class="stroke-2 w-4 h-4 ml-1 cursor-pointer hover:text-gray-700 transition-colors duration-150 ease-in-out flex-shrink-0"
        @click="(e) => $emit('remove', e)"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </span>

    <template v-else>
      <slot></slot>
    </template>
  </component>
</template>
