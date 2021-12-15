<template>
  <component
    :is="tag"
    class="inline-block relative"
  >
    <slot></slot>
    <div
      v-if="animate"
      class="animate-ping opacity-75 absolute -top-0.5 -right-0.5 rounded-full h-3 w-3 z-10"
      :class="[`bg-${color}-500`]"
    >
    </div>
    <div
      class="absolute -top-0.5 -right-0.5 rounded-full h-3 w-3 z-10"
      :class="[`bg-${color}-500`]"
    ></div>
  </component>
</template>

<script>
export default {
  name: 'XStatusDot',

  props: {
    animate: {
      type: Boolean,
      default: false,
    },

    color: {
      type: String,
      default: 'primary',
    },

    tag: {
      type: String,
      default: 'div',
    },
  },
}
</script>
