<template>
  <component
    :is="$props.tag"
    v-bind="$attrs"
    class="container mx-auto px-4"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'XContainer',

  props: {
    tag: {
      type: String,
      default: 'div',
    },
  },
}
</script>
