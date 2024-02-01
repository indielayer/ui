import type { ContainerTheme } from '../Container.vue'

const theme: ContainerTheme = {
  classes: {
    wrapper: ({ props }) => {
      const classes = ['px-4 md:px-8']

      if (!props.fluid) classes.push('max-w-screen-2xl mx-auto')

      return classes
    },
  },
}

export default theme
