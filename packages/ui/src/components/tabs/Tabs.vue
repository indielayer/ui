<template>
  <component
    :is="tag"
    class="flex border-b border-gray-200 dark:border-gray-700 space-x-4"
  >
    <slot></slot>
  </component>
</template>

<script>
import { reactive, computed, provide } from 'vue'

export default {
  name: 'XTabs',

  props: {
    modelValue: {
      type: [String, Number],
      default: null,
    },
    tag: {
      type: String,
      default: 'ul',
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const state = reactive({
      active: computed(() => props.modelValue),
    })

    provide('tabs', {
      state,
      activateTab,
    })

    function activateTab(tab) {
      emit('update:modelValue', tab)
    }
  },
}
</script>
