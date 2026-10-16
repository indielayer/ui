<script setup lang="ts">
import { useNotifications } from '@indielayer/ui'

const notifications = useNotifications()
</script>

<template>
  <div class="grid gap-4">
    <x-alert>Default</x-alert>
    <x-alert color="primary" outlined>Outlined</x-alert>
    <x-alert color="primary" outlined light>Outlined</x-alert>
    <x-alert
      color="sky"
      type="info"
      light
      removable
      @remove="notifications?.log('remove')"
    >
      Hello
    </x-alert>
    <x-alert color="error" outlined type="error" light>Error</x-alert>
    <x-alert
      color="warning"
      light
      type="warning"
      removable
      @remove="notifications?.log('remove')"
    >
      Warning
    </x-alert>
    <x-alert
      color="emerald"
      type="success"
      glow
      light
      removable
      outlined
      @remove="notifications?.log('remove')"
    >
      Success
    </x-alert>
    <x-alert color="emerald" type="success">Success</x-alert>
  </div>
</template>
