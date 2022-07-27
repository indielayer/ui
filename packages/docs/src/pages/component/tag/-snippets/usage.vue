<template>
  <div class="space-x-2">
    <x-tag color="primary">Hello</x-tag>
    <x-tag color="amber">Amber</x-tag>
    <x-tag outlined>I'm a tag</x-tag>
    <x-tag removable @remove="notification.log('remove me')">I'm a tag</x-tag>
    <x-tag removable size="xs" @remove="notification.log('remove me')">I'm a tag</x-tag>
    <x-tag removable size="lg" @remove="notification.log('remove me')">I'm a tag</x-tag>
    <x-tag removable size="xl" @remove="notification.log('remove me')">I'm a tag</x-tag>
  </div>
</template>

<script>
import { useNotifications } from '@indielayer/ui'

export default {
  setup() {
    const notification = useNotifications()

    return {
      notification,
    }
  },
}
</script>
