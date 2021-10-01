<template>
  <PreToolbar />
  <Toolbar class="shadow-sm z-10" />
  <div class="flex-1 flex overflow-hidden">
    <div class="min-h-full max-h-full overflow-y-auto bg-secondary-100 dark:bg-secondary-800">
      <Menu />
    </div>
    <router-view class="flex-1 overflow-y-scroll" />
  </div>
  <Cookies />
</template>

<script>
import PreToolbar from '@/components/toolbar/PreToolbar.vue'
import Toolbar from '@/components/toolbar/Toolbar.vue'
import Cookies from '@/components/Cookies.vue'
import Menu from '@/components/menu/Menu.vue'

export default {
  name: 'DefaultLayout',
  components: {
    PreToolbar,
    Toolbar,
    Cookies,
    Menu,
  },
}
</script>
