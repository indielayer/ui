<template>
  <div class="space-y-8 max-w-2xl">
    <section class="space-y-3">
      <p class="text-sm font-medium text-secondary-700 dark:text-secondary-300">
        Registry key
      </p>
      <p class="text-sm text-secondary-600 dark:text-secondary-400">
        Reference a name from your icons map.
      </p>
      <div class="flex items-center gap-3">
        <x-icon icon="github" size="lg" />
        <code class="text-xs">icon="github"</code>
      </div>
    </section>

    <section class="space-y-3">
      <p class="text-sm font-medium text-secondary-700 dark:text-secondary-300">
        Full SVG string
      </p>
      <p class="text-sm text-secondary-600 dark:text-secondary-400">
        Paste a complete <code class="text-xs">&lt;svg&gt;</code> element; attributes are applied automatically.
      </p>
      <div class="flex items-center gap-3">
        <x-icon icon="fullsvg" size="lg" class="text-amber-500" />
        <code class="text-xs">icon="fullsvg"</code>
      </div>
    </section>

    <section class="space-y-3">
      <p class="text-sm font-medium text-secondary-700 dark:text-secondary-300">
        Raw path markup
      </p>
      <p class="text-sm text-secondary-600 dark:text-secondary-400">
        Pass path/polyline markup directly when the icon is not in the registry.
      </p>
      <div class="flex items-center gap-3">
        <x-icon icon="<polyline points=&quot;20 6 9 17 4 12&quot;></polyline>" size="lg" class="text-primary-500" />
        <code class="text-xs truncate max-w-[14rem]">&lt;polyline …&gt;</code>
      </div>
    </section>

    <section class="space-y-3">
      <p class="text-sm font-medium text-secondary-700 dark:text-secondary-300">
        Filled icons (object config)
      </p>
      <p class="text-sm text-secondary-600 dark:text-secondary-400">
        Use <code class="text-xs">{ icon, filled, viewBox }</code> in the registry for multi-color or filled shapes.
      </p>
      <div class="flex flex-wrap items-center gap-6">
        <div class="flex items-center gap-2">
          <x-icon icon="vue" size="lg" />
          <span class="text-xs text-secondary-500">vue</span>
        </div>
        <div class="flex items-center gap-2">
          <x-icon icon="nuxt" size="lg" />
          <span class="text-xs text-secondary-500">nuxt</span>
        </div>
        <div class="flex items-center gap-2">
          <x-icon icon="play" size="lg" class="text-primary-600" />
          <span class="text-xs text-secondary-500">play</span>
        </div>
      </div>
    </section>
  </div>
</template>
