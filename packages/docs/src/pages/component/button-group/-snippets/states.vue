<template>
  <div class="grid grid-cols-4 gap-4">
    <x-button-group color="indigo" outlined disabled>
      <x-button>left</x-button>
      <x-button>middle</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="indigo" outlined>
      <x-button loading>left</x-button>
      <x-button>middle</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="indigo" outlined>
      <x-button disabled>left</x-button>
      <x-button>middle</x-button>
      <x-button>right</x-button>
    </x-button-group>
  </div>
</template>
