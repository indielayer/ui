import type { UITheme } from '../../theme'
import * as components from './components'
import styles from './styles'

const theme: UITheme = {
  name: 'Base',
  styles,
  classPrefix: 'x-',
  components,
}

export default theme
