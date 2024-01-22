<script setup lang="ts">
import { inject, ref, unref, watch } from 'vue'
import { version, type UITheme } from '@indielayer/ui'

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
</script>

<template>
  <div class="bg-white dark:bg-secondary-700 px-4">
    <div class="flex justify-items-center items-center py-5">
      <a href="/" class="flex items-start">
        <img class="logo-dark" src="@/assets/images/logo.png" width="180" alt=""/>
        <img class="logo-white" src="@/assets/images/logo_white.png" width="180" alt=""/>
        <div class="px-2 text-overline font-bold">UI</div>
      </a>

      <x-spacer/>

      <div class="flex items-center font-semibold text-sm">
        <x-select v-model="selected" :options="options" hide-footer size="sm"/>
        <x-divider vertical style="height: 10px;" class="px-2"/>
        <div class="tracking-wide text-xs">v{{ version }}</div>
        <x-divider vertical style="height: 10px;" class="px-2"/>
        <x-link href="https://github.com/indielayer/ui" target="_blank" external>Github</x-link>
      </div>
    </div>
  </div>
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
