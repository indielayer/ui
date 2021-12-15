<template>
  <div class="grid grid-cols-4 gap-4">
    <x-button color="emerald" glow>Glow</x-button>
    <x-button color="rose" glow>Subscribe</x-button>
    <x-button color="amber" glow>Get Started!</x-button>
    <x-button color="sky" glow>Let's go</x-button>

    <x-button color="emerald" outlined>Outlined</x-button>
    <x-button color="rose" outlined>Subscribe</x-button>
    <x-button color="amber" outlined>Get Started!</x-button>
    <x-button color="sky" outlined>Let's go</x-button>

    <x-button color="emerald" rounded>Rounded</x-button>
    <x-button color="rose" rounded>Subscribe</x-button>
    <x-button color="amber" rounded>Get Started!</x-button>
    <x-button color="sky" rounded>Let's go</x-button>
  </div>

  <x-divider class="my-4"/>

  <div class="text-center">
    <x-button class="mx-2" size="xs">xs</x-button>
    <x-button class="mx-2" size="sm">sm</x-button>
    <x-button class="mx-2">md</x-button>
    <x-button class="mx-2" size="lg">lg</x-button>
    <x-button class="mx-2" size="xl">xl</x-button>
  </div>
</template>
