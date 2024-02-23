import type { CardTheme } from '../Card.vue'

const theme: CardTheme = {
  classes: {
    wrapper: ({ props }) => `bg-white dark:bg-secondary-800 overflow-hidden rounded-md ${props.flat ? '' : 'shadow'}`,
  },
}

export default theme
