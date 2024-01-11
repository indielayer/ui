import type { BreadcrumbsTheme } from '../../components/breadcrumbs'

const theme: BreadcrumbsTheme = {
  classes: {
    wrapper: 'flex items-center flex-wrap',
    item: 'flex items-center last-of-type:font-semibold',
    separator: 'text-gray-400 mx-1.5',
  },
}

export default theme
