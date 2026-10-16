import type { InputGroupTheme } from '../InputGroup.vue'

const theme: InputGroupTheme = {
  classes: {
    // shadow-sm on the group (segments drop theirs so shadows don't bleed at joins)
    // w-full only with `block` — otherwise the empty stretch shows under the group shadow
    wrapper: ({ props }) => {
      const classes = [
        'inline-flex items-stretch -space-x-px rounded-lg shadow-xs',
        '[&>*]:relative [&>*:focus-within]:z-10 [&>*:focus]:z-10',
        '[&>.x-datepicker]:flex-1 [&>.x-datepicker]:min-w-0',
      ]

      if (props.block) classes.push('w-full')

      return classes
    },
  },
}

export default theme
