import { ref } from 'vue'
import {
  withValidator as withCommonValidator,
  withProps as withCommonProps,
} from './common'

const validator = {
  ...withCommonValidator(),
}

export const withProps = () => ({
  ...withCommonProps(),
  disabled: {
    type: Boolean,
    default: false,
  },
  loading: {
    type: Boolean,
    default: false,
  },
})

export const withValidator = () => validator

export const useInteractive = () => {
  const focusRef = ref(null)

  const methods = {
    focus: () => {
      if (focusRef.value) focusRef.value.focus()
    },
  }

  return {
    focusRef,
    ...methods,
  }
}
