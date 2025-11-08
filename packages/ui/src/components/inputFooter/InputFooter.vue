<script lang="ts">
const inputFooterProps = {
  helper: String,
  error: String,
  characterCount: Number,
  maxCharacters: [Number, String],
  showCounter: Boolean,
}

export type InputFooterProps = ExtractPublicPropTypes<typeof inputFooterProps>

type InternalClasses = 'wrapper' | 'helperText' | 'errorText' | 'container' | 'counter'
export interface InputFooterTheme extends ThemeComponent<InputFooterProps, InternalClasses> {}

export default { name: 'XInputFooter' }
</script>

<script setup lang="ts">
import { computed } from 'vue'
import type { ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(inputFooterProps)

const { styles, classes, className } = useTheme('InputFooter', {}, props)

const maxChars = computed(() => {
  return props.maxCharacters ? Number(props.maxCharacters) : undefined
})

const counterText = computed(() => {
  if (props.characterCount === undefined) return ''

  if (maxChars.value) {
    return `${props.characterCount}/${maxChars.value}`
  }

  return `${props.characterCount}`
})

const hasMessage = computed(() => props.error || props.helper)
</script>

<template>
  <div :class="[className, classes.wrapper]" :style="styles">
    <div v-if="hasMessage || showCounter" :class="classes.container">
      <div>
        <p v-if="error" :class="classes.errorText">{{ error }}</p>
        <p v-else-if="helper" :class="classes.helperText">{{ helper }}</p>
      </div>
      <p
        v-if="showCounter"
        :class="classes.counter"
        role="status"
        aria-live="polite"
      >
        {{ counterText }}
      </p>
    </div>
  </div>
</template>
