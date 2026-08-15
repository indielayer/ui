import type { MaybeRef, PropType } from 'vue'
import { computed, inject, onMounted, onUnmounted, ref, watch } from 'vue'
import { injectFormGroupKey, injectFormKey, injectInputGroupKey } from './keys'

export interface XFormInputMethods {
  focus: () => void;
  validate: (val?: any) => boolean;
  setError: (val: string) => void;
  getError: () => string;
  getValue: () => unknown;
}

export const useInputtable = (props: any, { focus, emit, withListeners = true, formValidate, formGroupJoined }: { focus: () => void; emit: any; withListeners?: boolean; formValidate?: () => boolean; formGroupJoined?: boolean; }) => {
  const isFirstValidation = ref(true)
  const errorInternal = ref(props.error)
  const hideFooterInternal = ref(props.hideFooter)
  const hideLabelInternal = ref(false)

  const name = props.name ? props.name : (Math.random() + 1).toString(36).substring(7)
  const nameInternal = ref(name)

  watch(() => props.error, (val) => { errorInternal.value = val })
  watch(() => props.name, (val) => { if (val) nameInternal.value = val })

  const formGroup = inject(injectFormGroupKey, {
    registerInputGroup: () => {},
    unregisterInputGroup: () => {},
    setValue: () => {},
    isInsideFormGroup: false,
    value: undefined,
  })

  const inputGroup = inject(injectInputGroupKey, {
    registerChild: () => {},
    unregisterChild: () => {},
    registerInput: () => {},
    unregisterInput: () => {},
    getPosition: () => 'only' as const,
    childOrder: computed(() => []),
    isInsideInputGroup: false,
    groupProps: {},
  })

  const inputGroupPosition = computed(() => {
    if (!inputGroup.isInsideInputGroup) return undefined

    // Subscribe to sibling mount order so radius classes update after each child registers
    void inputGroup.childOrder.value

    return inputGroup.getPosition(nameInternal.value)
  })

  if (formGroup.isInsideFormGroup || inputGroup.isInsideInputGroup) {
    hideFooterInternal.value = true
  }

  if (inputGroup.isInsideInputGroup) {
    hideLabelInternal.value = true
  }

  const form = inject(injectFormKey, {
    registerInput: () => {},
    unregisterInput: () => {},
    isInsideForm: false,
  })

  const reset = () => {
    errorInternal.value = ''
    isFirstValidation.value = true
    emit('update:modelValue', '')
  }

  const setError = (val: string) => {
    errorInternal.value = val
  }

  const validate = (val?: any): boolean => {
    val = val === undefined ? props.modelValue : val

    isFirstValidation.value = false

    for (let i = 0; i < props.rules.length; i++) {
      const item = props.rules[i]

      let isValid = true

      // Direct Function
      if (typeof item === 'function') {
        const rule = item

        isValid = rule(val)
      } else if (Array.isArray(item) && item.length === 2) {
        // Rule array [function, options]
        const { 0: rule, 1: options } = item

        isValid = rule(val, options)
      } else {
        // Rule object { fn, options }
        const rule = item.fn
        const { options } = item

        isValid = rule(val, options)
      }

      if (isValid !== true) {
        errorInternal.value = isValid

        return false
      }
    }

    errorInternal.value = ''

    return true
  }

  const isFocused = ref(false)

  type InputListeners = {
    focus: (event: Event) => void;
    blur: (event: Event) => void;
    input: (event: Event) => void;
    change: (event: Event) => void;
  }

  const inputListeners: MaybeRef<InputListeners> = withListeners ? computed<InputListeners>(() => {
    return {
      focus: (event: Event) => { isFocused.value = true; emit('focus', event) },
      blur: (event: Event) => { isFocused.value = false; emit('blur', event) },
      input: (event: Event) => {
        if (props.validateOnInput && !isFirstValidation.value) validate((event.target as HTMLInputElement).value)
        emit('update:modelValue', (event.target as HTMLInputElement).value)
        emit('input', event)
      },
      change: (event: Event) => emit('change', event),
    }
  }) : {
    focus: () => {},
    blur: () => {},
    input: () => {},
    change: () => {},
  }

  onMounted(() => {
    if (formGroup.isInsideFormGroup) {
      formGroup.registerInputGroup(nameInternal.value, focus, formGroupJoined ? { joined: true } : undefined)
    } else {
      if (inputGroup.isInsideInputGroup) {
        inputGroup.registerInput(nameInternal.value, {
          focus,
          validate,
          setError,
          getError: () => errorInternal.value,
          getValue: () => props.modelValue,
        })
      }

      if (!props.skipFormRegistry && !inputGroup.isInsideInputGroup)
        form.registerInput(nameInternal.value, focus, formValidate ?? validate, setError)
    }
  })

  onUnmounted(() => {
    if (formGroup.isInsideFormGroup) {
      formGroup.unregisterInputGroup(nameInternal.value)
    } else {
      if (inputGroup.isInsideInputGroup) {
        inputGroup.unregisterInput(nameInternal.value)
      }

      if (!props.skipFormRegistry && !inputGroup.isInsideInputGroup)
        form.unregisterInput(nameInternal.value)
    }

  })

  return {
    isFirstValidation,
    errorInternal,
    hideFooterInternal,
    hideLabelInternal,
    isFocused,
    isInsideForm: props.skipFormRegistry ? false : form.isInsideForm,
    isInsideFormGroup: formGroup.isInsideFormGroup,
    isInsideInputGroup: inputGroup.isInsideInputGroup,
    inputGroupPosition,
    nameInternal,
    inputListeners,
    formGroup,
    inputGroup,
    reset,
    validate,
    setError,
    getError: () => errorInternal.value,
  }
}

useInputtable.emits = (withListeners = true): string[] => {
  return withListeners ?
    ['update:modelValue', 'blur', 'focus', 'input', 'change'] :
    ['update:modelValue']
}

useInputtable.emitDocs = (withListeners = true): Record<string, string> => {
  const docs: Record<string, string> = {
    'update:modelValue': 'Emitted when the bound value changes (v-model).',
  }

  if (withListeners) {
    docs.blur = 'Emitted when the field loses focus.'
    docs.focus = 'Emitted when the field receives focus.'
    docs.input = 'Emitted on native input events.'
    docs.change = 'Emitted when the value is committed (change).'
  }

  return docs
}

useInputtable.methodDocs = (): Record<string, string> => ({
  focus: 'Focus the underlying control.',
  blur: 'Remove focus from the underlying control.',
  reset: 'Reset the field value and validation state.',
  validate: 'Run validation rules and return whether the field is valid.',
  setError: 'Set an external error message on the field.',
})

useInputtable.props = () => ({
  modelValue: {
    type: [String, Number, Boolean, Object, Array] as PropType<string | number | boolean | object | any[] | undefined>,
    default: undefined,
    description: 'Bound value (v-model).',
  },
  id: {
    type: String,
    description: 'Native id attribute for the input element.',
  },
  name: {
    type: String,
    description: 'Native name attribute for form submission.',
  },
  readonly: {
    type: Boolean,
    description: 'Makes the field read-only without disabling it.',
  },
  required: {
    type: Boolean,
    description: 'Marks the field as required for validation.',
  },
  validateOnInput: {
    type: Boolean,
    default: true,
    description: 'Runs validation on each input event when true.',
  },
  label: {
    type: String,
    description: 'Visible label text for the field.',
  },
  helper: {
    type: String,
    description: 'Helper text shown below the field.',
  },
  error: {
    type: String,
    description: 'External error message; overrides rule errors when set.',
  },
  hideFooter: {
    type: Boolean,
    description: 'Hides the footer area (helper / error).',
  },
  rules: {
    type: Array,
    default: () => [],
    description: 'Validation rule functions or rule descriptors.',
  },
  tooltip: {
    type: String,
    description: 'Optional tooltip text next to the label.',
  },
  skipFormRegistry: {
    type: Boolean,
    description: 'Skips registering this field with a parent x-form.',
  },
} as const)
