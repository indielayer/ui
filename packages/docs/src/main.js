import { createApp } from 'vue'
import UI from '@indielayer/ui'
import App from './App.vue'
import router from './router'
import { store } from './store'

// plugins
import icons from './plugins/icons'
import toast from './plugins/toast'

// global components
import CopyButton from './components/common/CopyButton.vue'
import CodeSnippet from './components/common/CodeSnippet.vue'
import MultiSnippet from './components/common/MultiSnippet.vue'
import CodePreview from './components/common/CodePreview.vue'
import DocumentPage from './components/common/DocumentPage.vue'

// css
import './assets/css/tailwind.css'

const app = createApp(App)

app.use(router)
app.use(store)
app.use(icons)
app.use(toast)
app.use(UI, { prefix: 'X' })

app.component('CopyButton', CopyButton)
app.component('CodeSnippet', CodeSnippet)
app.component('MultiSnippet', MultiSnippet)
app.component('CodePreview', CodePreview)
app.component('DocumentPage', DocumentPage)

app.mount('#app')
