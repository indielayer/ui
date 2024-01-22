import type { DividerTheme } from '../Divider.vue'

const theme: DividerTheme = {
  classes: {
    wrapper: ({ props }) => `flex justify-center items-center ${props.vertical ? 'h-full flex-col' : 'w-full'}`,

    label: 'font-medium text-sm text-gray-600 dark:text-gray-300',

    line: 'bg-gray-200 dark:bg-slate-700 flex-grow',
  },
}

export default theme
