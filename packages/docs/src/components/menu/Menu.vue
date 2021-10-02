<template>
  <div style="min-width: 240px;" class="pb-16">
    <ul>
      <li class="font-semibold">
        <x-link to="/getting-started" class="!py-4">
          <x-icon icon="book" class="mr-2"/>
          Getting Started
        </x-link>
      </li>
      <li class="font-semibold">
        <x-link to="/icons" class="!py-4">
          <x-icon icon="star" class="mr-2"/>
          Icons
        </x-link>
      </li>
    </ul>
    <x-divider/>
    <div>
      <div class="title text-overline text-sm font-light ml-6 mt-8 mb-4">Form Components</div>
      <ul class="inner font-semibold">
        <li><x-link to="/component/button">Button</x-link></li>
        <li><x-link to="/component/checkbox">Checkbox</x-link></li>
        <li><x-link to="/component/form">Form</x-link></li>
        <li><x-link to="/component/input">Input</x-link></li>
        <li><x-link to="/component/radio">Radio</x-link></li>
        <li><x-link to="/component/select">Select</x-link></li>
        <li><x-link to="/component/textarea">Textarea</x-link></li>
        <li><x-link to="/component/toggle">Toggle</x-link></li>
      </ul>
      <div class="title text-overline text-sm font-light ml-6 mt-8 mb-4">UI Components</div>
      <ul class="inner font-semibold">
        <li><x-link to="/component/avatar">Avatar</x-link></li>
        <li><x-link to="/component/card">Card</x-link></li>
        <li><x-link to="/component/collapse">Collapse</x-link></li>
        <li><x-link to="/component/container">Container</x-link></li>
        <li><x-link to="/component/divider">Divider</x-link></li>
        <li><x-link to="/component/icon">Icon</x-link></li>
        <li><x-link to="/component/link">Link</x-link></li>
        <li><x-link to="/component/modal">Modal</x-link></li>
        <li><x-link to="/component/note">Note</x-link></li>
        <li><x-link to="/component/pagination">Pagination</x-link></li>
        <li><x-link to="/component/popover">Popover</x-link></li>
        <li><x-link to="/component/progress">Progress</x-link></li>
        <li><x-link to="/component/skeleton">Skeleton</x-link></li>
        <li><x-link to="/component/spinner">Spinner</x-link></li>
        <li><x-link to="/component/statusdot">Statusdot</x-link></li>
        <li><x-link to="/component/table">Table</x-link></li>
        <li><x-link to="/component/tabs">Tabs</x-link></li>
        <li><x-link to="/component/tag">Tag</x-link></li>
        <li><x-link to="/component/toast">Toast</x-link></li>
        <li><x-link to="/component/tooltip">Tooltip</x-link></li>
      </ul>
    </div>
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
