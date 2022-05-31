import { createApp } from 'vue'
import { createPinia } from 'pinia'
import UI from '@indielayer/ui'
import App from './App.vue'
import router from './router'

// css
import '@indielayer/ui/styles'
import './assets/base.css'

// plugins
import Icons from './plugins/icons'

const app = createApp(App)

app.use(UI, { prefix: 'X' })
app.use(createPinia())
app.use(router)
app.use(Icons)

app.mount('#app')
