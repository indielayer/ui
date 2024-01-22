import type { BreadcrumbsTheme } from '../Breadcrumbs.vue'

import BaseTheme from './Breadcrumbs.base.theme'

const theme: BreadcrumbsTheme = {
  classes: {
    ...BaseTheme.classes,
    wrapper: 'flex items-center flex-wrap text-sm',
  },
}

export default theme
