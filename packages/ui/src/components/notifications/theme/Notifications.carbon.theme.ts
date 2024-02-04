import type { NotificationsTheme } from '../Notifications.vue'

const theme: NotificationsTheme = {
  classes: {
    wrapper: 'fixed z-50 w-full sm:w-auto overflow-y-auto max-h-screen',

    list: 'flex flex-col items-end w-full sm:w-[520px] px-4',

    item: () => {
      const classes = ['w-full flex items-center px-4 py-3 bg-secondary-800 dark:bg-secondary-50 text-white dark:text-secondary-900 border-l-2 border-[color:var(--x-notification-icon)]']

      return classes
    },
  },
}

export default theme
