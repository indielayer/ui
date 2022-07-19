<template>
  <div class="grid gap-4 grid-cols-4">
    <x-button >Default</x-button>
    <x-button light color="primary">Light</x-button>
    <x-button ghost color="primary">Ghost</x-button>
    <x-button color="primary" outlined>Outlined</x-button>
    <x-button color="primary" >Filled</x-button>
    <x-button color="primary" rounded>filled Rounded</x-button>
    <x-button
      color="primary"
      loading
      outlined
      glow
    >Outlined + glow</x-button>
    <x-button color="primary" outlined>Outlined</x-button>
    <x-button color="primary" light>light + outlined</x-button>
    <x-button
      color="primary"

      glow
      light
      outlined
    >light + outlined + glow</x-button>
    <x-button
      color="primary"
      glow
      light
      outlined
    >light + outlined + glow + </x-button>
  </div>
</template>
