import type { LabelTheme } from '../Label.vue'

import BaseTheme from './Label.base.theme'

const theme: LabelTheme = {
  classes: {
    wrapper: BaseTheme.classes?.wrapper,

    label: 'text-xs text-gray-500 dark:text-gray-200 mb-2',
  },
}

export default theme
