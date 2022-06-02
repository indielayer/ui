<script setup>
import WelcomeItem from './WelcomeItem.vue'
</script>

<template>
  <WelcomeItem>
    <template #icon>
      <x-icon icon="documentation" />
    </template>
    <template #heading>Documentation</template>
    <x-link shadow color="emerald" target="_blank" href="https://indielayer.com/ui">Indielayer UI's documentation</x-link>
    and
    <x-link shadow color="emerald" target="_blank" href="https://vuejs.org/">Vue’s documentation</x-link>
    provides you with all information you need to get started.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <x-icon icon="tooling" />
    </template>
    <template #heading>Tooling</template>

    This project is served and bundled with
    <x-link shadow color="emerald" href="https://vitejs.dev/guide/features.html" target="_blank">Vite</x-link>. The recommended IDE
    setup is <x-link shadow color="emerald" href="https://code.visualstudio.com/" target="_blank">VSCode</x-link> +
    <x-link shadow color="emerald" href="https://github.com/johnsoncodehk/volar" target="_blank">Volar</x-link>.
  </WelcomeItem>

  <WelcomeItem>
    <template #icon>
      <x-icon icon="ecosystem" />
    </template>
    <template #heading>Ecosystem</template>

    Some official tools and libraries for your project:
    <x-link shadow color="emerald" target="_blank" href="https://pinia.vuejs.org/">Pinia</x-link>,
    <x-link shadow color="emerald" target="_blank" href="https://router.vuejs.org/">Vue Router</x-link>,
    <x-link shadow color="emerald" target="_blank" href="https://test-utils.vuejs.org/">Vue Test Utils</x-link>, and
    <x-link shadow color="emerald" target="_blank" href="https://github.com/vuejs/devtools">Vue Dev Tools</x-link>.
  </WelcomeItem>
</template>
