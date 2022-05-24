<template>
  <x-popover align="left">
    <x-button>Click me to open popover</x-button>
    <template #content>
      <x-popover-container class="p-2">
        example
      </x-popover-container>
    </template>
  </x-popover>

  <x-popover align="right">
    <x-avatar class="cursor-pointer shadow mx-2" name="John Smith" />
    <template #content>
      <x-popover-container class="p-2">
        another one
      </x-popover-container>
    </template>
  </x-popover>
</template>
