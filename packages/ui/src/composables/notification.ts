import { inject } from 'vue'
import { injectNotificationKey } from './keys'

export const useNotification = () => {
  const notification = inject(injectNotificationKey)

  if (!notification) console.warn('useNotification must have a parent wrapped with Notifications component')

  return notification
}
