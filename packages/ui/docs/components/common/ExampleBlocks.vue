<script setup lang="ts">
import { onBeforeUnmount, ref } from 'vue'

/** Generic silhouette placeholder (no external image). */
const exampleAvatar =
  'data:image/svg+xml,' + encodeURIComponent(
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 80 80" role="img" aria-label="Placeholder avatar">'
    + '<rect width="80" height="80" fill="#0f766e"/>'
    + '<circle cx="40" cy="28" r="14" fill="#ccfbf1"/>'
    + '<ellipse cx="40" cy="88" rx="32" ry="36" fill="#ccfbf1"/>'
    + '</svg>',
  )

const TRACKS = [
  { title: 'Neon Gridlock', artist: 'VOIDRUNNER' },
  { title: 'Pulsewidth 303', artist: 'KryoTek Unit' },
  { title: 'Sub-Basement FM', artist: 'Driftvector' },
  { title: 'Chrome & Concrete', artist: 'Null Sector' },
  { title: '4AM Warehouse', artist: 'Phase-Locked Loop' },
  { title: 'Resonant Cage', artist: 'Hexaflux' },
  { title: 'Dry Ice Protocol', artist: 'Tin Manifold' },
  { title: 'BPM 128 (Locked)', artist: 'Cyanline' },
  { title: 'Ghost in the Mixer', artist: 'Modul_8' },
  { title: 'Afterhours Telemetry', artist: 'NØVA CACHE' },
] as const

const nowPlaying = ref(TRACKS[Math.floor(Math.random() * TRACKS.length)]!)

const selected = ref('A')
const options = [{
  value: 'A',
  label: 'Option A',
}, {
  value: 'B',
  label: 'Option B',
}]
const toggle = ref(false)
const tab = ref('A')
const radio = ref('a')
const password = ref('')
const slider = ref(80)
const isPlaying = ref(false)
let interval: ReturnType<typeof setInterval> | null = null

function togglePlayer() {
  if (isPlaying.value) {
    if (interval) clearInterval(interval)
    interval = null
  } else {
    interval = setInterval(() => {
      slider.value += 1
    }, 1000)
  }

  isPlaying.value = !isPlaying.value
}

onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
})
</script>

<template>
  <div class="grid gap-6 grid-cols-1 xl:grid-cols-2 max-w-4xl">
    <div>
      <div class="flex items-center">
        <x-button-group>
          <x-button icon="menu-alt-1"/>
          <x-button icon="menu"/>
          <x-button icon="menu-alt-3"/>
        </x-button-group>

        <x-spacer/>

        <x-select
          v-model="selected"
          :options="options"
          placeholder="Placeholder"
          class="w-64 ml-2"
          hide-footer
        />
      </div>
      <x-card class="p-4 flex items-center mt-4">
        <x-badge outlined position="bottom">
          <x-avatar :image="exampleAvatar" rounded/>
        </x-badge>
        <div class="ml-4">
          <div class="font-bold">John Smith</div>
          <div class="text-gray-400 text-sm">jsmith@indielayer.com</div>
        </div>
      </x-card>
      <div class="flex space-x-2 mt-4">
        <x-toggle v-model="toggle"/>
        <x-spacer/>
        <x-tag rounded size="sm" :color="toggle ? 'primary' : undefined">{{ toggle ? 'Active' : 'Inactive' }}</x-tag>
      </div>
      <div class="mt-4">
        <div class="grid grid-cols-3 gap-2">
          <x-button color="primary">Filled</x-button>
          <x-button color="primary" outlined>Outlined</x-button>
          <x-button color="primary" light>Light</x-button>
        </div>
      </div>
      <x-card flat class="border mt-4">
        <div class="p-2 flex items-center">
          <x-avatar :image="exampleAvatar" size="lg"/>
          <div class="ml-4">
            <div class="font-bold">{{ nowPlaying.title }}</div>
            <div class="text-gray-400 text-sm">{{ nowPlaying.artist }}</div>
          </div>
        </div>
        <x-divider/>
        <div class="p-6">
          <div class="flex items-center justify-center mb-6">
            <x-button icon="rewind" ghost rounded/>
            <x-button
              :icon="isPlaying ? 'pause' : 'play'"
              rounded
              size="lg"
              class="mx-2"
              @click="togglePlayer"
            />
            <x-button icon="forward" ghost rounded/>
          </div>
          <x-slider v-model="slider" class="w-full">
            <template #prefix>
              <div class="w-12 text-sm text-left">3:26</div>
            </template>
            <template #suffix>
              <div class="w-12 text-sm text-right">4:12</div>
            </template>
          </x-slider>
        </div>
      </x-card>
    </div>
    <div>
      <x-tab-group v-model="tab" grow variant="block">
        <x-tab label="Profile" value="A"/>
        <x-tab label="Settings" value="B"/>
        <x-tab label="Content" value="C"/>
      </x-tab-group>
      <div class="mt-3 mb-1">
        <x-radio
          v-model="radio"
          value="a"
          label="Credit card"
          class="border p-3 rounded w-full"
          :class="{ 'bg-emerald-50 dark:bg-gray-800 border-emerald-400 dark:border-emerald-800': radio === 'a'}"
        >
          <div class="text-gray-400 font-light text-sm">VISA · · · · 2592</div>
        </x-radio>
      </div>
      <div>
        <x-radio
          v-model="radio"
          value="b"
          label="Bank account"
          class="border p-3 rounded w-full"
          :class="{ 'bg-emerald-50 dark:bg-gray-800 border-emerald-400 dark:border-emerald-800': radio === 'b'}"
        >
          <div class="text-gray-400 font-light text-sm">Santander · · · · 1580</div>
        </x-radio>
      </div>
      <div class="my-3">
        <x-alert type="success" color="success" outlined>User details updated!</x-alert>
      </div>
      <div>
        <x-form :auto-focus="false">
          <x-input label="Email" type="email" block/>
          <x-input
            v-model="password"
            label="Password"
            type="password"
            show-password-toggle
            block
          />
          <x-checkbox label="Keep me logged in"/>
        </x-form>
      </div>
    </div>
  </div>
</template>
