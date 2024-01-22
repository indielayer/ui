<script lang="ts">
const avatarProps = {
  ...useCommon.props(),
  ...useColors.props('primary'),
  tag: {
    type: String,
    default: 'div',
  },
  name: String,
  alt: String,
  image: String,
  outlined: Boolean,
  rounded: Boolean,
}

export type AvatarProps = ExtractPublicPropTypes<typeof avatarProps>

type InternalClasses = 'wrapper'
type InternalExtraData = { source: Ref<string | undefined>; }
export interface AvatarTheme extends ThemeComponent<AvatarProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XAvatar',
  validators: useCommon.validators(),
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
      class="h-full w-full"
    />

    <span
      v-else-if="name"
      class="leading-none"
    >{{ initials }}</span>

    <slot v-else-if="!name" name="avatarIcon">
      <x-icon :size="size" :icon="avatarIcon"/>
    </slot>
  </component>
</template>

<style lang="postcss" module>
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
