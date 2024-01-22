import { inject } from 'vue'
import { injectNotificationKey } from './keys'
import type { NotificationInjection } from '../components/notifications/Notifications.vue'

export const useNotifications = (key?: symbol | string) => {
  const notifications = inject<NotificationInjection>(key || injectNotificationKey)

  if (!notifications) console.warn('useNotifications must have a parent wrapped with Notifications component')

  return notifications
}
