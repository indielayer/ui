<script lang="ts">
const toggleTipProps = {
  content: {
    type: String,
    description: 'HTML or text shown inside the tooltip.',
  },
  icon: {
    type: String,
    description: 'Icon name for the trigger. Defaults to the info icon.',
  },
}

export type ToggleTipProps = ExtractPublicPropTypes<typeof toggleTipProps>

export default {
  name: 'XToggleTip',
  docs: {},
}
</script>

<script setup lang="ts">
import { computed, type ExtractPublicPropTypes } from 'vue'
import XTooltip from './Tooltip.vue'
import XIcon from '../icon/Icon.vue'
import { questionIcon } from '../../common/icons'

const props = defineProps(toggleTipProps)

const computedIcon = computed(() => props.icon || questionIcon)
</script>

<template>
  <x-tooltip position="right">
    <x-icon :icon="computedIcon" class="text-secondary-400 cursor-pointer" size="xs" />
    <template #tooltip>
      <div v-html="content"></div>
    </template>
  </x-tooltip>
</template>
