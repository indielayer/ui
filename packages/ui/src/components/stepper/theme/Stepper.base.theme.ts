import type { StepperTheme } from '../Stepper.vue'

const theme: StepperTheme = {
  classes: {
    wrapper: 'w-full',

    layout: ({ props }) => {
      if (props.orientation === 'vertical') return 'flex h-full min-h-0'

      return 'flex flex-col'
    },

    sidebar: 'w-full shrink-0 hidden md:block bg-secondary-100 dark:bg-secondary-900 h-full py-4 px-6 overflow-y-auto max-w-[260px]',

    nav: 'relative ml-4 pr-2 list-none m-0 p-0',

    navItem: 'pb-8 pl-6 group relative border-l list-none',

    indicator: ({ props }) => {
      const c = [
        'absolute flex items-center justify-center w-8 h-8 rounded-full -start-4 ring-4 ring-secondary-100 dark:ring-secondary-900 font-semibold text-sm shrink-0',
      ]

      if (props.size === 'sm') c.push('w-6 h-6 text-xs -start-3')

      return c
    },

    indicatorHorizontal: ({ props }) => {
      const c = [
        'relative z-[1] flex items-center justify-center w-8 h-8 rounded-full font-semibold text-sm shrink-0',
      ]

      if (props.size === 'sm') c.push('w-6 h-6 text-xs')

      return c
    },

    stepTrack: 'flex w-full items-center min-h-8',

    stepConnector: 'h-0.5 flex-1 min-w-[0.5rem] rounded-full',

    connector: '',

    title: 'text-sm min-h-8 flex flex-col justify-center',

    subtitle: 'text-xs text-secondary-500 dark:text-secondary-400',

    description: 'text-xs text-secondary-500 dark:text-secondary-400',

    optional: 'text-xs font-normal text-secondary-400 dark:text-secondary-500',

    summary: 'text-xs text-secondary-500 dark:text-secondary-400 mt-1',

    content: ({ props }) => {
      if (props.orientation === 'vertical') return 'grow py-4 px-6 md:px-10 overflow-y-auto relative min-h-[8rem]'

      return 'mt-6 px-1 relative min-h-[5rem]'
    },

    panel: 'w-full',

    scroller: 'w-full',

    list: 'flex min-w-full w-full items-start gap-0',

    step: 'flex flex-1 flex-col min-w-[5.5rem] max-w-[12rem] py-2 px-2 border-0 bg-transparent',

    label: 'flex flex-col gap-0.5 mt-2 min-w-0 w-full',

    icon: 'shrink-0',
  },
}

export default theme
