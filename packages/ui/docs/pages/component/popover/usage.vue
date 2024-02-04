<template>
  <div class="grid gap-4">
    <x-popover placement="top-start">
      <x-button>Click me to open popover</x-button>
      <template #content>
        <x-popover-container class="p-2">
          example
        </x-popover-container>
      </template>
    </x-popover>

    <x-popover>
      <x-avatar class="cursor-pointer shadow relative" name="John Smith" />
      <template #content>
        <x-popover-container class="p-2">
          another one
        </x-popover-container>
      </template>
    </x-popover>
  </div>
</template>
