<script lang="ts">
import { computed, defineComponent, inject } from 'vue'
import { useCommon } from '../../composables/common'
import { injectIconsKey } from '../../composables/keys'

export default defineComponent({
  name: 'XIcon',

  validators: {
    ...useCommon.validators(),
  },

  props: {
    ...useCommon.props(),
    icon: {
      type: String,
      required: true,
    },
    filled: Boolean,
    viewBox: {
      type: String,
      default: '0 0 24 24',
    },
  },

  setup(props) {
    const icons: any = inject(injectIconsKey, {})
    const sizeClasses = computed(() => {
      if (props.size === 'xs') return 'h-3 w-3'
      else if (props.size === 'sm') return 'h-4 w-4'
      else if (props.size === 'lg') return 'h-6 w-6'
      else if (props.size === 'xl') return 'h-9 w-9'

      return 'h-5 w-5'
    })

    return {
      icons,
      sizeClasses,
    }
  },
})
</script>

<template>
  <svg
    :class="[sizeClasses, { 'stroke-2': !filled}]"
    :fill="filled ? 'currentColor' : 'none'"
    :stroke="filled ? undefined : 'currentColor'"
    :viewBox="viewBox"
    :stroke-linecap="filled ? undefined : 'round'"
    :stroke-linejoin="filled ? undefined : 'round'"
    xmlns="http://www.w3.org/2000/svg"
    v-html="icons[icon] ? icons[icon] : icon"
  />
</template>
