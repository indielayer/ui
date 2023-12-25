import { inject } from 'vue'
import { injectNotificationKey } from './keys'

export const useNotifications = (key?: symbol | string) => {
  const notifications = inject(key || injectNotificationKey)

  if (!notifications) console.warn('useNotifications must have a parent wrapped with Notifications component')

  return notifications
}
