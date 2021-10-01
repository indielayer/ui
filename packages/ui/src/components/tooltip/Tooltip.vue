<template>
  <x-popover hover class="dark" v-bind="$attrs">
    <slot></slot>
    <template #content>
      <x-popover-container class="p-2 text-gray-300 text-sm">
        <slot name="tooltip"></slot>
      </x-popover-container>
    </template>
  </x-popover>
</template>

<script>
import XPopover from '../popover/Popover.vue'
import XPopoverContainer from '../popover/PopoverContainer.vue'

export default {
  components: {
    XPopover,
    XPopoverContainer,
  },
}
</script>
