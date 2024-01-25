<script lang="ts">
const textareaProps = {
  ...useCommon.props(),
  ...useInteractive.props(),
  ...useInputtable.props(),
  dir: {
    type: String,
    default: 'ltr',
  },
  rows: {
    type: [Number, String],
    default: 2,
  },
  max: [Number, String],
  maxlength: [Number, String],
  min: [Number, String],
  minlength: [Number, String],
  placeholder: String,
  adjustToText: Boolean,
  preventEnter: Boolean,
  block: Boolean,
}

export type TextareaProps = ExtractPublicPropTypes<typeof textareaProps>

type InternalClasses = 'wrapper' | 'input'
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

import XLabel from '../label/Label.vue'
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
  hideFooterInternal,
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
  <x-label
    :style="styles"
    :block="block"
    :disabled="disabled"
    :required="required"
    :is-inside-form="isInsideForm"
    :label="label"
    :class="[
      className,
      classes.wrapper,
    ]"
  >
    <textarea
      :id="id"
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

    <x-input-footer v-if="!hideFooterInternal" :error="errorInternal" :helper="helper"/>
  </x-label>
</template>
