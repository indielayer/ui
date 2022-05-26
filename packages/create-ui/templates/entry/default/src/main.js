import { createApp } from 'vue'
import UI from '@indielayer/ui'
import App from './App.vue'

// css
import '@indielayer/ui/styles'
import './assets/base.css'

const app = createApp(App)

app.use(UI, { prefix: 'X' })

app.mount('#app')
