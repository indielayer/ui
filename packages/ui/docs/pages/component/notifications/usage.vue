<script setup>
import { useNotifications } from '@indielayer/ui'

const notification = useNotifications('notifica')

const log = () => {notification.log('Default notification.')}
const info = () => {notification.info('Starwars is a movie.')}
const error = () => {notification.error('Disk is full!')}
const warn = () => {notification.warn('Disk is almost full.')}
const success = () => {notification.success('File saved!')}
const custom = () => {
  notification.info({
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
  notification.info({
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
