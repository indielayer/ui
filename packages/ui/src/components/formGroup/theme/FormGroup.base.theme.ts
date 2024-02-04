import type { FormGroupTheme } from '../FormGroup.vue'

const theme: FormGroupTheme = {
  classes: {
    wrapper: ({ props }) => {
      const classes = ['']

      if (!props.vertical) classes.push('flex gap-4')
      else classes.push('grid gap-1')

      return classes
    },
  },
}

export default theme
