import type { LabelTheme } from './'
import base from './Label.theme'

const theme: LabelTheme = {
  classes: {
    wrapper: base.classes?.wrapper,

    label: 'text-xs text-gray-500 dark:text-gray-200 mb-2',
  },
}

export default theme
