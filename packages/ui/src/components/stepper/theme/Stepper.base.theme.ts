import type { StepperTheme } from '../Stepper.vue'

const theme: StepperTheme = {
  classes: {
    wrapper: '',

    scroller: ({ props }) => {
      const c = ['']

      if (!props.fullWidth) c.push('!w-fit')

      return c
    },

    list: ({ props }) => {
      const c = ['flex min-w-full w-fit items-start']

      return c
    },

    step: ({ props, data }) => {
      const classes = ['']

      if (!props.grow) classes.push('w-[8rem]')

      return classes
    },

    label: ({ props, data }) => {
      const classes = ['']

      return classes
    },

    icon: ({ props, data }) => {
      const classes = ['mr-2 mt-0.5']

      return classes
    },

    content: 'mt-2 mb-4',
  },
}

export default theme
