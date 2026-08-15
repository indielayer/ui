<script lang="ts">
const formProps = {
  autoValidate: {
    type: Boolean,
    default: true,
    description: 'Runs validation on all registered fields before emitting submit.',
  },
  autoFocus: {
    type: Boolean,
    default: true,
    description: 'Focuses the first registered field when the form mounts.',
  },
  disabled: {
    type: Boolean,
    description: 'Disables all fields inside the form fieldset.',
  },
  errors: {
    type: [Array, Object] as PropType<FormError[] | FormError>,
    default: () => ([]),
    description: 'External field errors (`field` + `msg`) applied to registered inputs.',
  },
  title: {
    type: String,
    description: 'Optional title shown in the default header.',
  },
  description: {
    type: String,
    description: 'Optional description shown under the title in the default header.',
  },
  hasFooter: {
    type: Boolean,
    default: true,
    description: 'Renders the footer slot area for form actions.',
  },
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

type InternalClasses = 'wrapper' | 'content' | 'title' | 'description' | 'footer'
export interface FormTheme extends ThemeComponent<FormProps, InternalClasses> {}

export default {
  name: 'XForm',
  docs: {
    slots: {
      default: 'Form fields and content inside the fieldset.',
      header: 'Custom header; overrides the default title/description block.',
      footer: 'Custom footer; wraps primary and secondary actions by default.',
      'primary-action': 'Primary action control in the default footer.',
      'secondary-action': 'Secondary action control in the default footer.',
    },
    emits: {
      submit: 'Emitted on form submit with whether validation passed.',
    },
    methods: {
      validate: 'Validate all registered fields; focuses the first invalid field.',
      submit: 'Programmatically submit the form (runs auto-validate when enabled).',
    },
  },
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

onMounted(async () => {
  if (props.autoFocus && inputs && inputs.length > 0) {
    setTimeout(inputs[0].focus, 50)
  }
})

watch(() => props.errors, (errors) => {
  if (errors) nextTick(() => {
    if (Array.isArray(errors)) errors.forEach((error: FormError, index) => {
      const input = inputs.find((i) => i.name === error.field)

      if (input) {
        input.setError(error.msg)
        if (index === 0 && input.focus) input.focus()
      }
    })

    else {
      const input = inputs.find((i) => i.name === (errors as FormError).field)

      if (input) {
        input.setError((errors as FormError).msg)
        if (input.focus) input.focus()
      }
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

defineExpose({ validate, submit })

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
      <div v-if="title || description" class="mb-6">
        <p v-if="title" :class="classes.title">{{ title }}</p>
        <p v-if="description" :class="classes.description">{{ description }}</p>
      </div>
    </slot>

    <fieldset :disabled="disabled" :class="classes.content" class="contents">
      <slot></slot>
    </fieldset>

    <slot v-if="hasFooter" name="footer">
      <div :class="classes.footer">
        <slot name="primary-action"></slot>
        <slot name="secondary-action"></slot>
      </div>
    </slot>
  </form>
</template>
