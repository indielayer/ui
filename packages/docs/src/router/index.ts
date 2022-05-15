import { createRouter, createWebHistory } from 'vue-router'

// layouts
import DefaultLayout from '@/layouts/default.vue'
import SimpleLayout from '@/layouts/simple.vue'

// help
import HomePage from '@/pages/index.vue'
import IconsPage from '@/pages/icons.vue'
import PlayPage from '@/pages/play.vue'
import TypographyPage from '@/pages/typography.vue'
import ColorsPage from '@/pages/colors.vue'

const pages = import.meta.globEager('@/pages/component/*/index.vue')

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
    path: 'typography',
    name: 'typography',
    component: TypographyPage,
  }, {
    path: 'colors',
    name: 'colors',
    component: ColorsPage,
  }, {
    path: 'component',
    component: SimpleLayout,
    children: componentPages,
  }],
}, {
  path: '/play',
  component: PlayPage,
}]

const router = createRouter({
  history: createWebHistory('/ui/'),
  routes,
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

export default router
