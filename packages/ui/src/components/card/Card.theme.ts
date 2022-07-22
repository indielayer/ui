import type { ThemeParams } from '../../composables/theme'

export default {
  classes: {
    wrapper: ({ props }: ThemeParams) => `rounded bg-white dark:bg-gray-800${props.flat ? '' : ' shadow'}`,
  },
}
