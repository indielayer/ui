import type { ThemeClasses, ThemeComponent } from '../../composables/useTheme'
import type { TableCellProps } from './TableCell.vue'

type InternalClasses = 'wrapper'

interface InternalTheme extends ThemeComponent<TableCellProps, InternalClasses> {}
export interface TableCellTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<TableCellProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: ({ props }) => {
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

export default theme
