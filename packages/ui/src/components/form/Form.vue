<template>
  <form @submit="submit" @keypress.enter="submit">
    <fieldset :disabled="disabled">
      <slot></slot>
    </fieldset>
  </form>
</template>

<script>
import { provide, onMounted, watch, nextTick } from 'vue'

export default {
  name: 'XForm',
  inheritAttrs: false,
  props: {
    autoValidate: {
      type: Boolean,
      default: true,
    },
    autoFocus: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    errors: {
      type: Array,
      default: () => [],
    },
  },

  setup(props, { emit }) {
    const inputs = []

    provide('form', {
      registerInput: (name, { focus, validate, setError }) => {
        const exists = inputs.find((i) => i.name === name)

        if (exists) {
          exists.focus = focus
          exists.validate = validate
          exists.setError = setError
        }
        else inputs.push({ name, focus, validate, setError })
      },
      unregisterInput: (name) => {
        const index = inputs.findIndex((i) => i.name === name)

        inputs.splice(index, 1)
      },
    })

    onMounted(() => {
      if (props.autoFocus && inputs && inputs.length > 0) inputs[0].focus()
    })

    watch(() => props.errors, (errors) => {
      nextTick(() => {
        errors.forEach((error) => {
          const input = inputs.find((i) => i.name === error.field)

          if (input) input.setError(error.msg)
        })
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

    const submit = (e) => {
      e.preventDefault()
      e.stopPropagation()

      const isFormValid = props.autoValidate ? validate() : true

      emit('submit', isFormValid)
    }

    return {
      validate,
      submit,
    }
  },
}
</script>
