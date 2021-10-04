import { createRouter, createWebHistory } from 'vue-router'

// layouts
import DefaultLayout from './layouts/default.vue'
import SimpleLayout from './layouts/simple.vue'

// help
import HomePage from './pages/index.vue'
import IconsPage from './pages/icons.vue'

const pages = import.meta.globEager('./pages/component/*/index.vue')

const componentPages = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages\/component\/(.*)\/index\.vue$/)[1].toLowerCase()

  return {
    path: name,
    component: pages[path].default,
  }
})

const routes = [{
  path: '/',
  component: DefaultLayout,
  children: [{
    path: '',
    redirect: { name: 'getting-started' },
  }, {
    path: 'getting-started',
    name: 'getting-started',
    component: HomePage,
  }, {
    path: 'icons',
    name: 'icons',
    component: IconsPage,
  }, {
    path: 'component',
    component: SimpleLayout,
    children: componentPages,
  }],
}]

const router = createRouter({
  history: createWebHistory('/ui/'),
  routes,
})

export default router
