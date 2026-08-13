import type { DividerTheme } from '../Divider.vue'

const theme: DividerTheme = {
  classes: {
    wrapper: ({ props }) => `flex justify-center items-center ${props.vertical ? 'h-full flex-col' : 'w-full'}`,

    label: 'text-xs text-secondary-400',

    line: 'bg-secondary-200 dark:bg-secondary-700 grow',
  },
}

export default theme
