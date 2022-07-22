<template>
  <div class="grid grid-cols-3 gap-4">
    <x-button-group color="indigo">
      <x-button>left</x-button>
      <x-button>filled</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="indigo" outlined>
      <x-button>left</x-button>
      <x-button>outlined</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="indigo" rounded>
      <x-button>left</x-button>
      <x-button>rounded</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="indigo" ghost>
      <x-button>left</x-button>
      <x-button>ghost</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="indigo" light>
      <x-button>left</x-button>
      <x-button>light</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="indigo" light outlined>
      <x-button>light</x-button>
      <x-button>+</x-button>
      <x-button>outlined</x-button>
    </x-button-group>
  </div>

  <x-divider class="my-4"/>

  <div class="text-center space-x-2 space-y-2">
    <x-button-group color="indigo" size="xs">
      <x-button>left</x-button>
      <x-button>xs</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="indigo" size="sm">
      <x-button>left</x-button>
      <x-button>sm</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="indigo" size="md">
      <x-button>left</x-button>
      <x-button>md</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="indigo" size="lg">
      <x-button>left</x-button>
      <x-button>lg</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="indigo" size="xl">
      <x-button>left</x-button>
      <x-button>xl</x-button>
      <x-button>right</x-button>
    </x-button-group>
  </div>
</template>
