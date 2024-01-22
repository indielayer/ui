<script lang="ts">
const inputFooterProps = {
  helper: String,
  error: String,
}

export type InputFooterProps = ExtractPublicPropTypes<typeof inputFooterProps>

type InternalClasses = 'wrapper' | 'helperText' | 'errorText'
export interface InputFooterTheme extends ThemeComponent<InputFooterProps, InternalClasses> {}

export default { name: 'XInputFooter' }
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(inputFooterProps)

const { styles, classes, className } = useTheme('InputFooter', {}, props)
</script>

<template>
  <div :class="[className, classes.wrapper]" :style="styles">
    <p v-if="error" :class="classes.errorText">{{ error }}</p>
    <p v-else-if="helper" :class="classes.helperText">{{ helper }}</p>
  </div>
</template>
