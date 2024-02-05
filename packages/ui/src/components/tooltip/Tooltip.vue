<script lang="ts">
const tooltipProps = {
  placement: {
    type: String as PropType<PopoverPlacement>,
    default: 'bottom',
  },
}

export type PopoverPlacement = Placement

export type TooltipProps = ExtractPublicPropTypes<typeof tooltipProps>

export default { name: 'XTooltip' }
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes, PropType } from 'vue'
import XPopover from '../../components/popover/Popover.vue'
import XPopoverContainer from '../../components/popover/PopoverContainer.vue'
import { type Placement } from 'floating-vue'

const props = defineProps(tooltipProps)
</script>

<template>
  <x-popover :triggers="['hover', 'click']" class="inline-block" :hide-arrow="false" :placement="placement">
    <slot></slot>
    <template #content>
      <div class="dark">
        <x-popover-container class="p-2 text-white text-xs w-max max-w-xs">
          <slot name="tooltip"></slot>
        </x-popover-container>
      </div>
    </template>
  </x-popover>
</template>
