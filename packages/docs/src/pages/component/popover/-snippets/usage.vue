<template>
  <x-popover align="left">
    <x-button>Click me to open popover</x-button>
    <template #content>
      <x-popover-container class="p-2">
        <x-popover-item @click="$toast.log('Hello')">
          Hello
        </x-popover-item>
        <x-divider class="my-2" />
        <x-popover-item @click="$toast.success('Success')">
          <template #prefix>
            <x-icon icon="check"/>
          </template>
          Success
        </x-popover-item>
      </x-popover-container>
    </template>
  </x-popover>

  <x-popover align="right">
    <x-avatar class="cursor-pointer shadow mx-2" name="John Smith" />
    <template #content>
      <x-popover-container class="p-2">
        <x-popover-item @click="$toast.log('Signed out')">
          Sign Out
        </x-popover-item>
      </x-popover-container>
    </template>
  </x-popover>
</template>
