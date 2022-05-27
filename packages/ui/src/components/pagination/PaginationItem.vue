<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useCommon } from '@/composables/common'

import XButton from '@/components/button/Button.vue'

export default defineComponent({
  name: 'XPaginationItem',

  components: {
    XButton,
  },

  validators: {
    ...useCommon.validators(),
  },

  props: {
    ...useCommon.props(),
    value: {
      type: Number,
      default: 0,
    },
    selected: Boolean,
    links: Boolean,
  },

  emits: ['input'],

  setup(props) {
    const classes = computed(() => {
      if (props.size === 'xs') return '!leading-none !p-1 min-w-[1.375rem]'
      else if (props.size === 'sm') return '!leading-none !p-2 min-w-[2rem]'
      else if (props.size === 'lg') return '!leading-none !p-3 min-w-[2.75rem]'
      else if (props.size === 'xl') return '!leading-none !p-4 min-w-[3.375rem]'

      return '!leading-none !p-2 min-w-[2.125rem]'
    })

    return {
      classes,
    }
  },
})
</script>

<template>
  <li>
    <x-button
      :to="links ? `?page=${value}` : undefined"
      :size="size"
      :class="classes"
      :outlined="!selected"
      :color="selected ? 'primary' : undefined"
      @click="!selected ? $emit('input', value) : null"
    >{{ value }}</x-button>
  </li>
</template>
