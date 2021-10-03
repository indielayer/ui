import { createRouter, createWebHistory } from 'vue-router'

// layouts
import DefaultLayout from './layouts/default.vue'
import SimpleLayout from './layouts/simple.vue'

// help
import HomePage from './pages/index.vue'
import IconsPage from './pages/icons.vue'

// components
import AvatarPage from './pages/component/avatar/index.vue'
import ButtonPage from './pages/component/button/index.vue'
import CardPage from './pages/component/card/index.vue'
import CheckboxPage from './pages/component/checkbox/index.vue'
import CollapsePage from './pages/component/collapse/index.vue'
import ContainerPage from './pages/component/container/index.vue'
import DividerPage from './pages/component/divider/index.vue'
import FormPage from './pages/component/form/index.vue'
import IconPage from './pages/component/icon/index.vue'
import InputPage from './pages/component/input/index.vue'
import LinkPage from './pages/component/link/index.vue'
import ModalPage from './pages/component/modal/index.vue'
import NotePage from './pages/component/note/index.vue'
import PaginationPage from './pages/component/pagination/index.vue'
import PopoverPage from './pages/component/popover/index.vue'
import ProgressPage from './pages/component/progress/index.vue'
import RadioPage from './pages/component/radio/index.vue'
import SelectPage from './pages/component/select/index.vue'
import SkeletonPage from './pages/component/skeleton/index.vue'
import SpinnerPage from './pages/component/spinner/index.vue'
import StatusdotPage from './pages/component/statusdot/index.vue'
import TablePage from './pages/component/table/index.vue'
import TabsPage from './pages/component/tabs/index.vue'
import TagPage from './pages/component/tag/index.vue'
import TextareaPage from './pages/component/textarea/index.vue'
import ToastPage from './pages/component/toast/index.vue'
import TogglePage from './pages/component/toggle/index.vue'
import TooltipPage from './pages/component/tooltip/index.vue'

const routes = [{
  path: '/',
  component: DefaultLayout,
  // component: () => import(/* webpackChunkName: "layout-default" */ '@/layouts/default.vue'),
  children: [{
    path: '',
    redirect: { name: 'getting-started' },
  }, {
    path: 'getting-started',
    name: 'getting-started',
    component: HomePage,
    // component: () => import(/* webpackChunkName: "page-getting-started" */ '@/pages/index.vue'),
  }, {
    path: 'icons',
    name: 'icons',
    component: IconsPage,
    // component: () => import(/* webpackChunkName: "page-icons" */ '@/pages/icons.vue'),
  }, {
    path: 'component',
    component: SimpleLayout,
    // component: () => import(/* webpackChunkName: "layout-component" */ '@/layouts/simple.vue'),
    children: [{
      path: 'avatar',
      name: 'avatar',
      component: AvatarPage,
      // component: () => import(/* webpackChunkName: "page-avatar" */ '@/pages/component/avatar/index.vue'),
    }, {
      path: 'button',
      name: 'button',
      component: ButtonPage,
      // component: () => import(/* webpackChunkName: "page-button" */ '@/pages/component/button/index.vue'),
    }, {
      path: 'card',
      name: 'card',
      component: CardPage,
      // component: () => import(/* webpackChunkName: "page-card" */ '@/pages/component/card/index.vue'),
    }, {
      path: 'checkbox',
      name: 'checkbox',
      component: CheckboxPage,
      // component: () => import(/* webpackChunkName: "page-checkbox" */ '@/pages/component/checkbox/index.vue'),
    }, {
      path: 'collapse',
      name: 'collapse',
      component: CollapsePage,
      // component: () => import(/* webpackChunkName: "page-collapse" */ '@/pages/component/collapse/index.vue'),
    }, {
      path: 'container',
      name: 'container',
      component: ContainerPage,
      // component: () => import(/* webpackChunkName: "page-container" */ '@/pages/component/container/index.vue'),
    }, {
      path: 'divider',
      name: 'divider',
      component: DividerPage,
      // component: () => import(/* webpackChunkName: "page-divider" */ '@/pages/component/divider/index.vue'),
    }, {
      path: 'form',
      name: 'form',
      component: FormPage,
      // component: () => import(/* webpackChunkName: "page-form" */ '@/pages/component/form/index.vue'),
    }, {
      path: 'icon',
      name: 'icon',
      component: IconPage,
      // component: () => import(/* webpackChunkName: "page-icon" */ '@/pages/component/icon/index.vue'),
    }, {
      path: 'input',
      name: 'input',
      component: InputPage,
      // component: () => import(/* webpackChunkName: "page-input" */ '@/pages/component/input/index.vue'),
    }, {
      path: 'link',
      name: 'link',
      component: LinkPage,
      // component: () => import(/* webpackChunkName: "page-link" */ '@/pages/component/link/index.vue'),
    }, {
      path: 'modal',
      name: 'modal',
      component: ModalPage,
      // component: () => import(/* webpackChunkName: "page-modal" */ '@/pages/component/modal/index.vue'),
    }, {
      path: 'note',
      name: 'note',
      component: NotePage,
      // component: () => import(/* webpackChunkName: "page-note" */ '@/pages/component/note/index.vue'),
    }, {
      path: 'pagination',
      name: 'pagination',
      component: PaginationPage,
      // component: () => import(/* webpackChunkName: "page-pagination" */ '@/pages/component/pagination/index.vue'),
    }, {
      path: 'popover',
      name: 'popover',
      component: PopoverPage,
      // component: () => import(/* webpackChunkName: "page-popover" */ '@/pages/component/popover/index.vue'),
    }, {
      path: 'progress',
      name: 'progress',
      component: ProgressPage,
      // component: () => import(/* webpackChunkName: "page-progress" */ '@/pages/component/progress/index.vue'),
    }, {
      path: 'radio',
      name: 'radio',
      component: RadioPage,
      // component: () => import(/* webpackChunkName: "page-radio" */ '@/pages/component/radio/index.vue'),
    }, {
      path: 'select',
      name: 'select',
      component: SelectPage,
      // component: () => import(/* webpackChunkName: "page-select" */ '@/pages/component/select/index.vue'),
    }, {
      path: 'skeleton',
      name: 'skeleton',
      component: SkeletonPage,
      // component: () => import(/* webpackChunkName: "page-skeleton" */ '@/pages/component/skeleton/index.vue'),
    }, {
      path: 'spinner',
      name: 'spinner',
      component: SpinnerPage,
      // component: () => import(/* webpackChunkName: "page-spinner" */ '@/pages/component/spinner/index.vue'),
    }, {
      path: 'statusdot',
      name: 'statusdot',
      component: StatusdotPage,
      // component: () => import(/* webpackChunkName: "page-statusdot" */ '@/pages/component/statusdot/index.vue'),
    }, {
      path: 'table',
      name: 'table',
      component: TablePage,
      // component: () => import(/* webpackChunkName: "page-table" */ '@/pages/component/table/index.vue'),
    }, {
      path: 'tabs',
      name: 'tabs',
      component: TabsPage,
      // component: () => import(/* webpackChunkName: "page-tabs" */ '@/pages/component/tabs/index.vue'),
    }, {
      path: 'tag',
      name: 'tag',
      component: TagPage,
      // component: () => import(/* webpackChunkName: "page-tag" */ '@/pages/component/tag/index.vue'),
    }, {
      path: 'textarea',
      name: 'textarea',
      component: TextareaPage,
      // component: () => import(/* webpackChunkName: "page-textarea" */ '@/pages/component/textarea/index.vue'),
    }, {
      path: 'toast',
      name: 'toast',
      component: ToastPage,
      // component: () => import(/* webpackChunkName: "page-toast" */ '@/pages/component/toast/index.vue'),
    }, {
      path: 'toggle',
      name: 'toggle',
      component: TogglePage,
      // component: () => import(/* webpackChunkName: "page-toggle" */ '@/pages/component/toggle/index.vue'),
    }, {
      path: 'tooltip',
      name: 'tooltip',
      component: TooltipPage,
      // component: () => import(/* webpackChunkName: "page-tooltip" */ '@/pages/component/tooltip/index.vue'),
    }],
  }],
}]

const router = createRouter({
  history: createWebHistory('/ui/'),
  routes,
})

export default router
