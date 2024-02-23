<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <x-checkbox disabled label="Disabled" />
    <x-checkbox helper="Helper text">Helper</x-checkbox>
    <x-checkbox loading>Loading</x-checkbox>
    <x-checkbox indeterminate>Indeterminate</x-checkbox>
    <x-checkbox error="Invalid input">Error</x-checkbox>
  </div>
</template>
