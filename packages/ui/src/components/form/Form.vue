<script lang="ts">
export default {
  name: 'XForm',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { provide, onMounted, watch, nextTick, type PropType } from 'vue'
import { injectFormKey } from '../../composables/keys'
import { useTheme } from '../../composables/theme'

import theme from './Form.theme'

export type FormError = {
  field: string
  msg: string
}

export type Form = {
  name: string,
  focus: ()=> void,
  validate: ()=> boolean,
  setError: (val: string)=> void,
}

const props = defineProps({
  autoValidate: {
    type: Boolean,
    default: true,
  },
  autoFocus: {
    type: Boolean,
    default: true,
  },
  disabled: Boolean,
  errors: {
    type: [Array, Object] as PropType<[FormError[], FormError]>,
    default: () => ([]),
  },
})

const emit = defineEmits(['submit'])

const inputs: Form[] = []

provide(injectFormKey, {
  registerInput: (name: string, focus: ()=> void, validate: ()=> boolean, setError: (val: string)=> void) => {
    const exists = inputs.find((i) => i.name === name)

    if (exists) {
      exists.focus = focus
      exists.validate = validate
      exists.setError = setError
    }
    else inputs.push({ name, focus, validate, setError })
  },
  unregisterInput: (name: string) => {
    const index = inputs.findIndex((i) => i.name === name)

    inputs.splice(index, 1)
  },
  isInsideForm: true,
})

onMounted(() => {
  if (props.autoFocus && inputs && inputs.length > 0) inputs[0].focus()
})

watch(() => props.errors, (errors) => {
  if (errors) nextTick(() => {
    if (Array.isArray(errors)) errors.forEach((error: any) => {
      const input = inputs.find((i) => i.name === error.field)

      if (input) input.setError(error.msg)
    })

    else {
      const input = inputs.find((i) => i.name === (errors as FormError).field)

      if (input) input.setError((errors as FormError).msg)
    }
  })
})

const validate = () => {
  let isFormValid = true

  inputs.forEach((input) => {
    const isInputValid = input.validate()

    if (!isInputValid && isFormValid) {
      isFormValid = false

      // focus on input error
      if (input.focus) input.focus()
    }
  })

  return isFormValid
}

const submit = (e: Event) => {
  e.preventDefault()
  e.stopPropagation()

  const isFormValid = props.autoValidate ? validate() : true

  emit('submit', isFormValid)
}

const { styles, classes, className } = useTheme('form', theme, props)
</script>

<template>
  <form
    :style="styles"
    :class="[
      className,
      classes.wrapper
    ]"
    @submit="submit"
  >
    <fieldset :disabled="disabled">
      <slot></slot>
    </fieldset>
  </form>
</template>
