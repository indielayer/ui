import type { DividerTheme } from '../Divider.vue'

const theme: DividerTheme = {
  classes: {
    wrapper: ({ props }) => `flex justify-center items-center ${props.vertical ? 'h-full flex-col' : 'w-full'}`,

    label: 'font-medium text-sm text-secondary-600 dark:text-secondary-300',

    line: 'bg-secondary-200 dark:bg-secondary-700 flex-grow',
  },
}

export default theme
