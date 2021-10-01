<template>
  <component
    :is="$props.tag"
    v-bind="$attrs"
    class="flex border-b border-gray-200 dark:border-gray-700 space-x-4"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'XTabs',

  props: {
    tag: {
      type: String,
      default: 'ul',
    },
  },
}
</script>
