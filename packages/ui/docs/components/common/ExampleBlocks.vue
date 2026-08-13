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
let audioContext: AudioContext | null = null
let masterGain: GainNode | null = null
let sequencerStep = 0

const BPM = 128
const STEPS_PER_BAR = 16
const KICK_PATTERN = [1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 1, 0, 1, 0, 0, 0]
const HAT_PATTERN = [0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0]
const BASS_PATTERN = [0, 7, 0, 10, 0, 7, 0, 5, 0, 7, 0, 10, 0, 7, 0, 3]

function ensureAudioEngine() {
  if (audioContext) return
  const Context = window.AudioContext || (window as Window & { webkitAudioContext?: typeof AudioContext; }).webkitAudioContext

  if (!Context) return

  audioContext = new Context()
  masterGain = audioContext.createGain()
  masterGain.gain.value = 0.2
  masterGain.connect(audioContext.destination)
}

function triggerKick(time: number) {
  if (!audioContext || !masterGain) return
  const osc = audioContext.createOscillator()
  const gain = audioContext.createGain()

  osc.type = 'sine'
  osc.frequency.setValueAtTime(140, time)
  osc.frequency.exponentialRampToValueAtTime(48, time + 0.12)
  gain.gain.setValueAtTime(0.001, time)
  gain.gain.exponentialRampToValueAtTime(0.9, time + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.12)
  osc.connect(gain).connect(masterGain)
  osc.start(time)
  osc.stop(time + 0.13)
}

function triggerHat(time: number) {
  if (!audioContext || !masterGain) return
  const bufferSize = Math.floor(audioContext.sampleRate * 0.03)
  const buffer = audioContext.createBuffer(1, bufferSize, audioContext.sampleRate)
  const channel = buffer.getChannelData(0)

  for (let i = 0; i < bufferSize; i += 1) {
    channel[i] = (Math.random() * 2 - 1) * (1 - i / bufferSize)
  }

  const source = audioContext.createBufferSource()
  const bandPass = audioContext.createBiquadFilter()
  const gain = audioContext.createGain()

  source.buffer = buffer
  bandPass.type = 'highpass'
  bandPass.frequency.value = 7000
  gain.gain.setValueAtTime(0.001, time)
  gain.gain.exponentialRampToValueAtTime(0.2, time + 0.004)
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.03)
  source.connect(bandPass).connect(gain).connect(masterGain)
  source.start(time)
  source.stop(time + 0.035)
}

function triggerBass(time: number, semitone: number) {
  if (!audioContext || !masterGain) return
  const osc = audioContext.createOscillator()
  const filter = audioContext.createBiquadFilter()
  const gain = audioContext.createGain()
  const baseHz = 55
  const frequency = baseHz * 2 ** (semitone / 12)

  osc.type = 'sawtooth'
  osc.frequency.setValueAtTime(frequency, time)
  filter.type = 'lowpass'
  filter.frequency.setValueAtTime(220, time)
  filter.Q.value = 5
  gain.gain.setValueAtTime(0.001, time)
  gain.gain.exponentialRampToValueAtTime(0.22, time + 0.01)
  gain.gain.exponentialRampToValueAtTime(0.001, time + 0.18)
  osc.connect(filter).connect(gain).connect(masterGain)
  osc.start(time)
  osc.stop(time + 0.2)
}

function tickSequencer() {
  if (!audioContext) return
  const step = sequencerStep % STEPS_PER_BAR
  const now = audioContext.currentTime
  const hitTime = now + 0.01

  if (KICK_PATTERN[step]) triggerKick(hitTime)
  if (HAT_PATTERN[step]) triggerHat(hitTime)
  const bassNote = BASS_PATTERN[step]

  if (bassNote > 0) triggerBass(hitTime, bassNote)

  slider.value = (slider.value + 1) % 100
  sequencerStep += 1
}

async function togglePlayer() {
  if (isPlaying.value) {
    if (interval) clearInterval(interval)
    interval = null
    masterGain?.gain.cancelScheduledValues(0)
    masterGain?.gain.setTargetAtTime(0.0001, audioContext?.currentTime ?? 0, 0.02)
  } else {
    ensureAudioEngine()
    if (!audioContext || !masterGain) return
    if (audioContext.state === 'suspended') {
      await audioContext.resume()
    }
    masterGain.gain.cancelScheduledValues(audioContext.currentTime)
    masterGain.gain.setTargetAtTime(0.2, audioContext.currentTime, 0.03)
    const stepMs = ((60 / BPM) / 4) * 1000

    interval = setInterval(tickSequencer, stepMs)
  }

  isPlaying.value = !isPlaying.value
}

onBeforeUnmount(() => {
  if (interval) clearInterval(interval)
  interval = null
  if (audioContext) {
    void audioContext.close()
    audioContext = null
    masterGain = null
  }
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
