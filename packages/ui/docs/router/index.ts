import { createRouter, createWebHistory, type RouteRecordRaw } from 'vue-router'

// layouts
import DefaultLayout from '../layouts/default.vue'
import SimpleLayout from '../layouts/simple.vue'

// help
import HomePage from '../pages/index.vue'
import IconsPage from '../pages/icons.vue'
import PlayPage from '../pages/play.vue'
import TypographyPage from '../pages/typography.vue'
import ColorsPage from '../pages/colors.vue'
import ErrorPage from '../pages/error.vue'

const pages: Record<string, any> = import.meta.glob('../pages/component/*/index.vue', { eager: true })

const componentPages: RouteRecordRaw[] = []

Object.keys(pages).forEach((path) => {
  const match = path.match(/\/pages\/component\/(.*)\/index\.vue$/)

  if (match) {
    const name = match[1].toLowerCase()

    componentPages.push({
      path: name,
      component: pages[path].default,
    })
  }
})

const routes: RouteRecordRaw[] = [{
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
}, {
  path: '/:pathMatch(.*)*',
  name: 'NotFound',
  component: ErrorPage,
}]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes,
  scrollBehavior(to, from, savedPosition) {
    const main = document.getElementById('main')

    if (to.hash) {
      return new Promise((resolve) => {
        setTimeout(() => {
          const el = document.querySelector(to.hash)

          if (el && main) {
            const top = (el as HTMLElement).offsetTop - 80

            main.scrollTo({ top, behavior: 'smooth' })
          }
          resolve({ el: to.hash, behavior: 'smooth', top: 80 })
        }, 100)
      })
    }

    if (savedPosition) {
      main?.scrollTo(savedPosition)

      return savedPosition
    }

    main?.scrollTo(0, 0)

    return { top: 0 }
  },
})

export default router
