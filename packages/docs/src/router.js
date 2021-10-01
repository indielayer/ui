import { createRouter, createWebHistory } from 'vue-router'

const routes = [{
  path: '/',
  component: () => import(/* webpackChunkName: "layout-default" */ '@/layouts/default.vue'),
  children: [{
    path: '',
    name: 'home',
    component: () => import(/* webpackChunkName: "page-home" */ '@/pages/index.vue'),
  }, {
    path: 'icons',
    name: 'icons',
    component: () => import(/* webpackChunkName: "page-icons" */ '@/pages/icons.vue'),
  }, {
    path: 'component',
    component: () => import(/* webpackChunkName: "layout-component" */ '@/layouts/simple.vue'),
    children: [{
      path: 'avatar',
      name: 'avatar',
      component: () => import(/* webpackChunkName: "page-avatar" */ '@/pages/component/avatar/index.vue'),
    }, {
      path: 'button',
      name: 'button',
      component: () => import(/* webpackChunkName: "page-button" */ '@/pages/component/button/index.vue'),
    }, {
      path: 'card',
      name: 'card',
      component: () => import(/* webpackChunkName: "page-card" */ '@/pages/component/card/index.vue'),
    }, {
      path: 'checkbox',
      name: 'checkbox',
      component: () => import(/* webpackChunkName: "page-checkbox" */ '@/pages/component/checkbox/index.vue'),
    }, {
      path: 'collapse',
      name: 'collapse',
      component: () => import(/* webpackChunkName: "page-collapse" */ '@/pages/component/collapse/index.vue'),
    }, {
      path: 'container',
      name: 'container',
      component: () => import(/* webpackChunkName: "page-container" */ '@/pages/component/container/index.vue'),
    }, {
      path: 'divider',
      name: 'divider',
      component: () => import(/* webpackChunkName: "page-divider" */ '@/pages/component/divider/index.vue'),
    }, {
      path: 'form',
      name: 'form',
      component: () => import(/* webpackChunkName: "page-form" */ '@/pages/component/form/index.vue'),
    }, {
      path: 'icon',
      name: 'icon',
      component: () => import(/* webpackChunkName: "page-icon" */ '@/pages/component/icon/index.vue'),
    }, {
      path: 'input',
      name: 'input',
      component: () => import(/* webpackChunkName: "page-input" */ '@/pages/component/input/index.vue'),
    }, {
      path: 'link',
      name: 'link',
      component: () => import(/* webpackChunkName: "page-link" */ '@/pages/component/link/index.vue'),
    }, {
      path: 'modal',
      name: 'modal',
      component: () => import(/* webpackChunkName: "page-modal" */ '@/pages/component/modal/index.vue'),
    }, {
      path: 'note',
      name: 'note',
      component: () => import(/* webpackChunkName: "page-note" */ '@/pages/component/note/index.vue'),
    }, {
      path: 'pagination',
      name: 'pagination',
      component: () => import(/* webpackChunkName: "page-pagination" */ '@/pages/component/pagination/index.vue'),
    }, {
      path: 'popover',
      name: 'popover',
      component: () => import(/* webpackChunkName: "page-popover" */ '@/pages/component/popover/index.vue'),
    }, {
      path: 'progress',
      name: 'progress',
      component: () => import(/* webpackChunkName: "page-progress" */ '@/pages/component/progress/index.vue'),
    }, {
      path: 'radio',
      name: 'radio',
      component: () => import(/* webpackChunkName: "page-radio" */ '@/pages/component/radio/index.vue'),
    }, {
      path: 'select',
      name: 'select',
      component: () => import(/* webpackChunkName: "page-select" */ '@/pages/component/select/index.vue'),
    }, {
      path: 'skeleton',
      name: 'skeleton',
      component: () => import(/* webpackChunkName: "page-skeleton" */ '@/pages/component/skeleton/index.vue'),
    }, {
      path: 'spinner',
      name: 'spinner',
      component: () => import(/* webpackChunkName: "page-spinner" */ '@/pages/component/spinner/index.vue'),
    }, {
      path: 'statusdot',
      name: 'statusdot',
      component: () => import(/* webpackChunkName: "page-statusdot" */ '@/pages/component/statusdot/index.vue'),
    }, {
      path: 'table',
      name: 'table',
      component: () => import(/* webpackChunkName: "page-table" */ '@/pages/component/table/index.vue'),
    }, {
      path: 'tabs',
      name: 'tabs',
      component: () => import(/* webpackChunkName: "page-tabs" */ '@/pages/component/tabs/index.vue'),
    }, {
      path: 'tag',
      name: 'tag',
      component: () => import(/* webpackChunkName: "page-tag" */ '@/pages/component/tag/index.vue'),
    }, {
      path: 'textarea',
      name: 'textarea',
      component: () => import(/* webpackChunkName: "page-textarea" */ '@/pages/component/textarea/index.vue'),
    }, {
      path: 'toast',
      name: 'toast',
      component: () => import(/* webpackChunkName: "page-toast" */ '@/pages/component/toast/index.vue'),
    }, {
      path: 'toggle',
      name: 'toggle',
      component: () => import(/* webpackChunkName: "page-toggle" */ '@/pages/component/toggle/index.vue'),
    }, {
      path: 'tooltip',
      name: 'tooltip',
      component: () => import(/* webpackChunkName: "page-tooltip" */ '@/pages/component/tooltip/index.vue'),
    }],
  }],
}]

const router = createRouter({
  history: createWebHistory('/ui/'),
  routes,
})

export default router
