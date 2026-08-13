import { createApp } from 'vue'
import { createUI, BaseTheme } from '@indielayer/ui'
import App from './App.vue'
import './main.css'

const app = createApp(App)

const UI = createUI({
  theme: BaseTheme,
})

app.use(UI)

app.mount('#app')
