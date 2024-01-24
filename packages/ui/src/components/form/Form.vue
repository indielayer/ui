<script lang="ts">
const formProps = {
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
  title: String,
  description: String,
}

export type FormProps = ExtractPublicPropTypes<typeof formProps>

export type FormInjection = {
  registerInput: (name: string, focus: () => void, validate: () => boolean, setError: (val: string) => void) => void;
  unregisterInput: (name: string) => void;
  isInsideForm: boolean;
}

export type FormError = {
  field: string;
  msg: string;
}

export type FormInput = {
  name: string;
  focus: () => void;
  validate: (val?: any) => boolean;
  setError: (val: string) => void;
}

type InternalClasses = 'wrapper' | 'title' | 'description' | 'footer'
export interface FormTheme extends ThemeComponent<FormProps, InternalClasses> {}

export default {
  name: 'XForm',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { provide, onMounted, watch, nextTick, type PropType, type ExtractPublicPropTypes } from 'vue'
import { injectFormKey } from '../../composables/keys'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(formProps)

const emit = defineEmits(['submit'])

const inputs: FormInput[] = []

provide(injectFormKey, {
  registerInput: (name: string, focus: () => void, validate: (val: any) => boolean, setError: (val: string) => void) => {
    const exists = inputs.find((i) => i.name === name)

    if (exists) {
      exists.focus = focus
      exists.validate = validate
      exists.setError = setError
    } else inputs.push({ name, focus, validate, setError })
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

const { styles, classes, className } = useTheme('Form', {}, props)
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
    <slot name="header">
      <div v-if="title || description" class="mb-10">
        <p v-if="title" :class="classes.title">{{ title }}</p>
        <p v-if="description" :class="classes.description">{{ description }}</p>
      </div>
    </slot>

    <fieldset :disabled="disabled">
      <slot></slot>
    </fieldset>

    <slot name="footer">
      <div :class="classes.footer">
        <slot name="primary-action"></slot>
        <slot name="secondary-action"></slot>
      </div>
    </slot>
  </form>
</template>
