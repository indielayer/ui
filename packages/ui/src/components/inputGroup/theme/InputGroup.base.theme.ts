import type { InputGroupTheme } from '../InputGroup.vue'

const theme: InputGroupTheme = {
  classes: {
    wrapper: 'inline-flex w-full items-stretch -space-x-px [&>*]:relative [&>*:focus-within]:z-10 [&>*:focus]:z-10 [&>.x-datepicker]:flex-1 [&>.x-datepicker]:min-w-0',
  },
}

export default theme
