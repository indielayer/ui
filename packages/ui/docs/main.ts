import { ViteSSG } from 'vite-ssg'
import UI, { BaseTheme } from '@indielayer/ui'
import App from './App.vue'
import { routes, scrollBehavior } from './router'
import icons from './icons'

// global components
import CopyButton from './components/common/CopyButton.vue'
import CodeSnippet from './components/common/CodeSnippet.vue'
import MultiSnippet from './components/common/MultiSnippet.vue'
import CodePreview from './components/common/CodePreview.vue'
import DocumentPage from './components/common/DocumentPage.vue'
import DocsHero from './components/common/DocsHero.vue'
import DocsCopyPage from './components/common/DocsCopyPage.vue'

// css
import './assets/css/tailwind.css'

export const createApp = ViteSSG(
  App,
  {
    routes,
    scrollBehavior,
    base: import.meta.env.BASE_URL,
  },
  ({ app }) => {
    app.use(UI, {
      prefix: 'X',
      icons,
      theme: BaseTheme,
      defaults: {},
    })

    app.component('CopyButton', CopyButton)
    app.component('CodeSnippet', CodeSnippet)
    app.component('MultiSnippet', MultiSnippet)
    app.component('CodePreview', CodePreview)
    app.component('DocumentPage', DocumentPage)
    app.component('DocsHero', DocsHero)
    app.component('DocsCopyPage', DocsCopyPage)
  },
)
