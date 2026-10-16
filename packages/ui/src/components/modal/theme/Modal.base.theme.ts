import type { ModalTheme } from '../Modal.vue'

const theme: ModalTheme = {
  classes: {
    wrapper: 'fixed z-40 inset-0 overflow-y-auto transition-all',

    backdrop: ({ props, data }) => {
      // Element opacity < 1 disables backdrop-filter; use alpha backgrounds when blurry.
      const classes = ['fixed inset-0 transition-opacity']

      if (props.blurry) classes.push('backdrop-blur-sm bg-secondary-700/30 dark:bg-black/70')
      else classes.push('bg-secondary-700 dark:bg-black')

      if (data.visible) {
        if (props.blurry) classes.push('ease-out duration-200 opacity-100')
        else classes.push('ease-out duration-200 opacity-30 dark:opacity-70')
      } else {
        classes.push('ease-in duration-100 opacity-0')
      }

      return classes
    },

    modalWrapper: ({ props }) => {
      const classes = [
        'flex justify-center h-dvh',
        'p-4 pb-[max(1rem,env(safe-area-inset-bottom,0px))] sm:p-8',
      ]

      if (props.position === 'top') classes.push('items-start')
      else if (props.position === 'bottom') classes.push('items-end')
      else classes.push('items-end sm:items-center')

      return classes
    },

    modal: ({ props, data }) => {
      const classes = ['relative flex flex-col z-10 bg-secondary-50 dark:bg-secondary-900 rounded-xl shadow-lg transform transition-all overflow-hidden max-h-full w-full min-h-0']

      if (data.visible) classes.push('ease-out duration-200 opacity-100 translate-y-0 sm:scale-100')
      else classes.push('ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95')

      if (props.size === 'xs') classes.push('sm:max-w-xs')
      else if (props.size === 'sm') classes.push('sm:max-w-sm')
      else if (props.size === 'md') classes.push('sm:max-w-lg')
      else if (props.size === 'lg') classes.push('sm:max-w-3xl')
      else if (props.size === 'xl') classes.push('sm:max-w-6xl')
      else if (props.size === 'full') classes.push('h-full')

      return classes
    },

    closeIcon: '!absolute top-3 z-10 right-3',

    header: 'flex items-center gap-3 text-lg pl-6 py-4 pr-12 bg-white dark:bg-secondary-800 dark:border-secondary-700 border-secondary-100 dark:border-secondary-700',

    headerContent: 'min-w-0 flex-1 flex flex-col justify-center gap-0.5',

    iconWrap: 'flex items-center justify-center shrink-0 size-11 rounded-xl border border-secondary-300 dark:border-secondary-700 bg-secondary-50 dark:bg-secondary-900/50',

    icon: 'text-secondary-500 dark:text-secondary-400',

    content: 'px-6 py-4',
    actions: 'flex gap-4 bg-white dark:bg-secondary-800 py-3 px-4 justify-end border-t border-secondary-100 dark:border-secondary-700',

    label: 'text-xs text-secondary-500 dark:text-secondary-400 leading-none',

    title: 'text-xl font-semibold leading-snug',

    description: 'text-sm text-secondary-500 dark:text-secondary-400 mb-8',
  },
}

export default theme
