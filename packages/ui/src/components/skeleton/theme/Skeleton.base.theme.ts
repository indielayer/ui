import type { SkeletonTheme } from '../Skeleton.vue'

const theme: SkeletonTheme = {
  classes: {
    wrapper: ({ props }) => {
      const classes = ['animate-pulse bg-secondary-300 dark:bg-secondary-600']

      if (props.shape === 'circle') classes.push('w-8 h-8 rounded-full')
      else classes.push('rounded-md')

      return classes
    },
  },
}

export default theme
