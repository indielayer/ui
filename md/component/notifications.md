# Notifications
Toast-style feedback for success, warning, or error after an action. Use notifications for transient messages that should not block the page.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| align | String NotificationsAlign | right | Horizontal placement of the toast stack (left or right). |
| color | String | primary | Theme or CSS color used for the control accents. |
| injectKey | [Symbol, String] | injectNotificationKey | Provide/inject key for notification helpers (log, info, success, warn, error). |
| offset | [String, Number] | 0 | Extra inset from the viewport edge in pixels. |
| pauseOnHover | Boolean | true | Pauses the dismiss timer while the pointer hovers a notification. |
| position | String NotificationsPosition | bottom | Vertical placement of the toast stack (top or bottom). |
| removable | Boolean | true | Shows a dismiss control on each notification by default. |
| timeout | Number | 3500 | Default auto-dismiss delay in milliseconds. Set 0 to keep until removed. |

### Slots
- `default`: App content that can inject notification helpers.

### Events
- _(none)_

### Methods
- `error`: Show an error-styled notification.
- `info`: Show an info-styled notification.
- `log`: Show a plain notification.
- `success`: Show a success-styled notification.
- `warn`: Show a warning-styled notification.
- `warning`: Alias of `warn`.

### Demos
#### Usage
```vue
<script setup lang="ts">
import { useNotifications } from '@indielayer/ui'

const notification = useNotifications()

const log = () => {notification?.log('Default notification.')}
const info = () => {notification?.info('Starwars is a movie.')}
const error = () => {notification?.error('Disk is full!')}
const warn = () => {notification?.warn('Disk is almost full.')}
const success = () => {notification?.success('File saved!')}
const custom = () => {
  notification?.info({
    timeout: 0,
    title: 'Notification title',
    message: 'Subtitle text goes here.',
    iconColor: 'primary',
    align: 'right',
    position: 'bottom',
    action: {
      label: 'Hello',
      onClick: () => {
        console.log('Hello!')
      },
    },
  })
}
const custom2 = () => {
  notification?.info({
    timeout: 0,
    title: 'Notification title',
    message: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem accusamus quisquam deleniti error possimus ipsa, fugit maiores. Fuga, non ab id odit praesentium earum optio tempore veniam, eligendi deleniti culpa neque aliquam blanditiis distinctio perferendis delectus ut aut. Sapiente repellendus culpa magnam ullam placeat et sunt laborum minus inventore. Cupiditate, totam soluta. Numquam placeat illum provident culpa corporis quis exercitationem, praesentium dicta quisquam quaerat voluptatem soluta dignissimos, enim dolores, saepe ullam. Dolorem, quo porro officiis aspernatur odit neque at minima totam eius! Cum aliquid repudiandae molestias, dolore accusantium qui ratione iusto, consequatur mollitia quaerat at ipsa voluptatibus quia minima? Nobis?',
    iconColor: 'primary',
    align: 'right',
    position: 'top',
    action: {
      label: 'Hello',
      color: 'pink',
      onClick: () => {
        console.log('Hello!')
      },
    },
  })
}
</script>

<template>
  <div class="space-x-4">
    <x-button @click="log">Log</x-button>
    <x-button @click="info">Info</x-button>
    <x-button @click="error">Error</x-button>
    <x-button @click="warn">Warn</x-button>
    <x-button @click="success">Success</x-button>
    <x-button @click="custom">Custom</x-button>
    <x-button @click="custom2">Custom2</x-button>
  </div>
</template>
```

HTML docs: https://indielayer.com/component/notifications
