<template>
  <div class="grid grid-cols-4 gap-4">
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

  <div class="text-center">
    <x-button-group color="indigo" size="xs" class="mx-2">
      <x-button>left</x-button>
      <x-button>xs</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="indigo" size="sm" class="mx-2">
      <x-button>left</x-button>
      <x-button>sm</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="indigo" size="md" class="mx-2">
      <x-button>left</x-button>
      <x-button>md</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="indigo" size="lg" class="mx-2">
      <x-button>left</x-button>
      <x-button>lg</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="indigo" size="xl" class="mx-2">
      <x-button>left</x-button>
      <x-button>xl</x-button>
      <x-button>right</x-button>
    </x-button-group>
  </div>
</template>
