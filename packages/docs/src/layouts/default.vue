<script setup lang="ts">
import { ref } from 'vue'
import PreToolbar from '@/components/toolbar/PreToolbar.vue'
import Toolbar from '@/components/toolbar/Toolbar.vue'
import Cookies from '@/components/Cookies.vue'
import DocsMenu from '@/components/menu/DocsMenu.vue'

const drawer = ref(false)
</script>

<template>
  <PreToolbar />
  <Toolbar class="border-y z-10" @open-drawer="drawer = true" />
  <div class="lg:hidden border-b p-2">
    <x-button
      icon-left="menu"
      size="sm"
      ghost
      @click="drawer = true"
    >Menu</x-button>
  </div>
  <div class="flex-1 flex overflow-hidden">
    <XDrawer v-model="drawer" breakpoint="lg" width="260" class="border-r">
      <DocsMenu />
    </XDrawer>
    <XNotifications inject-key="notifica">
      <router-view class="flex-1 overflow-y-scroll" />
    </XNotifications>
  </div>
  <Cookies />
</template>
