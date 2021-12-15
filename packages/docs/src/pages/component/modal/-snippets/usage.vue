<template>
  <x-modal ref="addModal" show-close>
    <div class="p-4 flex">Hello I'm a modal</div>
  </x-modal>

  <x-button size="lg" class="mr-2" @click="$refs.addModal.open()">Open modal</x-button>
</template>
