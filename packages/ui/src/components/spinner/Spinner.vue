<script lang="ts">
const spinnerProps = {
  ...useCommon.props(),
  icon: {
    type: String,
    default: '<g stroke-width="0"><path fill="currentColor" d="M12,1A11,11,0,1,0,23,12,11,11,0,0,0,12,1Zm0,19a8,8,0,1,1,8-8A8,8,0,0,1,12,20Z" opacity=".25"/><path fill="currentColor" d="M10.72,19.9a8,8,0,0,1-6.5-9.79A7.77,7.77,0,0,1,10.4,4.16a8,8,0,0,1,9.49,6.52A1.54,1.54,0,0,0,21.38,12h.13a1.37,1.37,0,0,0,1.38-1.54,11,11,0,1,0-12.7,12.39A1.54,1.54,0,0,0,12,21.34h0A1.47,1.47,0,0,0,10.72,19.9Z"><animateTransform attributeName="transform" dur="0.65s" repeatCount="indefinite" type="rotate" values="0 12 12;360 12 12"/></path></g>',
  },
}

export type SpinnerProps = ExtractPublicPropTypes<typeof spinnerProps>

export default {
  name: 'XSpinner',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
import { useCommon } from '../../composables/useCommon'

import XIcon from '../../components/icon/Icon.vue'

defineProps(spinnerProps)
</script>

<template>
  <x-icon :icon="icon" :size="size" />
</template>
