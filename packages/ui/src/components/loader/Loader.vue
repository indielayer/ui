<script lang="ts">
const loaderProps = {
  ...useCommon.props(),
  status: {
    type: String as PropType<LoaderStatus>,
    default: 'active',
  },
  icon: String,
  label: String,
}

export type LoaderStatus = 'active' | 'success' | 'error'
export type LoaderProps = ExtractPublicPropTypes<typeof loaderProps>

type InternalClasses = 'wrapper' | 'iconSuccess' | 'iconError' | 'label'
export interface LoaderTheme extends ThemeComponent<LoaderProps, InternalClasses> {}

export default {
  name: 'XLoader',
  validators: {
    ...useCommon.validators(),
    status: ['active', 'success', 'error'],
  },
}
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes, PropType } from 'vue'
import { useCommon } from '../../composables/useCommon'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

import XIcon from '../../components/icon/Icon.vue'
import XSpinner from '../../components/spinner/Spinner.vue'

import { successIcon, errorIcon } from '../../common/icons'

const props = defineProps(loaderProps)

const { styles, classes, className } = useTheme('Loader', {}, props)
</script>

<template>
  <div :class="[className, classes.wrapper]" :style="styles">
    <x-spinner v-if="status === 'active'" :size="size" :icon="icon"/>
    <x-icon
      v-else-if="status === 'success'"
      :class="classes.iconSuccess"
      :size="size"
      :icon="successIcon"
    />
    <x-icon
      v-else-if="status === 'error'"
      :class="classes.iconError"
      :size="size"
      :icon="errorIcon"
    />
    <span v-if="label" :class="classes.label">{{ label }}</span>
  </div>
</template>
