<template>
  <div>
    <slot></slot>
    <x-collapse :expanded="expanded">
      <template #default="{ collapsed }">
        <div class="text-center hover:bg-gray-100 border-gray-200 dark:hover:bg-secondary-800 dark:border-secondary-700 p-2 my-4 border-t border-b">{{ collapsed ? 'Show Code' : 'Hide' }}</div>
      </template>
      <template #content>
        <code-snippet :code="code" :lang="lang"/>
      </template>
    </x-collapse>
  </div>
</template>

<script>
export default {
  props: {
    code: {
      type: String,
      default: '',
    },
    lang: {
      type: String,
      default: 'javascript',
    },
    expanded: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
