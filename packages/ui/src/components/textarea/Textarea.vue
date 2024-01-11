<script lang="ts">
const textareaProps = {
  ...useCommon.props(),
  ...useInteractive.props(),
  ...useInputtable.props(),
  helper: String,
  label: String,
  dir: {
    type: String,
    default: 'ltr',
  },
  rows: [Number, String],
  max: [Number, String],
  maxlength: [Number, String],
  min: [Number, String],
  minlength: [Number, String],
  placeholder: String,
  adjustToText: {
    type: Boolean,
    default: true,
  },
  preventEnter: Boolean,
  block: Boolean,
}

export type TextareaProps = ExtractPublicPropTypes<typeof textareaProps>

type InternalClasses = 'wrapper' | 'label' | 'input'
type InternalExtraData = { errorInternal: Ref<boolean>; }

export interface TextareaTheme extends ThemeComponent<TextareaProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XTextarea',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import { ref, watch, type ExtractPublicPropTypes, type Ref } from 'vue'
import { useResizeObserver, useEventListener } from '@vueuse/core'
import { useCSS } from '../../composables/useCSS'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useCommon } from '../../composables/useCommon'
import { useColors } from '../../composables/useColors'
import { useInputtable } from '../../composables/useInputtable'
import { useInteractive } from '../../composables/useInteractive'

import XInputFooter from '../inputFooter/InputFooter.vue'

const props = defineProps(textareaProps)

const emit = defineEmits(useInputtable.emits())

const elRef = ref<HTMLTextAreaElement | null>(null)

useResizeObserver(elRef, resize)
if (typeof window !== 'undefined') useEventListener(window, 'resize', resize)

watch([() => props.modelValue, () => props.size], () => {
  setTimeout(resize)
})

const css = useCSS('textarea')
const colors = useColors()
const color = colors.getPalette('primary')
const style = css.get('border', color[400])

function onInput() {
  resize()
}

function onEnter(e: KeyboardEvent) {
  if (props.preventEnter) e.preventDefault()
  e.stopPropagation()

  return
}

function resize() {
  if (props.adjustToText && elRef.value) {
    elRef.value.style.height = '1px'
    elRef.value.style.height = (2 + elRef.value.scrollHeight) + 'px'
  }
}

const { focus, blur } = useInteractive(elRef)

const {
  errorInternal,
  isInsideForm,
  inputListeners,
  reset,
  validate,
  setError,
} = useInputtable(props, { focus, emit })

const { styles, classes, className } = useTheme('Textarea', {}, props, { errorInternal })

defineExpose({ focus, blur, reset, validate, setError })
</script>

<template>
  <label
    :style="styles"
    class="relative"
    :class="[
      className,
      classes.wrapper,
      { 'mb-3': isInsideForm, 'w-full': block }
    ]"
  >
    <p
      v-if="label"
      :class="classes.label"
      v-text="label"
    ></p>

    <textarea
      ref="elRef"
      class=""
      :style="style"
      :class="[
        classes.input,
        errorInternal
          ? 'border-red-500 dark:border-red-400 focus:outline-red-500'
          : 'focus:outline-[color:var(--x-textarea-border)]',
      ]"
      :disabled="disabled"
      :max="max"
      :maxlength="maxlength"
      :min="min"
      :dir="dir"
      :rows="rows"
      :minlength="minlength"
      :name="name"
      :placeholder="placeholder"
      :readonly="readonly"
      :value="modelValue ? String(modelValue) : ''"
      v-on="inputListeners"
      @keydown.enter="onEnter"
      @input="onInput"
    ></textarea>

    <x-input-footer :error="errorInternal" :helper="helper"/>
  </label>
</template>
