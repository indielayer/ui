<template>
  <svg
    class="stroke-2 inline-block"
    v-bind="$attrs"
    :class="[
      {
        'h-3 w-3': $props.size === 'xs',
        'h-4 w-4': $props.size === 'sm',
        'h-5 w-5': !['xs', 'sm', 'xl'].includes($props.size),
        'h-6 w-6': $props.size === 'xl',
      },
    ]"
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
    stroke-linecap="round"
    stroke-linejoin="round"
    xmlns="http://www.w3.org/2000/svg"
  >
    <g v-html="icons[$props.icon] ? icons[$props.icon] : $props.icon" />
  </svg>
</template>

<script>
export default {
  name: 'XIcon',

  props: {
    icon: {
      type: String,
      required: true,
    },

    size: {
      type: String,
      default: null,
    },
  },

  computed: {
    icons() {
      return this.$icons ? this.$icons : {}
    },
  },
}
</script>
