import type { ContainerTheme } from '../Container.vue'

const theme: ContainerTheme = {
  classes: {
    wrapper: ({ props }) => {
      const classes = ['px-4 md:px-6']

      if (!props.fluid) classes.push('max-w-screen-lg mx-auto')

      return classes
    },
  },
}

export default theme
