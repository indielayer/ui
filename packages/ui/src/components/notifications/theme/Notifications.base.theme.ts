import type { NotificationsTheme } from '../Notifications.vue'

const theme: NotificationsTheme = {
  classes: {
    wrapper: 'fixed z-50 w-full sm:w-auto max-h-screen',

    list: 'flex flex-col items-end w-full sm:w-[520px] px-4',

    item: 'w-full flex items-center rounded-md px-4 py-3 bg-secondary-800 dark:bg-secondary-50 text-white dark:text-secondary-900 border border-secondary-700 dark:border-secondary-100',
  },
}

export default theme
