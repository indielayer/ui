import type { TableCellTheme } from '../TableCell.vue'

const theme: TableCellTheme = {
  classes: {
    wrapper: ({ props }) => {
      const c = ['px-3']

      c.push(props.dense ? 'h-9 py-0.5' : 'h-11 py-1')

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

      if (props.truncate) c.push('truncate')

      return c
    },
  },
}

export default theme
