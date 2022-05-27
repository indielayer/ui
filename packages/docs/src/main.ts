import '@indielayer/ui/styles'
import { createApp } from 'vue'
import UI from '@indielayer/ui'
import App from './App.vue'
import router from './router'

// plugins
import icons from './plugins/icons'

// global components
import CopyButton from './components/common/CopyButton.vue'
import CodeSnippet from './components/common/CodeSnippet.vue'
import MultiSnippet from './components/common/MultiSnippet.vue'
import CodePreview from './components/common/CodePreview.vue'
import DocumentPage from './components/common/DocumentPage.vue'

// css
import './assets/css/tailwind.css'

const app = createApp(App)

// const UI = createUI({
//   prefix: 'X',
//   components: [XButton],
//   colors: {
//     primary: colors.amber,
//   },
// })

app.use(UI)

app.use(router)
app.use(icons)

app.component('CopyButton', CopyButton)
app.component('CodeSnippet', CodeSnippet)
app.component('MultiSnippet', MultiSnippet)
app.component('CodePreview', CodePreview)
app.component('DocumentPage', DocumentPage)

app.mount('#app')
