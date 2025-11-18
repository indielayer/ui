<script lang="ts">
const toggleTipProps = {
  content: String,
  icon: String,
}

export type ToggleTipProps = ExtractPublicPropTypes<typeof toggleTipProps>

export default { name: 'XToggleTip' }
</script>

<script setup lang="ts">
import { computed, type ExtractPublicPropTypes } from 'vue'
import XTooltip from './Tooltip.vue'
import XIcon from '../icon/Icon.vue'

import { infoIcon } from '../../common/icons'

const props = defineProps(toggleTipProps)

const computedIcon = computed(() => props.icon || infoIcon)
</script>

<template>
  <x-tooltip position="right">
    <x-icon :icon="computedIcon" class="text-secondary-500 dark:text-secondary-300 cursor-pointer" />
    <template #tooltip>
      <div v-html="content"></div>
    </template>
  </x-tooltip>
</template>
