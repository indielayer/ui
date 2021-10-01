<template>
  <component
    :is="tag"
    v-bind="$attrs"
    class="inline-block w-full bg-white dark:bg-gray-700 shadow-lg rounded-md border-t border border-gray-200 dark:border-gray-800"
  >
    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'XPopoverContainer',

  props: {
    tag: {
      default: 'div',
      type: String,
    },
  },

  created() {
    if (this.$parent.$options.name !== 'XPopover') {
      this.$destroy()
      throw new Error('PopoverContainer must be wrap with Popover')
    }
  },
}
</script>
