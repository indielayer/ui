import type { ThemeClasses, ThemeComponent } from '../../composables/useTheme'
import type { SkeletonProps } from './Skeleton.vue'

type InternalClasses = 'wrapper'

interface InternalTheme extends ThemeComponent<SkeletonProps, InternalClasses> {}
export interface SkeletonTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<SkeletonProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: 'animate-pulse bg-gray-300 dark:bg-gray-600 rounded-md',
  },
}

export default theme
