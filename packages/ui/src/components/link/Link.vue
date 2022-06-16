<script lang="ts">
import { defineComponent, computed } from 'vue'
import { useColors } from '../../composables/colors'
import { useCSS } from '../../composables/css'

export default defineComponent({
  name: 'XLink',

  props: {
    ...useColors.props(),
    tag: {
      type: String,
      default: 'a',
    },
    to: [String, Object],
    shadow: Boolean,
    external: Boolean,
    underline: Boolean,
  },

  setup(props) {
    const css = useCSS()
    const colors = useColors()
    const styles = computed(() => {
      const color = colors.getPalette(props.color || 'gray')

      return css.variables({
        text: props.color ? color[500] : '',
        hover: {
          text: !props.shadow ? color[600] : '',
        },
        shadow: color[100],
        dark: {
          text: props.color ? color[400] : '',
          hover: {
            text: color[300],
          },
          shadow: color[900],
        },
      })
    })

    return {
      styles,
    }
  },
})
</script>

<template>
  <component
    :is="to ? 'router-link' : tag"
    :to="to"
    class="transition duration-300 ease-in-out cursor-pointer inline-flex
      text-[color:var(--x-text)]
      dark:text-[color:var(--x-dark-text)]
    "
    :style="styles"
    :class="[
      [shadow ? $style['link--shadow'] : ''],
      {
        'underline': underline
      },
    ]"
  >
    <span
      v-if="external"
      class="inline-flex items-center"
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
        class="stroke-2 w-4 h-4 ml"
      >
        <line x1="7" y1="17" x2="17" y2="7" />
        <polyline points="7 7 17 7 17 17" />
      </svg>
    </span>
    <template v-else>
      <slot></slot>
    </template>
  </component>
</template>

<style lang="postcss" module scoped>
  .link {
    &--shadow {
      box-shadow: inset 0 -0.315em 0 0 var(--x-shadow);
      &:hover {
        box-shadow: inset 0 -1.125em 0 0 var(--x-shadow);
      }
    }

    :global(.dark) & {
      &--shadow {
        box-shadow: inset 0 -0.315em 0 0 var(--x-dark-shadow);
        &:hover {
          box-shadow: inset 0 -1.125em 0 0 var(--x-dark-shadow);
        }
      }
    }
  }
</style>
