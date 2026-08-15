# Image
Loads a remote image after preloading. Use a background on the wrapper for a visible placeholder until load completes.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| src | String |  | Image URL. Shows a transparent placeholder until the image loads. |

### Slots
- _(none)_

### Events
- _(none)_

### Demos
#### Usage
```vue
<template>
  <div class="inline-block rounded-lg overflow-hidden bg-secondary-200 dark:bg-secondary-800">
    <x-image
      src="https://picsum.photos/id/237/400/300"
      alt="Golden retriever sitting on a path"
      class="block w-full max-w-sm h-auto object-cover"
      width="400"
      height="300"
    />
  </div>
</template>
```

#### Sizing
```vue
<template>
  <div class="flex flex-wrap items-end gap-6">
    <div class="text-center space-y-2">
      <div class="rounded-md overflow-hidden bg-secondary-200 dark:bg-secondary-800">
        <x-image
          src="https://picsum.photos/id/106/120/120"
          alt="Thumbnail"
          class="block object-cover"
          width="120"
          height="120"
        />
      </div>
      <span class="text-xs text-secondary-500">120 × 120</span>
    </div>

    <div class="text-center space-y-2">
      <div class="rounded-md overflow-hidden bg-secondary-200 dark:bg-secondary-800">
        <x-image
          src="https://picsum.photos/id/106/200/150"
          alt="Card image"
          class="block object-cover"
          width="200"
          height="150"
        />
      </div>
      <span class="text-xs text-secondary-500">200 × 150</span>
    </div>

    <div class="text-center space-y-2">
      <div class="rounded-md overflow-hidden bg-secondary-200 dark:bg-secondary-800">
        <x-image
          src="https://picsum.photos/id/106/320/180"
          alt="Wide banner"
          class="block object-cover w-80 max-w-full"
          width="320"
          height="180"
        />
      </div>
      <span class="text-xs text-secondary-500">320 × 180</span>
    </div>
  </div>
</template>
```

#### States
```vue
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
```

HTML docs: https://indielayer.com/component/image
