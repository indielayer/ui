<template>
  <div>
    <x-button @click="left = !left">Toggle left</x-button>
    <x-button @click="right = !right">Toggle right</x-button>
    <x-button @click="bottom = !bottom">Toggle bottom</x-button>
    <x-button @click="top = !top">Toggle top</x-button>
    <x-drawer v-model="left">
      <template #header>
        <div class="border-b p-4 text-lg font-semibold">Header</div>
      </template>
      menu
      <template #footer>
        <div class="border-t p-4">
          <x-button color="pink" block light>Sign out</x-button>
        </div>
      </template>
    </x-drawer>
    <x-drawer v-model="right" position="right" width="100">
      content
    </x-drawer>
    <x-drawer v-model="bottom" position="bottom">
      content
    </x-drawer>
    <x-drawer v-model="top" position="top">
      content
    </x-drawer>
  </div>

  <x-button class="mt-10" @click="breakpoint = !breakpoint">Toggle breakpoint</x-button>
  <x-drawer v-model="breakpoint" position="left" breakpoint="md">
    drawer with breakpoint
  </x-drawer>

  <x-button class="mt-10" @click="contained = !contained">Toggle contained</x-button>
  <div id="container" ref="el" class="relative h-96 overflow-hidden bg-slate-50 dark:bg-slate-800 border rounded-md my-2">
    <x-drawer v-model="contained" position="left" to="#container">
      drawer with breakpoint
    </x-drawer>
  </div>

  <div style="height: 1000px;"></div>
</template>

<script>
import { ref } from 'vue'

export default {
  setup() {
    const top = ref(false)
    const left = ref(false)
    const right = ref(false)
    const bottom = ref(false)
    const breakpoint = ref(false)
    const contained = ref(false)
    const el = ref(null)

    return {
      el,
      top,
      left,
      right,
      bottom,
      breakpoint,
      contained,
    }
  },
}
</script>
