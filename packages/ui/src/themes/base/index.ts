import type { UITheme } from '../../theme'
import * as components from './components'
import rawStyles from './styles.css?raw'

const theme: UITheme = {
  name: 'Base',
  styles: `${rawStyles}`,
  classPrefix: 'x-',
  components,
}

export default theme
