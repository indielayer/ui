<script lang="ts">
const formGroupProps = {
  ...useInteractive.props(),
  ...useInputtable.props(),
  vertical: {
    type: Boolean,
    default: false,
  },
}

export type FormGroupProps = ExtractPublicPropTypes<typeof formGroupProps>

export type FormGroupInjection = {
  registerInputGroup: (name: string, focus: () => void) => void;
  unregisterInputGroup: (name: string) => void;
  setValue: (val: string | number | string[] | number[]) => void;
  value: MaybeRef<string | number | string[] | number[] | null | undefined>;
  isInsideFormGroup: boolean;
}

export type FormGroupInput = {
  name: string;
  focus: () => void;
}

type InternalClasses = 'wrapper'
export interface FormGroupTheme extends ThemeComponent<FormGroupProps, InternalClasses> {}

export default {
  name: 'XFormGroup',
}
</script>

<script setup lang="ts">
import { provide, computed, type ExtractPublicPropTypes, type MaybeRef } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useInteractive } from '../../composables/useInteractive'
import { useInputtable } from '../../composables/useInputtable'
import { injectFormGroupKey } from '../../composables/keys'

import XLabel from '../label/Label.vue'
import XInputFooter from '../inputFooter/InputFooter.vue'

const props = defineProps(formGroupProps)

const inputs: FormGroupInput[] = []

const value = computed<string | number | string[] | number[]>(() => {
  if (typeof props.modelValue === 'string') return props.modelValue
  if (typeof props.modelValue === 'number') return props.modelValue
  if (Array.isArray(props.modelValue)) return props.modelValue

  return ''
})

provide(injectFormGroupKey, {
  registerInputGroup: (name: string, focus: () => void) => {
    inputs.push({ name, focus })
  },
  unregisterInputGroup: (name: string) => {
    const index = inputs.findIndex((i) => i.name === name)

    inputs.splice(index, 1)
  },
  setValue: (val) => {
    emit('update:modelValue', val)
  },
  isInsideFormGroup: true,
  value,
})

function focus() {
  inputs[0]?.focus()
}

function blur() {}

const emit = defineEmits(useInputtable.emits())

const {
  errorInternal,
  isInsideForm,
  isFirstValidation,
  reset,
  validate,
  setError,
} = useInputtable(props, { focus, emit })

const listeners = {
  change: (event: Event) => {
    if (props.validateOnInput && !isFirstValidation.value) validate(props.modelValue)
  },
}

function manualValidate() {
  if (props.validateOnInput && !isFirstValidation.value) validate(props.modelValue)
}

const { styles, classes, className } = useTheme('FormGroup', {}, props, { errorInternal })

defineExpose({ focus, blur, reset, validate, setError })
</script>

<template>
  <x-label
    tag="fieldset"
    :style="styles"
    :disabled="disabled"
    :required="required"
    :is-inside-form="isInsideForm"
    :label="label"
    :class="[
      className,
    ]"
    :tooltip="tooltip"
    v-on="listeners"
    @keyup.space="manualValidate"
  >
    <div :class="classes.wrapper">
      <slot></slot>
    </div>
    <x-input-footer v-if="!hideFooter" :error="errorInternal" :helper="helper"/>
  </x-label>
</template>
