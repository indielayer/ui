import { inject } from 'vue'
import { injectNotificationKey } from './keys'

export const useNotifications = () => {
  const notifications = inject(injectNotificationKey)

  if (!notifications) console.warn('useNotifications must have a parent wrapped with Notifications component')

  return notifications
}
