<template>
  <div class="flex justify-items-center items-center py-2 text-gray-500 dark:text-gray-300 px-4">
    <toolbar-color-toggle />
    <x-spacer/>
    <a target="_blank" class="mx-4" href="https://twitter.com/indielayer"><x-icon icon="twitter"/></a>
    <a target="_blank" href="https://github.com/indielayer"><x-icon icon="github"/></a>
  </div>
</template>

<script>
import ToolbarColorToggle from './ToolbarColorToggle.vue'

export default {
  components: {
    ToolbarColorToggle,
  },
}
</script>
