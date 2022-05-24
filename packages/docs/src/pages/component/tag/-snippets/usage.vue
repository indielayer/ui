<template>
  <div class="flex gap-4">
    <x-tag color="primary">Hello</x-tag>
    <x-tag color="amber">Amber</x-tag>
    <x-tag outlined>I'm a tag</x-tag>
    <x-tag removable @remove="notification.log('remove me')">I'm a tag</x-tag>
  </div>
</template>

<script>
import { useNotification } from '@indielayer/ui'

export default {
  setup() {
    const notification = useNotification()

    return {
      notification,
    }
  },
}
</script>
