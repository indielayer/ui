import type { ModalTheme } from '../Modal.vue'

const theme: ModalTheme = {
  classes: {
    wrapper: 'fixed z-40 inset-0 overflow-y-auto transition-all',

    backdrop: ({ data }) => {
      const classes = ['fixed inset-0 bg-secondary-500 dark:bg-black transition-opacity']

      if (data.visible) classes.push('ease-out duration-200 opacity-30 dark:opacity-70')
      else classes.push('ease-in duration-100 opacity-0')

      return classes
    },

    modalWrapper: ({ props }) => {
      const classes = ['flex justify-center p-4 sm:p-8 md:py-20 h-screen']

      if (props.position === 'top') classes.push('items-start')
      else if (props.position === 'bottom') classes.push('items-end')
      else classes.push('sm:items-end items-center')

      return classes
    },

    modal: ({ props, data }) => {
      const classes = ['relative flex flex-col z-10 bg-white dark:bg-secondary-900 rounded-md shadow-lg transform transition-all overflow-hidden max-h-full w-full']

      if (data.visible) classes.push('ease-out duration-200 opacity-100 translate-y-0 sm:scale-100')
      else classes.push('ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95')

      if (props.size === 'xs') classes.push('sm:max-w-xs')
      else if (props.size === 'sm') classes.push('sm:max-w-sm')
      else if (props.size === 'lg') classes.push('sm:max-w-xl')
      else if (props.size === 'xl') classes.push('sm:max-w-3xl')
      else classes.push('sm:max-w-lg')

      return classes
    },

    closeIcon: '!absolute top-2 z-10 right-2',

    header: 'text-lg pl-6 py-4 border-b pr-12',

    content: 'px-6 py-4',
    actions: ({ props, slots }) => {
      const classes = ['flex gap-4 bg-secondary-50 dark:bg-secondary-800 p-4 justify-end']

      return classes
    },

    label: 'text-xs text-secondary-500 mb-1',

    title: 'text-xl font-semibold',

    description: 'text-sm mb-8',
  },
}

export default theme
