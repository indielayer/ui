import type { RadioButtonTheme } from '../RadioButton.vue'
import BaseTheme from './RadioButton.base.theme'

const theme: RadioButtonTheme = {
  classes: {
    wrapper({ props, data }) {
      const classes = [
        'relative inline-flex items-center justify-center cursor-pointer select-none',
        'transition duration-150 font-light whitespace-nowrap border text-sm tracking-wide',
        'active:!shadow-none',
      ]

      if (props.size === 'xs') classes.push('py-1 px-2')
      else if (props.size === 'sm') classes.push('py-1.5 px-3')
      else if (props.size === 'lg') classes.push('py-3 px-5')
      else if (props.size === 'xl') classes.push('py-4 px-6')
      else classes.push('py-2 px-4')

      if (!data.isInsideFormGroup) classes.push(props.rounded ? 'rounded-full' : '')

      if (props.disabled) classes.push('cursor-not-allowed')
      else if (props.loading) classes.push('cursor-default')

      return classes
    },
  },

  styles: BaseTheme.styles,
}

export default theme
