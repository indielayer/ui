<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const avatarProps = {
  ...useCommon.props(),
  ...useColors.props('primary'),
  tag: {
    type: String,
    default: 'div',
    description: 'Root element tag.',
  },
  name: {
    type: String,
    description: 'Display name used to derive initials when no image is loaded.',
  },
  alt: {
    type: String,
    description: 'Alt text for the image when `image` is set.',
  },
  image: {
    type: String,
    description: 'Image URL. Falls back to initials or the avatar icon if unloadable.',
  },
  outlined: optionalBooleanProp('Outline style with a transparent fill.'),
  rounded: optionalBooleanProp('Fully rounded corners (circle).'),
}

export type AvatarProps = ExtractPublicPropTypes<typeof avatarProps>

type InternalClasses = 'wrapper'
type InternalExtraData = { source: Ref<string | undefined>; }
export interface AvatarTheme extends ThemeComponent<AvatarProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XAvatar',
  validators: useCommon.validators(),
  docs: {
    slots: {
      avatarIcon: 'Fallback icon when no name or image is available.',
    },
  },
}
</script>

<script setup lang="ts">
import { computed, ref, watch, type ExtractPublicPropTypes, type Ref } from 'vue'
import { useCommon } from '../../composables/useCommon'
import { useColors } from '../../composables/useColors'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { avatarIcon } from '../../common/icons'

import XIcon from '../../components/icon/Icon.vue'

const props = defineProps(avatarProps)

const source = ref<string>()
const initials = computed(() => {
  if (props.name) {
    const initials = props.name.match(/\b\w/g) || []

    return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
  }

  return ''
})

if (typeof window !== 'undefined' && Image) {
  watch(() => props.image, (src) => {
    source.value = undefined
    if (!src) return
    const img = new Image()

    img.onload = () => { source.value = props.image }
    img.onerror = () => { }
    img.src = src
  }, {
    immediate: true,
  })
}

const { styles, classes, className } = useTheme('Avatar', {}, props, { source })
</script>

<template>
  <component
    :is="tag"
    :style="styles"
    :class="[
      className,
      $style.avatar,
      classes.wrapper,
    ]"
  >
    <img
      v-if="source"
      :alt="alt"
      :src="image"
      class="absolute top-0 left-0 h-full w-full"
    />

    <span
      v-if="name"
      class="leading-none"
    >{{ initials }}</span>

    <slot v-else-if="!name" name="avatarIcon">
      <x-icon :size="size" :icon="avatarIcon"/>
    </slot>
  </component>
</template>

<style module>
.avatar {
  color: var(--x-avatar-text);
  background-color: var(--x-avatar-bg);
  border-color: var(--x-avatar-border);

  :global(.dark) &,
  &:global(.dark) {
    color: var(--x-avatar-dark-text, var(--x-avatar-text));
    background-color: var(--x-avatar-dark-bg, var(--x-avatar-bg));
    border-color: var(--x-avatar-dark-border, var(--x-avatar-border));
  }
}
</style>
