<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const linkProps = {
  ...useColors.props('secondary'),
  tag: {
    type: String,
    default: 'a',
  },
  to: [String, Object],
  shadow: optionalBooleanProp(),
  external: optionalBooleanProp(),
  underline: optionalBooleanProp(),
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

<style module scoped>
.link {
  color: var(--x-link-text);
}

.link:hover {
  color: var(--x-link-text-hover, var(--x-link-text));
}

.link--shadow {
  box-shadow: inset 0 -0.315em 0 0 var(--x-link-shadow);
}

.link--shadow:hover {
  box-shadow: inset 0 -1.325em 0 0 var(--x-link-shadow);
}

:global(.dark) .link,
.link:global(.dark) {
  color: var(--x-link-dark-text);
}

:global(.dark) .link:hover,
.link:global(.dark):hover {
  color: var(--x-link-dark-text-hover, var(--x-link-dark-text));
}

:global(.dark) .link--shadow,
.link--shadow:global(.dark) {
  box-shadow: inset 0 -0.315em 0 0 var(--x-link-dark-shadow);
}

:global(.dark) .link--shadow:hover,
.link--shadow:global(.dark):hover {
  box-shadow: inset 0 -1.325em 0 0 var(--x-link-dark-shadow);
}
</style>
