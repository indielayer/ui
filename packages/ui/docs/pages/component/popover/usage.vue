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

    <x-button-group>
      <x-button icon="plus" tooltip="Add New">Add New</x-button>
      <x-popover>
        <x-button icon="chevron-down" tooltip="More Options"/>
        <template #content>
          <x-popover-container class="p-2">
            <x-button>Option 1</x-button>
            <x-button>Option 2</x-button>
            <x-button>Option 3</x-button>
          </x-popover-container>
        </template>
      </x-popover>
    </x-button-group>
  </div>
</template>
