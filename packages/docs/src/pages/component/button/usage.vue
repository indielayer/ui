<template>
  <div class="grid gap-4 grid-cols-4">
    <x-button>Default</x-button>
    <x-button color="primary" icon="smile" icon-right="star">Submit</x-button>
    <x-button color="primary" light>Light</x-button>
    <x-button color="primary" ghost>Ghost</x-button>
    <x-button color="primary" outlined>Outlined</x-button>
    <x-button color="primary" disabled loading loading-label="Uploading..">Loading</x-button>
    <x-button color="primary" rounded>filled Rounded</x-button>
    <x-button color="primary" light outlined>light + outlined</x-button>
  </div>
</template>
