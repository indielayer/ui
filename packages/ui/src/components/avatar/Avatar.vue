<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useCommon } from '../../composables/common'
import { useColors } from '../../composables/colors'
import { useCSS } from '../../composables/css'

import XIcon from '../../components/icon/Icon.vue'

export default defineComponent({
  name: 'XAvatar',

  components: {
    XIcon,
  },

  validators: {
    ...useCommon.validators(),
  },

  props: {
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
  },

  setup(props) {
    const avatarIcon = '<path d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />'
    const source = ref<string>()
    const initials = computed(() => {
      if (props.name) {
        const initials = props.name.match(/\b\w/g) || []

        return ((initials.shift() || '') + (initials.pop() || '')).toUpperCase()
      }

      return ''
    })

    watch(() => props.image, (src) => {
      if (!src) return
      const img = new Image()

      img.onload = () => { source.value = props.image }
      img.onerror = () => { }
      img.src = src
    }, {
      immediate: true,
    })

    const sizeClasses = computed(() => {
      if (props.size === 'xs') return 'h-6 w-6 text-xs'
      else if (props.size === 'sm') return 'h-9 w-9 text-sm'
      else if (props.size === 'lg') return 'h-12 w-12 text-lg'
      else if (props.size === 'xl') return 'h-[3.75rem] w-[3.75rem] text-xl'

      return 'h-10 w-10'
    })

    const css = useCSS('avatar')
    const colors = useColors()
    const styles = computed(() => {
      const color = colors.getPalette(props.color)

      if (source.value) return css.variables({
        bg: 'transparent',
        border: props.outlined ? color[500] : 'transparent',
      })

      return css.variables({
        bg: color[100],
        text: color[500],
        border: props.outlined ? color[500] : 'transparent',
        dark: {
          bg: color[200],
        },
      })
    })

    return {
      avatarIcon,
      source,
      initials,
      sizeClasses,
      styles,
    }
  },
})
</script>

<template>
  <component
    :is="tag"
    class="relative inline-flex items-center justify-center overflow-hidden align-middle border box-content"
    :style="styles"
    :class="[
      $style.avatar,
      sizeClasses,
      rounded ? 'rounded-full' : 'rounded-md'
    ]"
  >
    <span
      v-if="!source && name"
      class="leading-none"
    >{{ initials }}</span>
    <slot v-else>
      <x-icon :size="size" :icon="avatarIcon"/>
    </slot>
    <img
      v-if="source"
      :alt="alt"
      :src="image"
      class="h-full w-full"
    />
  </component>
</template>

<style lang="postcss" module scoped>
.avatar {
  color: var(--x-avatar-text);
  background-color: var(--x-avatar-bg);
  border-color: var(--x-avatar-border);

  :global(.dark) & {
    color: var(--x-dark-avatar-text, var(--x-avatar-text));
    background-color: var(--x-dark-avatar-bg, var(--x-avatar-bg));
    border-color: var(--x-dark-avatar-border, var(--x-avatar-border));
  }
}
</style>
