# Icon
Icons visually represent actions and concepts. Register SVG paths in a global map, then reference them by name on XIcon.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| filled | Boolean |  | Renders a filled icon instead of an outline stroke. |
| icon | String |  | Icon name from the injected icon set, or raw SVG path markup. |
| size | String Size | md | Control size. One of xs, sm, md, lg, xl. |
| viewBox | String | 0 0 24 24 | SVG viewBox when rendering path markup. |

### Slots
- _(none)_

### Events
- _(none)_

### Demos
#### Usage
```vue
<script setup lang="ts">
import { computed, ref } from 'vue'
import docsIcons from '../../../icons'

const query = ref('')

const iconNames = computed(() =>
  Object.keys(docsIcons).sort().filter((name) =>
    name.toLowerCase().includes(query.value.trim().toLowerCase()),
  ),
)
</script>

<template>
  <div class="space-y-6 max-w-3xl">
    <p class="text-sm text-secondary-600 dark:text-secondary-400">
      Icons below are loaded from
      <code class="text-xs bg-secondary-100 dark:bg-secondary-800 px-1 py-0.5 rounded">packages/ui/docs/icons.ts</code>
      and passed to <code class="text-xs bg-secondary-100 dark:bg-secondary-800 px-1 py-0.5 rounded">app.use(UI, { icons })</code>
      in the docs app. See the
      <x-link to="/icons" color="primary">Icons guide</x-link>
      to build your own set.
    </p>

    <x-input
      v-model="query"
      label="Filter icons"
      placeholder="Search by name…"
      clearable
      class="max-w-xs"
    />

    <div
      v-if="iconNames.length"
      class="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-6 lg:grid-cols-8 gap-2"
    >
      <div
        v-for="name in iconNames"
        :key="name"
        class="flex flex-col items-center gap-1.5 p-3 rounded-md border border-secondary-200 dark:border-secondary-700 bg-secondary-50/50 dark:bg-secondary-900/30"
        :title="name"
      >
        <x-icon :icon="name" size="lg" class="text-secondary-800 dark:text-secondary-200" />
        <span class="text-[10px] leading-tight text-secondary-500 dark:text-secondary-400 truncate w-full text-center">
          {{ name }}
        </span>
      </div>
    </div>

    <p v-else class="text-sm text-secondary-500">
      No icons match “{{ query }}”.
    </p>
  </div>
</template>
```

#### Formats
```vue
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
```

#### Variants
```vue
<template>
  <x-icon icon="smile" class="text-primary-500" />
  <x-icon icon="smile" class="text-amber-500" />

  <x-divider class="my-4"/>

  <div class="space-x-4">
    <x-icon icon="smile" size="xs"/>
    <x-icon icon="smile" size="sm"/>
    <x-icon icon="smile"/>
    <x-icon icon="smile" size="lg"/>
    <x-icon icon="smile" size="xl"/>
  </div>
</template>
```

HTML docs: https://indielayer.com/component/icon
