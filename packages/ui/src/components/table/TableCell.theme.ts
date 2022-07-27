import type { ThemeParams } from '../../composables/theme'

export default {
  classes: {
    wrapper: ({ props }: ThemeParams) => {
      const c = ['last:pr-0 px-3']

      c.push(props.dense ? 'py-2' : 'py-4')

      if (props.textAlign === 'left') c.push('text-left')
      else if (props.textAlign === 'center') c.push('text-center')
      else if (props.textAlign === 'right') c.push('text-right')
      else if (props.textAlign === 'justify') c.push('text-justify')

      if (props.verticalAlign === 'baseline') c.push('align-baseline')
      else if (props.verticalAlign === 'bottom') c.push('align-bottom')
      else if (props.verticalAlign === 'middle') c.push('align-middle')
      else if (props.verticalAlign === 'text-bottom') c.push('align-text-bottom')
      else if (props.verticalAlign === 'text-top') c.push('align-text-top')
      else if (props.verticalAlign === 'top') c.push('align-top')

      if (props.truncate && props.fixed) c.push('truncate')

      return c
    },
  },
}
