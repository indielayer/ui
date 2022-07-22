<template>
  <x-alert class="mb-4">Default</x-alert>
  <x-alert class="mb-4" color="primary" outlined>Outlined</x-alert>
  <x-alert
    class="mb-4"
    type="info"
    color="sky"
    light
    removable
  >Hello</x-alert>
  <x-alert
    class="mb-4"
    color="error"
    outlined
    type="error"
    light
  >Error</x-alert>
  <x-alert class="mb-4" light color="warning" type="warning">Warning</x-alert>
  <x-alert
    glow
    class="mb-4"
    light
    color="emerald"
    type="success"
    removable
  >Success</x-alert>
  <x-alert class="mb-4" color="emerald" type="success">Success</x-alert>
</template>
