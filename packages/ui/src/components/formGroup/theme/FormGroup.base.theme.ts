import type { FormGroupTheme } from '../FormGroup.vue'

const theme: FormGroupTheme = {
  classes: {
    wrapper: ({ props, data }) => {
      const classes = ['']

      if (!props.vertical) {
        if (data.hasJoinedLayout) classes.push('inline-flex align-middle relative -space-x-[1px]')
        else classes.push('flex gap-4')
      } else {
        classes.push('grid gap-1')
      }

      return classes
    },
  },
}

export default theme
