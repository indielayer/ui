import type { CardTheme } from '../Card.vue'

const theme: CardTheme = {
  classes: {
    wrapper: ({ props }) => `rounded bg-white dark:bg-gray-800${props.flat ? '' : ' shadow'}`,
  },
}

export default theme
