<script lang="ts">
import { defineComponent, provide, onMounted, watch, nextTick } from 'vue'
import { injectFormKey } from '../../composables/keys'

export type Form = {
  name: string,
  focus: ()=> void,
  validate: ()=> boolean,
  setError: (val: string)=> void,
}

export default defineComponent({
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
    disabled: Boolean,
    errors: {
      type: Array,
      default: () => [],
    },
  },

  emits: ['submit'],

  setup(props, { emit }) {
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
      nextTick(() => {
        errors.forEach((error: any) => {
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

    const submit = (e: Event) => {
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
})
</script>

<template>
  <form @submit="submit">
    <fieldset :disabled="disabled">
      <slot></slot>
    </fieldset>
  </form>
</template>
