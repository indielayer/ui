import type { ModalTheme } from '../Modal.vue'

const theme: ModalTheme = {
  classes: {
    wrapper: 'fixed z-40 inset-0 overflow-y-auto transition-all',

    backdrop: ({ data }) => {
      const classes = ['fixed inset-0 bg-secondary-500 dark:bg-black transition-opacity']

      if (data.visible) classes.push('ease-out duration-200 opacity-70 dark:opacity-70')
      else classes.push('ease-in duration-100 opacity-0')

      return classes
    },

    modal: ({ props, data }) => {
      const classes = ['relative flex flex-col z-10 bg-secondary-200 dark:bg-secondary-900 shadow-lg transform transition-all overflow-hidden max-h-full w-full']

      if (data.visible) classes.push('ease-out duration-200 opacity-100 translate-y-0 sm:scale-100')
      else classes.push('ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95')

      if (props.size === 'xs') classes.push('sm:max-w-xs')
      else if (props.size === 'sm') classes.push('sm:max-w-sm')
      else if (props.size === 'lg') classes.push('sm:max-w-xl')
      else if (props.size === 'xl') classes.push('sm:max-w-3xl')
      else classes.push('sm:max-w-lg')

      return classes
    },

    closeIcon: '!absolute top-0 z-10 right-0',

    header: 'text-lg pl-4 pt-4 pr-12',

    content: ({ props }) => {
      const classes = ['pb-8']

      if (!props.fluid) classes.push('px-4')

      return classes
    },

    actions: ({ props, slots }) => {
      const classes = ['grid grid-flow-col gap-[1px]']

      if (slots['tertiary-action'] || slots['cancel-action']) classes.push('grid-cols-4')
      else classes.push('grid-cols-2')

      return classes
    },

    label: 'text-xs text-secondary-500 mb-1',

    title: 'text-xl mb-4',

    description: 'text-sm mb-4',
  },
}

export default theme
