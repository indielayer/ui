<script lang="ts">
import { computed, defineComponent, type PropType } from 'vue'
import { useColors } from '@/composables/colors'
import { useCSS } from '@/composables/css'

export default defineComponent({
  name: 'XAlert',

  props: {
    ...useColors.props(),
    tag: {
      type: String,
      default: 'div',
    },
    type: String as PropType<'info' | 'success' | 'error' | 'warning' | undefined>,
    glow: Boolean,
    light: Boolean,
    outlined: Boolean,
    removable: Boolean,
  },

  emits: ['remove'],

  setup(props) {
    const css = useCSS('alert')
    const colors = useColors()
    const gray = colors.getPalette('gray')
    const styles = computed(() => {
      const color = colors.getPalette(props.color)
      const vars: (object | string)[] = []

      if (props.glow) vars.push(css.get('glow', colors.getColorOpacity(color[500], 0.5)))

      if (props.color) {
        if (props.light) {
          vars.push(css.variables({
            bg: color[50],
            text: color[600],
            icon: color[600],
            border: props.outlined ? color[600] : color[50],
            dark: {
              bg: color[200],
              text: color[800],
              icon: color[600],
              border: props.outlined ? color[500] : color[200],
            },
          }))
        } else {
          vars.push(css.variables({
            bg: props.outlined ? 'transparent' : color[600],
            text: props.outlined ? color[600] : color[50],
            icon: props.outlined ? color[600] : color[50],
            border: color[600],
            dark: {
              border: color[400],
              text: props.outlined ? color[400] : color[50],
            },
          }))
        }

        return vars
      }

      vars.push(css.variables({
        bg: 'transparent',
        text: color[500],
        border: color[300],
        dark: {
          bg: 'transparent',
          text: color[300],
          border: color[500],
        },
      }))

      return vars
    })

    return {
      styles,
    }
  },
})
</script>

<template>
  <component
    :is="tag"
    class="flex rounded-md px-4 py-2 border items-center"
    :class="[
      $style['alert'],
      glow ? $style['alert--glow'] : '',
    ]"
    :style="styles"
  >
    <div v-if="$slots.icon" class="flex-none pr-2">
      <slot name="icon"></slot>
    </div>
    <svg
      v-else-if="type"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-linejoin="round"
      stroke-linecap="round"
      fill="none"
      role="presentation"
      class="flex-none stroke-2 w-5 h-5 mr-2 text-[color:var(--x-alert-icon)] dark:text-[color:var(--x-dark-alert-icon)]"
    >
      <template v-if="type === 'info'">
        <path d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </template>

      <template v-if="type === 'success'">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
      </template>

      <template v-if="type === 'error'">
        <path d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </template>
      <template v-if="type === 'warning'">
        <path d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
      </template>
    </svg>

    <slot></slot>

    <template v-if="removable">
      <div class="flex-grow"></div>
      <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-linecap="round"
        fill="none"
        role="presentation"
        class="stroke-2 w-5 h-5 ml-1 cursor-pointer shrink-0"
        @click="(e) => $emit('remove', e)"
      >
        <path d="M6 18L18 6M6 6l12 12" />
      </svg>
    </template>
  </component>
</template>

<style lang="postcss" module scoped>
.alert {
  color: var(--x-alert-text);
  background-color: var(--x-alert-bg);
  border-color: var(--x-alert-border);

  &--glow {
    box-shadow: 0 0 #000, 0 0 #000, 0 10px 15px -3px var(--x-alert-glow), 0 4px 6px -4px var(--x-alert-glow);
  }

  :global(.dark) & {
    color: var(--x-dark-alert-text, var(--x-alert-text));
    background-color: var(--x-dark-alert-bg, var(--x-alert-bg));
    border-color: var(--x-dark-alert-border, var(--x-alert-border));
  }
}
</style>
