<script lang="ts">
import { defineComponent, type PropType } from 'vue'

const validators = {
  verticalAlign: ['baseline','bottom','middle','text-bottom','text-top','top'],
}

export default defineComponent({
  validators,

  props: {
    pointer: Boolean,
    striped: Boolean,
    verticalAlign: {
      type: String as PropType<'baseline' | 'bottom' | 'middle' | 'text-bottom' | 'text-top' | 'top'>,
      default: 'top',
      validator: (value: string) => validators.verticalAlign.includes(value),
    },
  },
})
</script>

<template>
  <tr
    :class="[
      striped ? 'odd:bg-gray-50 dark:odd:bg-gray-800' : 'border-b border-gray-200 dark:border-gray-700',
      {
        'hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer': pointer,
        // vertical-align
        'align-baseline': verticalAlign === 'baseline',
        'align-bottom': verticalAlign === 'bottom',
        'align-middle': verticalAlign === 'middle',
        'align-text-bottom': verticalAlign === 'text-bottom',
        'align-text-top': verticalAlign === 'text-top',
        'align-top': verticalAlign === 'top',
      },
    ]"
  >
    <slot></slot>
  </tr>
</template>
