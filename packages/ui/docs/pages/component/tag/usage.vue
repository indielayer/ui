<template>
  <div class="space-x-2">
    <x-tag color="primary">Hello</x-tag>
    <x-tag color="amber">Amber</x-tag>
    <x-tag outlined>I'm a tag</x-tag>
    <x-tag rounded outlined color="pink">I'm a tag</x-tag>
    <x-tag color="pink">I'm a tag</x-tag>
    <x-tag removable @remove="notifications.log('remove me')">I'm a tag</x-tag>
    <x-tag removable size="xs" @remove="notifications.log('remove me')">I'm a tag</x-tag>
    <x-tag removable size="lg" @remove="notifications.log('remove me')">I'm a tag</x-tag>
    <x-tag removable size="xl" @remove="notifications.log('remove me')">I'm a tag</x-tag>
  </div>
</template>

<script>
import { useNotifications } from '@indielayer/ui'

export default {
  setup() {
    const notifications = useNotifications('notifica')

    return {
      notifications,
    }
  },
}
</script>
