<script lang="ts">
export default { name: 'XLink' }
</script>

<script setup lang="ts">
import { useColors } from '../../composables/colors'
import { useTheme } from '../../composables/theme'

import theme from './Link.theme'

const props = defineProps({
  ...useColors.props(),
  tag: {
    type: String,
    default: 'a',
  },
  to: [String, Object],
  shadow: Boolean,
  external: Boolean,
  underline: Boolean,
})

const { styles, classes, className } = useTheme('link', theme, props)
</script>

<template>
  <component
    :is="to ? 'router-link' : tag"
    :to="to"
    :style="styles"
    :class="[
      className,
      $style['link'],
      classes.wrapper,
      [shadow ? $style['link--shadow'] : ''],
      { 'underline': underline },
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
    color: var(--x-link-text);

    &:hover {
      color: var(--x-link-text-hover, var(--x-link-text));
    }

    &--shadow {
      box-shadow: inset 0 -0.315em 0 0 var(--x-link-shadow);
      &:hover {
        box-shadow: inset 0 -1.325em 0 0 var(--x-link-shadow);
      }
    }

    :global(.dark) &, &:global(.dark) {
      color: var(--x-link-dark-text);

      &:hover {
        color: var(--x-link-dark-text-hover, var(--x-link-dark-text));
      }

      &--shadow {
        box-shadow: inset 0 -0.315em 0 0 var(--x-link-dark-shadow);
        &:hover {
          box-shadow: inset 0 -1.325em 0 0 var(--x-link-dark-shadow);
        }
      }
    }
  }
</style>
