<template>
  <div class="space-x-2">
    <x-popover align="left">
      <x-button>Click me to open popover</x-button>
      <template #content>
        <x-popover-container class="p-2">
          example
        </x-popover-container>
      </template>
    </x-popover>

    <x-popover align="top" position="left">
      <x-avatar class="cursor-pointer shadow" name="John Smith" />
      <template #content>
        <x-popover-container class="p-2">
          another one
        </x-popover-container>
      </template>
    </x-popover>
  </div>
</template>
