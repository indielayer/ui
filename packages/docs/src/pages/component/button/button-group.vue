<template>
  <div class="space-x-4">
    <x-button-group>
      <x-button>left</x-button>
      <x-button>middle</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="primary" light outlined>
      <x-button>left</x-button>
      <x-button>middle</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="indigo" outlined disabled>
      <x-button>left</x-button>
      <x-button loading>middle</x-button>
      <x-button>right</x-button>
    </x-button-group>
  </div>
</template>
