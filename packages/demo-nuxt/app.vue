<template>
  <div class="flex items-center justify-center h-screen bg-[#001e26] dark text-[#accac8] flex-col">
    <div class="text-2xl">Welcome!</div>
    <div class="mt-6">Documentation links to get you started:</div>
    <div class="flex flex-col space-y-8 my-6 text-center">
      <x-link
        href="https://v3.nuxtjs.org/"
        color="emerald"
        shadow
        external
        target="_blank"
      >Nuxt 3</x-link>
      <x-link
        href="https://vuejs.org/"
        color="emerald"
        shadow
        external
        target="_blank"
      >Vue 3</x-link>
      <x-link
        href="https://indielayer.com/ui"
        color="emerald"
        shadow
        external
        target="_blank"
      >Indielayer UI</x-link>
    </div>
  </div>
</template>
