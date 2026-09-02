<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const inputProps = {
  ...useCommon.props(),
  ...useColors.props('primary'),
  ...useInteractive.props(),
  ...useInputtable.props(),
  showPasswordToggle: {
    type: Boolean,
    default: true,
    description: 'Shows a visibility toggle when `type` is `password`.',
  },
  dir: {
    type: String as PropType<'ltr' | 'rtl'>,
    default: 'ltr',
    description: 'Text direction for the native input (`ltr` or `rtl`).',
  },
  icon: {
    type: String,
    description: 'Shortcut for `iconLeft`.',
  },
  iconLeft: {
    type: String,
    description: 'Icon name shown before the input value.',
  },
  iconRight: {
    type: String,
    description: 'Icon name shown after the input value.',
  },
  max: {
    type: [Number, String],
    description: 'Native `max` attribute (typically for number inputs).',
  },
  maxlength: {
    type: [Number, String],
    description: 'Maximum character length for the input value.',
  },
  min: {
    type: [Number, String],
    description: 'Native `min` attribute (typically for number inputs).',
  },
  minlength: {
    type: [Number, String],
    description: 'Minimum character length for the input value.',
  },
  placeholder: {
    type: String,
    description: 'Placeholder text shown when the value is empty.',
  },
  type: {
    type: String,
    default: 'text',
    description: 'Native input type (text, password, email, number, etc.).',
  },
  inputmode: {
    type: String as PropType<'none' | 'text' | 'decimal' | 'numeric' | 'tel' | 'search' | 'email' | 'url'>,
    description: 'Native `inputmode` hint for virtual keyboards.',
  },
  enterkeyhint: {
    type: String as PropType<'enter' | 'done' | 'go' | 'next' | 'previous' | 'search' | 'send'>,
    description: 'Native `enterkeyhint` for the virtual keyboard action key.',
  },
  step: {
    type: [Number, String],
    description: 'Native `step` attribute for numeric inputs.',
  },
  block: optionalBooleanProp('Stretches to the full width of the parent.'),
  showCounter: optionalBooleanProp('Shows a character counter in the footer.'),
  clearable: optionalBooleanProp('Shows a clear button when the value is not empty.'),
}

export type InputProps = ExtractPublicPropTypes<typeof inputProps>

type InternalClasses = 'wrapper' | 'input' | 'icon' | 'adornment' | 'adornmentStart' | 'adornmentEnd' | 'adornmentIcon' | 'adornmentSlot'
type InternalExtraData = { errorInternal: any; isInsideInputGroup: boolean; inputGroupPosition: import('../../common/inputGroupRadius').InputGroupPosition | undefined; }
export interface InputTheme extends ThemeComponent<InputProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XInput',
  validators: {
    ...useCommon.validators(),
  },
  docs: {
    slots: {
      prefix: 'Content before the input (left adornment).',
      suffix: 'Content after the input (right adornment).',
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
import { ref, inject, computed, type PropType, type ExtractPublicPropTypes, watch, useAttrs, useSlots } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useResolvedComponentProps } from '../../composables/resolveComponentDefaults'
import { useColors } from '../../composables/useColors'
import { useCommon } from '../../composables/useCommon'
import { useInputtable } from '../../composables/useInputtable'
import { useInteractive } from '../../composables/useInteractive'
import type { Size } from '../../composables/useCommon'
import { injectInputGroupKey } from '../../composables/keys'
import { closeIcon, eyeIcon, eyeVisibleIcon } from '../../common/icons'

import XLabel from '../label/Label.vue'
import XIcon from '../icon/Icon.vue'
import XInputFooter from '../inputFooter/InputFooter.vue'

const props = defineProps(inputProps)
const resolvedProps = useResolvedComponentProps('Input', props)

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

const elRef = ref<HTMLInputElement | null>(null)
const currentType = ref(props.type)

watch(() => props.type, (newValue) => { currentType.value = newValue })

function onChange(e: Event) {
  if (!e.target) return

  const target = (e.target as HTMLInputElement)

  if (props.type === 'number') {
    const value = Number(target.value)

    if (typeof props.min !== 'undefined') {
      if (value < Number(props.min)) target.value = props.min.toString()
    }

    if (typeof props.max !== 'undefined') {
      if (value > Number(props.max)) target.value = props.max.toString()
    }
  }
}

function togglePasswordVisibility() {
  currentType.value = currentType.value === 'password' ? 'text' : 'password'
}

const showClearIcon = computed(() => resolvedProps.value.clearable && props.modelValue !== '')

const slots = useSlots()
const hasPrefixSlot = computed(() => !!slots.prefix)
const hasSuffixSlot = computed(() => !!slots.suffix)
const hasLeftIcon = computed(() => !!(props.iconLeft || props.icon))
const showPasswordToggleIcon = computed(
  () => props.type === 'password' && resolvedProps.value.showPasswordToggle && !props.iconRight,
)
const rightIconCount = computed(() => {
  let count = 0

  if (showClearIcon.value) count++
  if (props.iconRight) count++
  else if (showPasswordToggleIcon.value) count++

  return count
})
const hasLeftAdornment = computed(() => hasLeftIcon.value || hasPrefixSlot.value)
const hasRightAdornment = computed(() => hasSuffixSlot.value || rightIconCount.value > 0)

const leftPaddingClass = computed(() => {
  const units = (hasLeftIcon.value ? 1 : 0) + (hasPrefixSlot.value ? 1 : 0)

  if (units >= 2) return '!pl-16'
  if (units === 1) return '!pl-10'

  return ''
})

const rightPaddingClass = computed(() => {
  const units = rightIconCount.value + (hasSuffixSlot.value ? 1 : 0)

  if (units >= 3) return '!pr-24'
  if (units === 2) return '!pr-16'
  if (units === 1) return '!pr-10'

  return ''
})

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

const computedSize = computed((): Size => inputGroup.groupProps?.size ?? resolvedProps.value.size)
const isDisabled = computed(() => props.disabled || !!inputGroup.groupProps?.disabled)
const computedLabel = computed(() => (hideLabelInternal.value ? undefined : props.label))

const themeProps = computed(() => ({
  ...resolvedProps.value,
  size: computedSize.value,
  disabled: isDisabled.value,
}))

const currentLength = computed(() => {
  const value = props.modelValue

  return value ? String(value).length : 0
})

const { styles, classes, className } = useTheme('Input', {}, themeProps, {
  errorInternal,
  isInsideInputGroup,
  inputGroupPosition,
})

defineExpose({ focus, blur, reset, validate, setError })
</script>

<template>
  <x-label
    :style="styles"
    :block="resolvedProps.block"
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
        v-if="hasLeftAdornment"
        :class="[classes.adornment, classes.adornmentStart]"
      >
        <x-icon
          v-if="hasLeftIcon"
          :size="computedSize"
          :icon="iconLeft || icon"
          :class="classes.adornmentIcon"
        />
        <div v-if="hasPrefixSlot" :class="classes.adornmentSlot">
          <slot name="prefix" ></slot>
        </div>
      </div>

      <input
        :id="id"
        ref="elRef"
        :class="[
          classes.input,
          // error
          errorInternal
            ? 'border-error-500 dark:border-error-400 focus:outline-error-500'
            : 'focus:outline-[color:var(--x-input-border)]',
          leftPaddingClass,
          rightPaddingClass,
        ]"
        :disabled="isDisabled"
        :min="min"
        :max="max"
        :minlength="minlength"
        :maxlength="maxlength"
        :step="step"
        :dir="dir"
        :name="name"
        :placeholder="placeholder"
        :readonly="readonly"
        :type="currentType"
        :inputmode="inputmode"
        :enterkeyhint="enterkeyhint"
        :value="typeof modelValue !== 'undefined' ? modelValue : ''"
        v-bind="dataAttrs"
        v-on="inputListeners"
        @change="onChange"
      />

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
        <x-icon
          v-if="iconRight"
          :size="computedSize"
          :icon="iconRight"
          :class="classes.adornmentIcon"
        />
        <x-icon
          v-else-if="showPasswordToggleIcon"
          :size="computedSize"
          :icon="currentType === 'password' ? eyeIcon : eyeVisibleIcon"
          :class="[classes.adornmentIcon, 'cursor-pointer']"
          @click="togglePasswordVisibility()"
        />
      </div>
    </div>

    <x-input-footer
      v-if="!hideFooterInternal"
      :error="errorInternal"
      :helper="helper"
      :character-count="currentLength"
      :max-characters="maxlength"
      :show-counter="resolvedProps.showCounter"
    />
  </x-label>
</template>
