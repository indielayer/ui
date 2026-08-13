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
