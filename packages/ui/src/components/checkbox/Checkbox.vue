<script lang="ts">
const checkboxProps = {
  ...useCommon.props(),
  ...useColors.props('primary'),
  ...useInteractive.props(),
  ...useInputtable.props(),
  value: [String, Number],
  indeterminate: Boolean,
  glow: Boolean,
}

export type CheckboxProps = ExtractPublicPropTypes<typeof checkboxProps>

type InternalClasses = 'wrapper' | 'content' | 'box' | 'icon' | 'label'
type InternalExtraData = { checked: Ref<boolean>; isInsideForm: boolean; isInsideFormGroup: boolean;}
export interface CheckboxTheme extends ThemeComponent<CheckboxProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XCheckbox',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import { ref, unref, watch, type ExtractPublicPropTypes, type Ref } from 'vue'
import { useColors } from '../../composables/useColors'
import { useCommon } from '../../composables/useCommon'
import { useInputtable } from '../../composables/useInputtable'
import { useInteractive } from '../../composables/useInteractive'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

import XInputFooter from '../inputFooter/InputFooter.vue'
import XSpinner from '../spinner/Spinner.vue'

const props = defineProps(checkboxProps)

const emit = defineEmits(useInputtable.emits(false))

const elRef = ref<HTMLElement | null>(null)
const checked = ref(false)

function toggle() {
  checked.value = !checked.value
}

const { focus, blur } = useInteractive(elRef)

const {
  errorInternal,
  hideFooterInternal,
  isInsideForm,
  isInsideFormGroup,
  isFirstValidation,
  formGroup,
  reset,
  validate,
  setError,
} = useInputtable(props, { focus, emit, withListeners: false })

if (isInsideFormGroup) {
  watch(() => formGroup.value, () => {
    const formGroupValue = unref(formGroup.value)

    if (formGroupValue && Array.isArray(formGroupValue) && formGroupValue.includes(props.value as never)) checked.value = true
    else checked.value = false
  }, { immediate: true, deep: true })

  watch(() => checked.value, (value) => {
    if (!props.value) return

    const formGroupValue = unref(formGroup.value)

    if (value) {
      if (formGroupValue && Array.isArray(formGroupValue)) {
        if (!formGroupValue.includes(props.value as never)) {
          const newValue = [...formGroupValue, props.value]

          formGroup.setValue(newValue as any)
        }
      } else {
        formGroup.setValue([props.value as any])
      }
    } else {
      if (formGroupValue && Array.isArray(formGroupValue) && formGroupValue.includes(props.value as never)) {
        const index = formGroupValue.findIndex((v) => v === props.value)
        const newValue = [...formGroupValue]

        newValue.splice(index, 1)
        formGroup.setValue(newValue as any)
      }
    }
  })
} else {
  watch(() => props.modelValue, (value) => {
    checked.value = !!value
  }, { immediate: true })

  watch(() => checked.value, (value) => {
    emit('update:modelValue', value)
  })
}

const listeners = {
  input: () => {
    if (isInsideFormGroup) return
    setTimeout(() => {
      if (props.validateOnInput && !isFirstValidation.value) validate(props.modelValue)
    }, 0)
  },
}

const { styles, classes, className } = useTheme('Checkbox', {}, props, { checked, isInsideForm, isInsideFormGroup })

defineExpose({ focus, blur, toggle, reset, validate, setError })
</script>

<template>
  <label
    :style="styles"
    :class="[
      className,
      classes.wrapper,
    ]"
  >
    <div
      ref="elRef"
      :class="classes.content"
      tabindex="0"
      @keypress.prevent.stop.space="toggle"
    >
      <input
        :id="id"
        v-model="checked"
        :name="name"
        :aria-checked="indeterminate ? 'mixed' : (checked ? 'true' : 'false')"
        :aria-disabled="disabled ? 'true' : undefined"
        type="checkbox"
        class="invisible absolute"
        :disabled="disabled || loading"
        :required="required"
        v-on="listeners"
      />
      <div
        :class="[
          classes.box,
          [(glow && !disabled && !loading) ? $style['checkbox--glow'] : ''],
        ]"
      >
        <x-spinner v-if="loading" :size="size" class="absolute" />
        <span v-else-if="indeterminate" name="check-icon" class="w-2/3 h-[2px] bg-white dark:bg-secondary-900"></span>
        <slot v-else name="icon">
          <svg
            viewBox="0 0 20 20"
            :class="[classes.icon, { 'opacity-0': !checked }]"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        </slot>
      </div>
      <div :class="classes.label">
        <span v-if="label" v-text="label"></span>
        <slot v-else></slot>
      </div>
    </div>

    <x-input-footer v-if="!hideFooterInternal" :error="errorInternal" :helper="helper"/>
  </label>
</template>

<style lang="postcss" module>
  .checkbox {
    &--glow {
      box-shadow: 0 0 #000, 0 0 #000, 0 10px 15px -3px var(--x-checkbox-glow), 0 4px 6px -4px var(--x-checkbox-glow);
    }
  }
</style>
