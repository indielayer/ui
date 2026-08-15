<script lang="ts">
import { optionalBooleanProp } from '../../common/props'
import { useCommon, type Size } from '../../composables/useCommon'
import { useInteractive } from '../../composables/useInteractive'
import { useInputtable } from '../../composables/useInputtable'
import type { XFormInputMethods } from '../../composables/useInputtable'

const inputGroupProps = {
  ...useCommon.props(),
  ...useInteractive.props(),
  ...useInputtable.props(),
  block: optionalBooleanProp('Stretches the group to the full width of the parent.'),
}

export type InputGroupProps = ExtractPublicPropTypes<typeof inputGroupProps>

export type InputGroupPosition = 'only' | 'first' | 'middle' | 'last'

export type InputGroupInjection = {
  registerChild: (id: string) => void;
  unregisterChild: (id: string) => void;
  registerInput: (name: string, methods: XFormInputMethods) => void;
  unregisterInput: (name: string) => void;
  getPosition: (id: string) => InputGroupPosition;
  childOrder: ComputedRef<string[]>;
  isInsideInputGroup: boolean;
  groupProps: {
    size?: Size;
    disabled?: boolean;
  };
}

export type InputGroupInput = {
  name: string;
  methods: XFormInputMethods;
}

type InternalClasses = 'wrapper'
export interface InputGroupTheme extends ThemeComponent<InputGroupProps, InternalClasses> {}

export default {
  name: 'XInputGroup',
  validators: {
    ...useCommon.validators(),
  },
  docs: {
    slots: {
      default: 'Grouped controls (inputs, buttons, or other adornments).',
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
import { provide, ref, computed, type ExtractPublicPropTypes, type ComputedRef } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { injectInputGroupKey } from '../../composables/keys'

import XLabel from '../label/Label.vue'
import XInputFooter from '../inputFooter/InputFooter.vue'

const props = defineProps(inputGroupProps)

const inputs: InputGroupInput[] = []
const childOrder = ref<string[]>([])
const childOrderReadonly = computed(() => childOrder.value)

function getPosition(name: string): InputGroupPosition {
  const order = childOrderReadonly.value
  const index = order.indexOf(name)

  if (index === -1 || order.length === 0) return 'only'
  if (order.length === 1) return 'only'
  if (index === 0) return 'first'
  if (index === order.length - 1) return 'last'

  return 'middle'
}

function registerChild(id: string) {
  if (!childOrder.value.includes(id)) {
    childOrder.value = [...childOrder.value, id]
  }
}

function unregisterChild(id: string) {
  childOrder.value = childOrder.value.filter((n) => n !== id)
}

provide(injectInputGroupKey, {
  registerChild,
  unregisterChild,
  registerInput: (name: string, methods: XFormInputMethods) => {
    inputs.push({ name, methods })
    registerChild(name)
  },
  unregisterInput: (name: string) => {
    const index = inputs.findIndex((i) => i.name === name)

    inputs.splice(index, 1)
    unregisterChild(name)
  },
  getPosition,
  childOrder: childOrderReadonly,
  isInsideInputGroup: true,
  groupProps: {
    get size() { return props.size },
    get disabled() { return props.disabled },
  },
})

function focus() {
  inputs[0]?.methods.focus()
}

function blur() {}

function getGroupValue(): unknown {
  if (props.modelValue !== undefined) return props.modelValue

  return inputs.map((input) => input.methods.getValue())
}

function validateInputGroup(): boolean {
  for (const input of inputs) {
    if (!input.methods.validate()) {
      const message = input.methods.getError()

      if (message) setError(message)

      return false
    }
  }

  if (props.rules.length) return validateRules(getGroupValue())

  errorInternal.value = ''

  return true
}

const emit = defineEmits(useInputtable.emits())

const {
  errorInternal,
  isInsideForm,
  isFirstValidation,
  reset,
  validate: validateRules,
  setError,
} = useInputtable(props, { focus, emit, formValidate: validateInputGroup })

const validate = validateInputGroup

const listeners = {
  change: () => {
    if (props.validateOnInput && !isFirstValidation.value) validate()
  },
}

function manualValidate() {
  if (props.validateOnInput && !isFirstValidation.value) validate()
}

const { styles, classes, className } = useTheme('InputGroup', {}, props, { errorInternal })

defineExpose({ focus, blur, reset, validate, setError })
</script>

<template>
  <x-label
    tag="fieldset"
    :style="styles"
    :block="block"
    :disabled="disabled"
    :required="required"
    :is-inside-form="isInsideForm"
    :is-inside-input-group="false"
    :label="label"
    :class="[className]"
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
