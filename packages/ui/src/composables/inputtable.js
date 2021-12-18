import { ref, computed, inject, watch, onMounted, onUnmounted } from 'vue'
import {
  withValidator as withInteractiveValidator,
  withProps as withInteractiveProps,
  useInteractive,
} from './interactive'

const validator = {
  ...withInteractiveValidator(),
}

export const withProps = () => ({
  ...withInteractiveProps(),
  name: {
    type: String,
    default: null,
  },
  modelValue: {
    type: [String, Number, Boolean, Function, Object, Array],
    default: null,
  },
  readonly: {
    type: Boolean,
    default: false,
  },
  required: {
    type: Boolean,
    default: false,
  },
  validateOnInput: {
    type: Boolean,
    default: true,
  },
  error: {
    type: String,
    default: '',
  },
  rules: {
    type: Array,
    default: () => [],
  },
})

export const withValidator = () => validator

export const withEmits = (useListeners = true) => {
  const emits = ['update:modelValue']

  if (!useListeners) return emits

  return emits.concat(['blur', 'focus', 'input', 'change'])
}

export const useInputtable = (props, { attrs, emit, useListeners = true } = {}) => {
  const interactive = useInteractive()

  const isFirstValidation = ref(true)
  const errorInternal = ref(props.error)

  const name = props.name ? props.name : (Math.random() + 1).toString(36).substring(7)
  const nameInternal = ref(name)

  watch(() => props.error, (val) => { errorInternal.value = val })
  watch(() => props.name, (val) => { if (val) nameInternal.value = val })

  const form = inject('form', {
    registerInput: () => {},
    unregisterInput: () => {},
  })

  const reset = () => {
    errorInternal.value = ''
    isFirstValidation.value = true
    emit('update:modelValue', '')
  }

  const setError = (val) => {
    errorInternal.value = val
  }

  const validate = (val) => {
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

  const inputListeners = useListeners ? computed(() => {
    return {
      attrs,
      blur: (event) => emit('blur', event),
      focus: (event) => emit('focus', event),
      input: (event) => {
        if (props.validateOnInput && !isFirstValidation.value) validate(event.target.value)
        emit('update:modelValue', event.target.value)
      },
      change: (event) => emit('change', event),
    }
  }) : ref({})

  onMounted(() => {
    form.registerInput(nameInternal.value, { focus: interactive.focus, validate, setError })
  })

  onUnmounted(() => {
    form.unregisterInput(nameInternal.value)
  })

  return {
    ...interactive,

    // data
    isFirstValidation,
    errorInternal,

    // computed
    inputListeners,

    // methods
    reset,
    validate,
    setError,
  }
}
