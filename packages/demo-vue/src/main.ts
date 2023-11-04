import { createApp } from 'vue'
import { createUI } from '@indielayer/ui'
import App from './App.vue'
import './main.css'

const app = createApp(App)

const UI = createUI()

app.use(UI)

app.mount('#app')
