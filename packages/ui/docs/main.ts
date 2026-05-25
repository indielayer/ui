import { createApp } from 'vue'
import { createHead } from '@unhead/vue'
import UI, { BaseTheme } from '@indielayer/ui'
import App from './App.vue'
import router from './router'
import icons from './icons'

// global components
import CopyButton from './components/common/CopyButton.vue'
import CodeSnippet from './components/common/CodeSnippet.vue'
import MultiSnippet from './components/common/MultiSnippet.vue'
import CodePreview from './components/common/CodePreview.vue'
import DocumentPage from './components/common/DocumentPage.vue'
import DocsHero from './components/common/DocsHero.vue'

// css
import './assets/css/tailwind.css'

const app = createApp(App)
const head = createHead()

app.use(head)
app.use(UI, {
  prefix: 'X',
  icons,
  theme: BaseTheme,
  // defaults: {
  //   Alert: {
  //     outlined: true,
  //   },
  // },
})

app.use(router)

app.component('CopyButton', CopyButton)
app.component('CodeSnippet', CodeSnippet)
app.component('MultiSnippet', MultiSnippet)
app.component('CodePreview', CodePreview)
app.component('DocumentPage', DocumentPage)
app.component('DocsHero', DocsHero)

app.mount('#app')
