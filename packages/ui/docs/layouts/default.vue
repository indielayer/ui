<script setup lang="ts">
import { ref } from 'vue'
import PreToolbar from '../components/toolbar/PreToolbar.vue'
import Toolbar from '../components/toolbar/Toolbar.vue'
import DocsMenu from '../components/menu/DocsMenu.vue'

const drawer = ref(false)
</script>

<template>
  <pre-toolbar />
  <toolbar class="shadow z-10" @open-drawer="drawer = true" />
  <div class="lg:hidden border-b p-2">
    <x-button
      icon-left="menu"
      size="sm"
      ghost
      @click="drawer = true"
    >Menu</x-button>
  </div>
  <div class="flex-1 flex overflow-hidden">
    <x-drawer v-model="drawer" breakpoint="lg" width="220" class="border-r flex">
      <docs-menu class="flex-1" @close="drawer = false" />
    </x-drawer>
    <x-notifications inject-key="notifica">
      <div class="flex-1 overflow-y-scroll bg-secondary-50 dark:bg-gray-900">
        <x-container class="py-4 lg:py-8" tag="section">
          <router-view />
        </x-container>
      </div>
    </x-notifications>
  </div>
</template>
