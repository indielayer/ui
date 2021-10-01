<a href="https://indielayer.com/">
  <img src="https://user-images.githubusercontent.com/3942799/90314498-25807a80-df0c-11ea-9e3a-b2b919bc9f10.png" alt="Indielayer" width="300" />
</a>

> Tools for creators.

## Indielayer UI

> [Tailwind CSS](https://tailwindcss.com) UI components for Vue.js 3. Build and prototype fast web applications.

> Based on the library https://github.com/lecoueyl/mijin, it's a port for Vue 3 with some extra components.

<!-- - [📖 Documentation](https://indielayer.com/ui) -->
> This library is still in development. It's pre-alpha for testing purposes and for Indielayer internal tools.

## Getting Started

> [tailwindcss](https://tailwindcss.com) version >= 2.0 must be already present in your application

### 1. Add `@indielayer/ui` dependency to your project

```bash
# using npm
npm install @indielayer/ui --save-dev
# using yarn
yarn add @indielayer/ui --dev
```

### 2. Add Indielayer UI Tailwind CSS preset `tailwind-preset.js` to your Tailwind CSS configuration file `tailwind.config.js` with the purge css configurations

```javascript
// tailwind.config.js
const indielayer = require('@indielayer/ui/tailwind.preset')

module.exports = {
  // load indielayer ui presets
  presets: [indielayer],
  // allow PurgeCSS to analyze components
  purge: {
    content: [
      'node_modules/@indielayer/ui/src/**/*.vue',
    ],
  },
};
```

### 3. Load the plugin in your vue application

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

<!-- [📖 &nbsp;Read more](https://indielayer.com/ui) -->
