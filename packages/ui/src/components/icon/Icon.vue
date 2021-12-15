<template>
  <svg
    class="stroke-2 inline-block"
    :class="[
      {
        'h-3 w-3': size === 'xs',
        'h-4 w-4': size === 'sm',
        'h-5 w-5': !['xs', 'sm', 'xl'].includes(size),
        'h-6 w-6': size === 'xl',
      },
    ]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g v-html="icons[icon] ? icons[icon] : icon" />
  </svg>
</template>

<script>
import { withProps, withValidator } from '../../composables/common'

export default {
  name: 'XIcon',

  validator: withValidator(),

  props: {
    ...withProps(),

    icon: {
      type: String,
      required: true,
    },
  },

  computed: {
    icons() {
      return this.$icons ? this.$icons : {}
    },
  },
}
</script>
