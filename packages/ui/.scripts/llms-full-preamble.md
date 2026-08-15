## Quick Start

Indielayer UI is a Tailwind CSS UI component library for Vue.js 3 and Nuxt.js 3. Build and prototype fast web applications with a modern, accessible component set.

To quickly scaffold a new project, run:

```bash
pnpm create @indielayer/ui
```

This will launch the official Indielayer UI project scaffolding tool, with prompts for features like TypeScript, Vue 3, or Nuxt 3.

---

## Features

- 50+ accessible, customizable UI components
- Tailwind CSS v4 theme tokens (`@indielayer/ui/tailwind.css`)
- Vue 3 and Nuxt 3 support
- Tree-shakable: import only what you need
- Dark mode support
- TypeScript support
- Easy theming and icon customization
- First-class documentation and demos

---

## Installation

### 1. Install via package manager

```bash
npm install @indielayer/ui
# or
yarn add @indielayer/ui
# or
pnpm add @indielayer/ui
```

### 2. Setup Tailwind CSS v4

Indielayer UI requires Tailwind CSS v4 (Safari 16.4+, Chrome 111+, Firefox 128+). See the [Tailwind v4 Vite guide](https://tailwindcss.com/docs/installation/using-vite).

Import theme tokens in your app stylesheet (`src/assets/tailwind.css`):

```css
@import "tailwindcss";
@import "@indielayer/ui/tailwind.css";

@source "../../index.html";
@source "../**/*.{vue,js,ts}";
@source "../../node_modules/@indielayer/ui/{lib,src}/**/*";

@theme {
  --color-primary-500: var(--color-emerald-500);
  --color-secondary-500: var(--color-slate-500);
}
```

Use `@tailwindcss/postcss` in Vite (`css.postcss.plugins`) or Nuxt (`postcss.plugins`). The `tailwind.preset.js` export was removed in v2; see the [upgrade guide](https://tailwindcss.com/docs/upgrade-guide).

---

## Usage

### Load the UI in your project

#### Vue 3

```js
import { createApp } from 'vue'
import UI, { BaseTheme } from '@indielayer/ui'

const app = createApp(App)
app.use(UI, {
  theme: BaseTheme,
})
```

#### Nuxt 3

Install peer dependencies:

```bash
npm install @indielayer/ui @vueuse/core floating-vue @vuepic/vue-datepicker -D
```

Add the module to `nuxt.config.ts`:

```ts
export default defineNuxtConfig({
  modules: ['@indielayer/ui/nuxt'],
})
```

### Import components

```vue
<script setup>
import { XButton } from '@indielayer/ui'
</script>

<template>
  <x-button color="primary">Click me</x-button>
</template>
```

---

## Configuration

### Theme

Pass a theme object when installing the plugin:

```js
import UI, { BaseTheme, CarbonTheme } from '@indielayer/ui'

app.use(UI, { theme: CarbonTheme })
```

### Component defaults

Override default prop values globally:

```js
app.use(UI, {
  theme: BaseTheme,
  defaults: {
    Button: { size: 'sm', color: 'primary' },
    Input: { size: 'md' },
  },
})
```

---

## Customization

### Colors

Override CSS variables or Tailwind `@theme` tokens. See the [Colors](https://indielayer.com/colors) guide on the docs site.

### Icons

Register SVG paths globally:

```js
import UI, { BaseTheme } from '@indielayer/ui'
import { registerIcons } from '@indielayer/ui'

registerIcons({
  myIcon: '<path d="..." />',
})

app.use(UI, { theme: BaseTheme })
```

---

## Icons

Indielayer UI ships with a default icon set. Use `icon`, `icon-left`, or `icon-right` props on components such as Button, or render `<x-icon icon="name" />`.

### Recommended SVG Icon Libraries
- [Icônes](https://icones.js.org/)
- [Hero Icons](https://heroicons.com/) (MIT)
- [Tabler Icons](https://tabler-icons.io/) (MIT)
- [Feather Icons](https://feathericons.com/) (MIT)

