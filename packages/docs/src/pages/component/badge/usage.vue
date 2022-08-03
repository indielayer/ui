<template>
  <div class="grid grid-cols-2 md:grid-cols-4 gap-4">
    <x-badge color="pink" outlined size="lg" animated>
      <x-button color="pink" outlined light size="xl">Notifications</x-button>
    </x-badge>

    <x-badge
      color="pink"
      outlined
      animated
      offset-x="-12"
      offset-y="-10"
    >
      Text Example
    </x-badge>

    <x-badge color="indigo" position="top" align="right">
      <x-button color="indigo" outlined light>Updates</x-button>
      <template #content>
        22323
      </template>
    </x-badge>

    <x-badge class="mx-2" align="left">
      <x-avatar name="John Smith" rounded />
      <template #content>
        7
      </template>
    </x-badge>
    <x-badge color="green" class="mx-2" outlined position="bottom">
      <x-avatar rounded />
    </x-badge>
    <x-badge
      color="green"
      class="mx-2"
      outlined
      position="bottom"
      align="left"
    >
      <x-avatar name="John Smith" rounded />
    </x-badge>
    <x-badge color="green" class="mx-2" size="xl" outlined>
      <x-avatar rounded size="xl" />
    </x-badge>

    <x-badge color="green" class="mx-2" outlined>
      <x-avatar name="John Smith" rounded />
    </x-badge>
  </div>
</template>
