import type { MaybeRef, PropType } from 'vue'
import { ref, computed, inject, watch, onMounted, onUnmounted } from 'vue'
import { injectFormGroupKey, injectFormKey } from './keys'

export interface XFormInputMethods {
  focus: () => void;
  validate: (val: any) => boolean;
  setError: (val: string) => void;
}

export const useInputtable = (props: any, { focus, emit, withListeners = true }: { focus: () => void; emit: any; withListeners?: boolean; }) => {
  const isFirstValidation = ref(true)
  const errorInternal = ref(props.error)
  const hideFooterInternal = ref(props.hideFooter)

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

  if (formGroup.isInsideFormGroup) {
    hideFooterInternal.value = true
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
    val = val || props.modelValue

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
      formGroup.registerInputGroup(nameInternal.value, focus)
    } else {
      form.registerInput(nameInternal.value, focus, validate, setError)
    }
  })

  onUnmounted(() => {
    if (formGroup.isInsideFormGroup) {
      formGroup.unregisterInputGroup(nameInternal.value)
    } else {
      form.unregisterInput(nameInternal.value)
    }

  })

  return {
    isFirstValidation,
    errorInternal,
    hideFooterInternal,
    isFocused,
    isInsideForm: form.isInsideForm,
    isInsideFormGroup: formGroup.isInsideFormGroup,
    inputListeners,
    formGroup,
    reset,
    validate,
    setError,
  }
}

useInputtable.emits = (withListeners = true): string[] => {
  return withListeners ?
    ['update:modelValue', 'blur', 'focus', 'input', 'change'] :
    ['update:modelValue']
}

useInputtable.props = () => ({
  modelValue: {
    type: [String, Number, Boolean, Object, Array] as PropType<string | number | boolean | object | any[] | undefined>,
    default: undefined,
  },
  id: String,
  name: String,
  readonly: Boolean,
  required: Boolean,
  validateOnInput: {
    type: Boolean,
    default: true,
  },
  label: String,
  helper: String,
  error: String,
  hideFooter: Boolean,
  rules: {
    type: Array,
    default: () => [],
  },
  tooltip: String,
} as const)
