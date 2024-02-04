import type { CardTheme } from '../Card.vue'

const theme: CardTheme = {
  classes: {
    wrapper: ({ props }) => `bg-slate-50 dark:bg-slate-800 rounded-md ${props.flat ? '' : 'shadow'}`,
  },
}

export default theme
