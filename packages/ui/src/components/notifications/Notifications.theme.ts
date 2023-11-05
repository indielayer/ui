import type { ThemeClasses, ThemeComponent } from '../../composables/theme'
import type { NotificationsProps } from './Notifications.vue'

type InternalClasses = 'wrapper' | 'list' | 'item'

interface InternalTheme extends ThemeComponent<NotificationsProps, InternalClasses> {}
export interface NotificationsTheme extends Omit<InternalTheme, 'classes'> {
  classes?: Partial<ThemeClasses<NotificationsProps, InternalClasses>>;
}

const theme: InternalTheme = {
  classes: {
    wrapper: 'fixed z-40 w-full sm:w-auto overflow-y-auto max-h-screen',

    list: 'flex flex-col items-end w-full sm:w-[520px] px-4',

    item: 'w-full flex items-center rounded-md px-4 py-3 bg-gray-800 dark:bg-gray-50 text-white dark:text-gray-900 border border-gray-700 dark:border-gray-100',
  },
}

export default theme
