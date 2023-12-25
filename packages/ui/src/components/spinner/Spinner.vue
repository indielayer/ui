<script lang="ts">
const spinnerProps = {
  ...useCommon.props(),
  icon: {
    type: String,
    default: '<g fill="none" fill-rule="evenodd"><g transform="translate(1 1)" stroke-width="2"><circle stroke-opacity=".5" cx="18" cy="18" r="18"/><path d="M36 18c0-9.94-8.06-18-18-18"><animateTransform attributeName="transform" type="rotate" from="0 18 18" to="360 18 18" dur="0.5s" repeatCount="indefinite"/></path></g></g>',
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
  <x-icon :icon="icon" :size="size" view-box="0 0 38 38"/>
</template>
