import type { CardTheme } from '../../components/card'

const theme: CardTheme = {
  classes: {
    wrapper: ({ props }) => `rounded bg-white dark:bg-gray-800${props.flat ? '' : ' shadow'}`,
  },
}

export default theme
