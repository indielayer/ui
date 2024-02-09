import { createApp } from 'vue'
import UI, { BaseTheme } from '@indielayer/ui'
import App from './App.vue'

// css
import './assets/base.css'

import icons from './icons'

const app = createApp(App)

app.use(UI, {
  prefix: 'X',
  icons,
  theme: BaseTheme
})

app.mount('#app')
