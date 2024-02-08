import type { UITheme } from '../../theme'
import * as components from './components'
import styles from './styles'

const theme: UITheme = {
  name: 'Carbon',
  colors: {
    primary: { '50': '#eff6ff', '100': '#dbeafe', '200': '#bfdbfe', '300': '#93c5fd', '400': '#60a5fa', '500': '#3b82f6', '600': '#2563eb', '700': '#1d4ed8', '800': '#1e40af', '900': '#1e3a8a', '950': '#172554' },
  },
  styles,
  classPrefix: 'x-',
  components,
}

export default theme
