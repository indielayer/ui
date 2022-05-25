<a href="https://indielayer.com/">
  <img src="https://user-images.githubusercontent.com/3942799/90314498-25807a80-df0c-11ea-9e3a-b2b919bc9f10.png" alt="Indielayer" width="300" />
</a>

> Tools for creators.

## Indielayer UI

> [Tailwind CSS](https://tailwindcss.com) UI components for Vue.js 3 / Nuxt.js 3. Build and prototype fast web applications.

- [📖 Documentation](https://indielayer.com/ui)

## Getting Started

> [tailwindcss](https://tailwindcss.com) version >= 3.0 must be already present in your application

#### 1. Add `@indielayer/ui` dependency to your project

```bash
# using npm
npm install @indielayer/ui --save-dev
# using yarn
yarn add @indielayer/ui --dev
```

#### 2. Add Indielayer UI Tailwind CSS preset `tailwind-preset.js` to your Tailwind CSS configuration file `tailwind.config.js` with the purge css configurations

```javascript
// tailwind.config.js
const indielayer = require('@indielayer/ui/tailwind.preset')

module.exports = {
  // load indielayer ui presets
  presets: [indielayer()],
  // allow PurgeCSS to analyze components
  content: [
    'node_modules/@indielayer/ui/**/*',
    './src/**/*.vue',
  ],
};
```

### 3. Load the plugin
#### Load the plugin in your Vue 3 application

```javascript
import { createApp } from 'vue'
import UI from '@indielayer/ui'

const app = createApp(App)

app.use(UI, { prefix: 'X' })

// or
import {
  Input,
  Button,
  // ...
} from '@indielayer/ui'

app.component('XButton', Button)
app.component('XInput', Input)
```

#### Load the module in your Nuxt 3 application

```javascript
import { defineNuxtConfig } from 'nuxt'

export default defineNuxtConfig({
  css: ["~/assets/css/tailwind.css"],
  modules: [
    '@indielayer/ui/nuxt'
  ],
  build: {
    postcss: {
      postcssOptions: {
        plugins: {
          'tailwindcss/nesting': {},
          tailwindcss: {},
          autoprefixer: {},
        },
      },
    },
  },
})
```

[📖 &nbsp;Read more](https://indielayer.com/ui)
