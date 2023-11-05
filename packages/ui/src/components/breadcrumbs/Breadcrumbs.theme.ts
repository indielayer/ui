import type { ThemeClasses, ThemeComponent } from '../../composables/theme'
import type { BreadcrumbsProps } from './Breadcrumbs.vue'

type InternalClasses = 'wrapper' | 'item' | 'lastItem'

interface InternalTheme extends ThemeComponent<BreadcrumbsProps, InternalClasses> {}
export interface BreadcrumbsTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<BreadcrumbsProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: 'flex items-center flex-wrap',
    item: 'flex items-center',
    lastItem: 'font-semibold',
  },
}

export default theme
