<script>
export default {
  setup() {
    return {
      docsMenu: [
        { to: '/getting-started', label: 'Getting Started', icon: 'book' },
        { to: '/typography', label: 'Typography', icon: 'type' },
        { to: '/colors', label: 'Colors', icon: 'palette' },
        { to: '/icons', label: 'Icons', icon: 'star' },
      ],
      components: [
        {
          label: 'Form',
          icon: 'edit',
          collapseIcon: 'chevron-down',
          expanded: true,
          items: [
            { to: '/component/button', label: 'Button' },
            { to: '/component/checkbox', label: 'Checkbox' },
            { to: '/component/form', label: 'Form' },
            { to: '/component/input', label: 'Input' },
            { to: '/component/radio', label: 'Radio' },
            { to: '/component/select', label: 'Select' },
            { to: '/component/slider', label: 'Slider' },
            { to: '/component/textarea', label: 'Textarea' },
            { to: '/component/toggle', label: 'Toggle' },
          ],
        },
        {
          label: 'UI',
          icon: 'cube',
          collapseIcon: 'chevron-down',
          expanded: true,
          items: [
            { to: '/component/alert', label: 'Alert' },
            { to: '/component/avatar', label: 'Avatar' },
            { to: '/component/badge', label: 'Badge' },
            { to: '/component/breadcrumbs', label: 'Breadcrumbs' },
            { to: '/component/card', label: 'Card' },
            { to: '/component/collapse', label: 'Collapse' },
            { to: '/component/container', label: 'Container' },
            { to: '/component/divider', label: 'Divider' },
            { to: '/component/drawer', label: 'Drawer' },
            { to: '/component/icon', label: 'Icon' },
            { to: '/component/image', label: 'Image' },
            { to: '/component/loader', label: 'Loader' },
            { to: '/component/link', label: 'Link' },
            { to: '/component/menu', label: 'Menu' },
            { to: '/component/modal', label: 'Modal' },
            { to: '/component/notifications', label: 'Notifications' },
            { to: '/component/pagination', label: 'Pagination' },
            { to: '/component/popover', label: 'Popover' },
            { to: '/component/progress', label: 'Progress' },
            { to: '/component/skeleton', label: 'Skeleton' },
            { to: '/component/spinner', label: 'Spinner' },
            { to: '/component/table', label: 'Table' },
            { to: '/component/tabs', label: 'Tabs' },
            { to: '/component/tag', label: 'Tag' },
            { to: '/component/tooltip', label: 'Tooltip' },
          ],
        },
        {
          label: 'Helpers',
          icon: 'wrench',
          collapseIcon: 'chevron-down',
          expanded: true,
          items: [
            { to: '/component/scroll', label: 'Scroll' },
            { to: '/component/spacer', label: 'Spacer' },
          ],
        },
      ],
    }
  },
}
</script>

<template>
  <div style="min-width: 240px;" class="pb-4">
    <div class="title text-overline text-sm font-light ml-6 mt-6 mb-4">Documentation</div>
    <x-menu
      :items="docsMenu"
      class="m-4"
      color="primary"
      filled
    />
    <x-divider class="px-4"/>
    <div class="title text-overline text-sm font-light ml-6 mt-6 mb-4">Components</div>
    <x-menu
      :items="components"
      class="m-4"
      color="primary"
      filled
    />
  </div>
</template>

<style lang="postcss" scoped>
ul {
  a {
    display: flex;
    align-items: center;
    padding: 6px 21px;

    &:hover {
      @apply bg-secondary-200;
    }

    &.router-link-exact-active {
      @apply bg-secondary-300;
    }
  }

  &.inner {
    a {
      padding: 8px 32px;
    }
  }
}

.menu :deep(a) {
  padding: 8px 32px !important;
}

.dark {
  ul {
    a {
      &:hover {
        @apply bg-secondary-600;
      }

      &.router-link-exact-active {
        @apply bg-secondary-500;
      }
    }
  }
}
</style>
