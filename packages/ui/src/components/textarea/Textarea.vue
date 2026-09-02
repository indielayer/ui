<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const textareaProps = {
  ...useCommon.props(),
  ...useInteractive.props(),
  ...useInputtable.props(),
  dir: {
    type: String,
    default: 'ltr',
    description: 'Text direction for the textarea (`ltr` or `rtl`).',
  },
  rows: {
    type: [Number, String],
    default: 2,
    description: 'Visible number of text lines.',
  },
  max: {
    type: [Number, String],
    description: 'Native `max` attribute when applicable.',
  },
  maxlength: {
    type: [Number, String],
    description: 'Maximum character length for the value.',
  },
  min: {
    type: [Number, String],
    description: 'Native `min` attribute when applicable.',
  },
  minlength: {
    type: [Number, String],
    description: 'Minimum character length for the value.',
  },
  placeholder: {
    type: String,
    description: 'Placeholder text shown when the value is empty.',
  },
  inputmode: {
    type: String as PropType<'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'>,
    description: 'Native `inputmode` hint for virtual keyboards.',
  },
  enterkeyhint: {
    type: String as PropType<'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'>,
    description: 'Native `enterkeyhint` for the virtual keyboard action key.',
  },
  adjustToText: optionalBooleanProp('Auto-grows the height to fit the content.'),
  preventEnter: optionalBooleanProp('Prevents the Enter key from inserting a newline.'),
  block: optionalBooleanProp('Stretches to the full width of the parent.'),
  resizable: optionalBooleanProp('Allows the user to resize the textarea.'),
  showCounter: optionalBooleanProp('Shows a character counter in the footer.'),
  clearable: optionalBooleanProp('Shows a clear button when the value is not empty.'),
}

export type TextareaProps = ExtractPublicPropTypes<typeof textareaProps>

type InternalClasses = 'wrapper' | 'input' | 'icon' | 'adornment' | 'adornmentStart' | 'adornmentEnd' | 'adornmentIcon' | 'adornmentSlot'
type InternalExtraData = { errorInternal: Ref<boolean>; isInsideInputGroup: boolean; inputGroupPosition: import('../../common/inputGroupRadius').InputGroupPosition | undefined; }

export interface TextareaTheme extends ThemeComponent<TextareaProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XTextarea',
  validators: {
    ...useCommon.validators(),
  },
  docs: {
    slots: {
      prefix: 'Content before the textarea (left adornment).',
      suffix: 'Content after the textarea (right adornment).',
    },
    emits: {
      ...useInputtable.emitDocs(),
    },
    methods: {
      ...useInputtable.methodDocs(),
    },
  },
}
</script>

<script setup lang="ts">
import { ref, inject, watch, type ExtractPublicPropTypes, type PropType, type Ref, useAttrs, computed, useSlots } from 'vue'
import { useResizeObserver, useEventListener } from '@vueuse/core'
import { useCSS } from '../../composables/useCSS'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useCommon } from '../../composables/useCommon'
import { useColors } from '../../composables/useColors'
import { useInputtable } from '../../composables/useInputtable'
import { useInteractive } from '../../composables/useInteractive'
import type { Size } from '../../composables/useCommon'
import { injectInputGroupKey } from '../../composables/keys'

import XLabel from '../label/Label.vue'
import XInputFooter from '../inputFooter/InputFooter.vue'
import XIcon from '../icon/Icon.vue'
import { closeIcon } from '../../common/icons'

const props = defineProps(textareaProps)

const inputGroup = inject(injectInputGroupKey, {
  registerChild: () => {},
  unregisterChild: () => {},
  registerInput: () => {},
  unregisterInput: () => {},
  getPosition: () => 'only',
  childOrder: computed(() => []),
  isInsideInputGroup: false,
  groupProps: {},
})

const emit = defineEmits(useInputtable.emits())

const attrs = useAttrs()
const dataAttrs = computed(() => {
  return Object.keys(attrs).reduce((acc, key) => {
    if (key.startsWith('data-')) acc[key] = attrs[key]

    return acc
  }, {} as Record<string, any>)
})

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
  hideLabelInternal,
  isInsideForm,
  isInsideInputGroup,
  inputGroupPosition,
  inputListeners,
  reset,
  validate,
  setError,
} = useInputtable(props, { focus, emit })

const computedSize = computed((): Size => inputGroup.groupProps?.size ?? props.size)
const isDisabled = computed(() => props.disabled || !!inputGroup.groupProps?.disabled)
const computedLabel = computed(() => (hideLabelInternal.value ? undefined : props.label))

const themeProps = computed(() => ({
  ...props,
  size: computedSize.value,
  disabled: isDisabled.value,
}))

const currentLength = computed(() => {
  const value = props.modelValue

  return value ? String(value).length : 0
})

const showClearIcon = computed(() => props.clearable && props.modelValue !== '')

const slots = useSlots()
const hasPrefixSlot = computed(() => !!slots.prefix)
const hasSuffixSlot = computed(() => !!slots.suffix)
const hasRightAdornment = computed(() => hasSuffixSlot.value || showClearIcon.value)

const leftPaddingClass = computed(() => (hasPrefixSlot.value ? '!pl-10' : ''))

const rightPaddingClass = computed(() => {
  const units = (showClearIcon.value ? 1 : 0) + (hasSuffixSlot.value ? 1 : 0)

  if (units >= 2) return '!pr-16'
  if (units === 1) return '!pr-10'

  return ''
})

function isEmpty(value: typeof props.modelValue) {
  if (typeof value === 'undefined' || value === null) return true

  return false
}

const { styles, classes, className } = useTheme('Textarea', {}, themeProps, {
  errorInternal,
  isInsideInputGroup,
  inputGroupPosition,
})

defineExpose({ focus, blur, reset, validate, setError })
</script>

<template>
  <x-label
    :style="styles"
    :block="block"
    :disabled="isDisabled"
    :required="required"
    :is-inside-form="isInsideForm"
    :is-inside-input-group="isInsideInputGroup"
    :label="computedLabel"
    :class="[
      className,
      classes.wrapper,
    ]"
    :tooltip="tooltip"
  >
    <div class="relative">
      <div
        v-if="hasPrefixSlot"
        :class="[classes.adornment, classes.adornmentStart]"
      >
        <div :class="classes.adornmentSlot">
          <slot name="prefix" ></slot>
        </div>
      </div>

      <textarea
        :id="id"
        ref="elRef"
        class=""
        :style="style"
        :class="[
          classes.input,
          errorInternal
            ? 'border-error-500 dark:border-error-400 focus:outline-error-500'
            : 'focus:outline-[color:var(--x-textarea-border)]',
          leftPaddingClass,
          rightPaddingClass,
        ]"
        :disabled="isDisabled"
        :max="max"
        :maxlength="maxlength"
        :min="min"
        :dir="dir"
        :rows="rows"
        :minlength="minlength"
        :name="name"
        :placeholder="placeholder"
        :readonly="readonly"
        :inputmode="inputmode"
        :enterkeyhint="enterkeyhint"
        :value="isEmpty(modelValue) ? '' : String(modelValue)"
        v-bind="dataAttrs"
        v-on="inputListeners"
        @keydown.enter="onEnter"
        @input="onInput"
      ></textarea>

      <div
        v-if="hasRightAdornment"
        :class="[classes.adornment, classes.adornmentEnd]"
      >
        <div v-if="hasSuffixSlot" :class="classes.adornmentSlot">
          <slot name="suffix" ></slot>
        </div>
        <x-icon
          v-if="showClearIcon"
          :size="computedSize"
          :icon="closeIcon"
          :class="[classes.adornmentIcon, 'cursor-pointer']"
          @click="reset()"
        />
      </div>
    </div>

    <x-input-footer
      v-if="!hideFooterInternal"
      :error="errorInternal"
      :helper="helper"
      :character-count="currentLength"
      :max-characters="maxlength"
      :show-counter="showCounter"
    />
  </x-label>
</template>
