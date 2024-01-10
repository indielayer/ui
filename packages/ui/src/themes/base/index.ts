import type { UITheme } from '../../theme'
import * as components from './_components'
import rawStyles from './_styles.css?raw'

const theme: UITheme = {
  name: 'Base',
  colors: {
    primary: { '50': '#ecfdf5', '100': '#d1fae5', '200': '#a7f3d0', '300': '#6ee7b7', '400': '#34d399', '500': '#10b981', '600': '#059669', '700': '#047857', '800': '#065f46', '900': '#064e3b', '950': '#022c22' },
  },
  styles: `${rawStyles}`,
  classPrefix: 'x-',
  components,
}

export default theme
