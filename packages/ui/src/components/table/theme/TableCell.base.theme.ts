import type { TableCellTheme } from '../TableCell.vue'

const theme: TableCellTheme = {
  classes: {
    // Padding/`first:` must live on `<td>` so `:first-child` is row-scoped
    // (not “first child of the cell”, which breaks when content is an `<a>`).
    wrapper: ({ props }) => {
      const c = ['px-2.5 first:px-5']

      c.push(props.dense ? 'h-9 py-0.5' : 'h-11 py-1')

      if (props.verticalAlign === 'baseline') c.push('align-baseline')
      else if (props.verticalAlign === 'bottom') c.push('align-bottom')
      else if (props.verticalAlign === 'middle') c.push('align-middle')
      else if (props.verticalAlign === 'text-bottom') c.push('align-text-bottom')
      else if (props.verticalAlign === 'text-top') c.push('align-text-top')
      else if (props.verticalAlign === 'top') c.push('align-top')

      if (!(props.to || props.href)) {
        if (props.textAlign === 'left') c.push('text-left')
        else if (props.textAlign === 'center') c.push('text-center')
        else if (props.textAlign === 'right') c.push('text-right')
        else if (props.textAlign === 'justify') c.push('text-justify')

        if (props.truncate) c.push('truncate')
      }

      return c
    },

    link: ({ props }) => {
      const c = ['flex items-center min-w-0 w-full h-full']

      if (props.textAlign === 'left') c.push('justify-start')
      else if (props.textAlign === 'center') c.push('justify-center')
      else if (props.textAlign === 'right') c.push('justify-end')
      else if (props.textAlign === 'justify') c.push('justify-center')

      if (props.truncate) c.push('truncate')

      return c
    },
  },
}

export default theme
