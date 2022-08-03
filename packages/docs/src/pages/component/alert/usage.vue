<template>
  <div class="space-y-4">
    <x-alert>Default</x-alert>
    <x-alert color="primary" outlined>Outlined</x-alert>
    <x-alert color="sky" type="info" light removable>Hello</x-alert>
    <x-alert color="error" outlined type="error" light>Error</x-alert>
    <x-alert color="warning" light type="warning" removable>Warning</x-alert>
    <x-alert
      color="emerald"
      type="success"
      glow
      light
      removable
      outlined
    >Success</x-alert>
    <x-alert color="emerald" type="success">Success</x-alert>
  </div>
</template>
