<script setup lang="ts">
import { inject, ref, unref, watch } from 'vue'
import { version, type UITheme } from '@indielayer/ui'
import ToolbarSearch from './ToolbarSearch.vue'

const selectTheme = inject('selectTheme', {
  theme: {} as UITheme,
  themes: [],
  setTheme(key: string) {},
})

const selected = ref(unref(selectTheme.theme).name)

const options = selectTheme.themes.map((t: any) => ({
  value: t.name, label: t.name,
}))

watch(selected, (val) => {
  if (val) {
    selectTheme.setTheme(val)
  }
})

const isDev = import.meta.env.DEV
</script>

<template>
  <x-container fluid class="bg-white dark:bg-secondary-800">
    <div class="flex justify-items-center items-center py-2 min-h-[54px]">
      <a href="/" class="flex items-center">
        <img src="@/assets/images/logo_mini.svg" width="26" alt="Indielayer"/>
        <x-divider vertical class="!h-[24px] mx-3"/>
        <img class="logo-dark" src="@/assets/images/logo_word.svg" width="120" alt="Indielayer UI"/>
        <img class="logo-white" src="@/assets/images/logo_word_dark.svg" width="120" alt="Indielayer UI"/>

        <div class="flex items-center text-xs tracking-widest">
          <div class="pl-2 font-bold text-primary-500">UI</div>
        </div>
      </a>

      <x-spacer/>

      <div class="flex items-center font-semibold text-sm">
        <toolbar-search />
        <x-divider vertical class="!h-2 px-2"/>
        <div class="tracking-wide text-xs">v{{ version }}</div>
        <x-divider vertical class="!h-2 px-2 hidden sm:flex"/>
        <x-link
          href="https://github.com/indielayer/ui"
          target="_blank"
          external
          class="hidden sm:block"
        >Github</x-link>
      </div>
    </div>
  </x-container>
</template>

<style lang="postcss">
.logo-white {
  display: none;
}

html.dark .logo-white {
  display: block;
}

html.dark .logo-dark {
  display: none;
}
</style>
