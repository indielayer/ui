<template>
  <div class="grid gap-4 grid-cols-4">
    <x-button-group>
      <x-button>left</x-button>
      <x-button>middle</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group color="indigo">
      <x-button>left</x-button>
      <x-button>middle</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group outlined ghost color="indigo">
      <x-button>left</x-button>
      <x-button>middle</x-button>
      <x-button>right</x-button>
    </x-button-group>
    <x-button-group light outlined color="indigo">
      <x-button>left</x-button>
      <x-button>middle</x-button>
      <x-button>right</x-button>
    </x-button-group>
  </div>
  <div class="mt-2">
    <x-button-group color="sky" outlined light size="sm">
      <x-button>new</x-button>
      <x-button icon="chevron-down"/>
    </x-button-group>
  </div>
</template>
