<script lang="ts">
const tooltipProps = {}

export type TooltipProps = ExtractPublicPropTypes<typeof tooltipProps>

export default { name: 'XTooltip' }
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
import XPopover from '../../components/popover/Popover.vue'
import XPopoverContainer from '../../components/popover/PopoverContainer.vue'
</script>

<template>
  <x-popover :triggers="['hover']" class="inline-block">
    <slot></slot>
    <template #content>
      <div class="dark">
        <x-popover-container class="p-2 text-white text-sm w-max max-w-xs">
          <slot name="tooltip"></slot>
        </x-popover-container>
      </div>
    </template>
  </x-popover>
</template>
