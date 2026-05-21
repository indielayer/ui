<script setup lang="ts">
const validSrc = 'https://picsum.photos/id/64/360/240'
const brokenSrc = 'https://invalid.example/image.jpg'
</script>

<template>
  <div class="grid gap-8 sm:grid-cols-2 max-w-2xl">
    <section class="space-y-2">
      <p class="text-sm font-medium text-secondary-700 dark:text-secondary-300">
        Loading
      </p>
      <p class="text-sm text-secondary-600 dark:text-secondary-400">
        A neutral background on the wrapper shows while the URL loads. The component swaps in
        <code class="text-xs">src</code> after <code class="text-xs">onload</code>.
      </p>
      <div class="rounded-lg overflow-hidden bg-secondary-200 dark:bg-secondary-800 w-[360px] max-w-full h-60">
        <x-image
          :src="validSrc"
          alt="Portrait loaded from remote URL"
          class="block w-full h-full object-cover"
          width="360"
          height="240"
        />
      </div>
    </section>

    <section class="space-y-2">
      <p class="text-sm font-medium text-secondary-700 dark:text-secondary-300">
        Failed load
      </p>
      <p class="text-sm text-secondary-600 dark:text-secondary-400">
        When the request fails, the image keeps a minimal fallback and the wrapper background remains visible.
      </p>
      <div class="rounded-lg overflow-hidden bg-secondary-200 dark:bg-secondary-800 w-[360px] max-w-full h-60 flex items-center justify-center">
        <x-image
          :src="brokenSrc"
          alt="Image failed to load"
          class="block w-full h-full object-cover"
          width="360"
          height="240"
        />
      </div>
    </section>
  </div>
</template>
