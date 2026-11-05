<script setup lang="ts">
import { computed, inject, ref, type Ref } from 'vue'
import { colors } from '@indielayer/ui'
import {
  getDocsPaletteInstallGuide,
  getSecondarySwatch,
  primaryPaletteKeys,
  secondaryPaletteKeys,
  type PrimaryPaletteKey,
  type SecondaryPaletteKey,
} from '../../utils/docsPalette'

type DocsPalette = {
  primaryKey: Ref<PrimaryPaletteKey>;
  secondaryKey: Ref<SecondaryPaletteKey>;
  setPrimary: (key: PrimaryPaletteKey) => void;
  setSecondary: (key: SecondaryPaletteKey) => void;
}

const docsPalette = inject<DocsPalette>('docsPalette')
const showGuide = ref(false)

const primary = computed({
  get: () => docsPalette?.primaryKey.value || 'emerald',
  set: (key: PrimaryPaletteKey) => docsPalette?.setPrimary(key),
})

const secondary = computed({
  get: () => docsPalette?.secondaryKey.value || 'slate',
  set: (key: SecondaryPaletteKey) => docsPalette?.setSecondary(key),
})

const primaryOptions = primaryPaletteKeys.map((key) => ({
  value: key,
  label: key,
  prefix: colors[key]?.[500],
}))

const secondaryLabels: Partial<Record<SecondaryPaletteKey, string>> = {
  'indigo-dark': 'indigo dark',
}

const secondaryOptions = secondaryPaletteKeys.map((key) => ({
  value: key,
  label: secondaryLabels[key] || key,
  prefix: getSecondarySwatch(key),
}))

const guide = computed(() => getDocsPaletteInstallGuide({
  primaryKey: primary.value,
  secondaryKey: secondary.value,
}))
</script>

<template>
  <div v-if="docsPalette" class="hidden md:flex items-center gap-1">
    <x-select
      v-model="primary"
      :options="primaryOptions"
      size="xs"
      class="w-[7.5rem]"
      aria-label="Primary palette"
    >
      <template #prefix="{ item }">
        <span
          class="inline-block size-2.5 rounded-full shrink-0 ring-1 ring-black/10 dark:ring-white/20"
          :style="{ backgroundColor: (item?.prefix as string) || colors[primary]?.[500] }"
        ></span>
      </template>
    </x-select>
    <x-select
      v-model="secondary"
      :options="secondaryOptions"
      size="xs"
      class="w-[8.5rem]"
      aria-label="Secondary palette"
    >
      <template #prefix="{ item }">
        <span
          class="inline-block size-2.5 rounded-full shrink-0 ring-1 ring-black/10 dark:ring-white/20"
          :style="{ backgroundColor: (item?.prefix as string) || getSecondarySwatch(secondary) }"
        ></span>
      </template>
    </x-select>
    <x-button
      ghost
      size="xs"
      icon-left="code"
      aria-label="How to use these colors in your app"
      title="Use these colors in your app"
      @click="showGuide = true"
    />

    <x-modal
      v-model="showGuide"
      title="Use these colors in your app"
      show-close
      backdrop
      size="lg"
      :has-actions="false"
    >
      <div class="space-y-5 text-sm">
        <p class="text-secondary-600 dark:text-secondary-400">
          Selected:
          <span class="font-medium text-secondary-900 dark:text-secondary-100">{{ guide.primaryKey }}</span>
          primary ·
          <span class="font-medium text-secondary-900 dark:text-secondary-100">{{ guide.secondaryKey }}</span>
          secondary
          <template v-if="guide.tintedSecondary">
            (dual light/dark surface scale)
          </template>
        </p>

        <div>
          <h3 class="text-base font-semibold mb-1">1. Theme colors (plugin)</h3>
          <p class="text-secondary-600 dark:text-secondary-400 mb-3">
            Pass palettes on install so <code class="text-xs">useColors()</code> and
            <code class="text-xs">color="primary"</code> resolve your scales.
          </p>
          <code-snippet lang="js" :code="guide.themeJs"/>
        </div>

        <div>
          <h3 class="text-base font-semibold mb-1">2. CSS channel tokens</h3>
          <p class="text-secondary-600 dark:text-secondary-400 mb-3">
            Component surfaces and Tailwind utilities from
            <code class="text-xs">@indielayer/ui/tailwind.css</code> read
            <code class="text-xs">--primary-color-*</code> /
            <code class="text-xs">--secondary-color-*</code> (RGB channels).
            Paste this into a global stylesheet after the theme styles so it overrides
            BaseTheme defaults (including dark secondary).
          </p>
          <code-snippet lang="css" :code="guide.cssVars"/>
        </div>

        <div class="rounded-md border border-secondary-200 dark:border-secondary-700 p-3 text-secondary-600 dark:text-secondary-400">
          <p class="font-medium text-secondary-900 dark:text-secondary-100 mb-1">Notes</p>
          <ul class="list-disc pl-5 space-y-1">
            <li>
              Toggle dark mode with <code class="text-xs">html.dark</code>
              (same as the docs sun/moon control).
            </li>
            <li>
              Keep <code class="text-xs">@import "@indielayer/ui/tailwind.css"</code>
              so <code class="text-xs">bg-primary-500</code> /
              <code class="text-xs">text-secondary-800</code> track these CSS vars.
            </li>
            <li v-if="guide.tintedSecondary">
              Tinted secondaries use a light scale on <code class="text-xs">:root</code>
              and a separate dark scale under <code class="text-xs">html.dark</code>
              (mirrors the docs preview).
            </li>
            <li>
              More detail:
              <x-link to="/colors" class="underline">Colors guide</x-link>.
            </li>
          </ul>
        </div>
      </div>
    </x-modal>
  </div>
</template>
