<script lang="ts">
const linkProps = {
  ...useColors.props(),
  tag: {
    type: String,
    default: 'a',
  },
  to: [String, Object],
  shadow: Boolean,
  external: Boolean,
  underline: Boolean,
}

export type LinkProps = ExtractPublicPropTypes<typeof linkProps>

type InternalClasses = 'wrapper'
export interface LinkTheme extends ThemeComponent<LinkProps, InternalClasses> {}

export default { name: 'XLink' }
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
import { useColors } from '../../composables/useColors'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { externalIcon } from '../../common/icons'

import XIcon from '../icon/Icon.vue'

const props = defineProps(linkProps)

const { styles, classes, className } = useTheme('Link', {}, props)
</script>

<template>
  <component
    :is="to ? (tag !== 'a' ? tag : 'router-link') : tag"
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
      <x-icon :icon="externalIcon" />
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

    :global(.dark) &,
    &:global(.dark) {
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
