<script lang="ts">
import { defineComponent } from 'vue'

import XPopover from '@/components/popover/Popover.vue'
import XPopoverContainer from '@/components/popover/PopoverContainer.vue'

export default defineComponent({
  components: {
    XPopover,
    XPopoverContainer,
  },
})
</script>

<template>
  <x-popover hover class="dark">
    <slot></slot>
    <template #content>
      <x-popover-container class="p-2 text-white text-sm">
        <slot name="tooltip"></slot>
      </x-popover-container>
    </template>
  </x-popover>
</template>
