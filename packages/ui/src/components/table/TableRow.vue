<script lang="ts">
const validators = {
  verticalAlign: ['baseline','bottom','middle','text-bottom','text-top','top'],
}

export default { name: 'XTableRow', validators }
</script>

<script setup lang="ts">
import { computed, type PropType } from 'vue'

const props = defineProps({
  pointer: Boolean,
  striped: Boolean,
  verticalAlign: {
    type: String as PropType<'baseline' | 'bottom' | 'middle' | 'text-bottom' | 'text-top' | 'top'>,
    default: 'top',
    validator: (value: string) => validators.verticalAlign.includes(value),
  },
})

const alignClass = computed(() => {
  if (props.verticalAlign === 'baseline') return 'align-baseline'
  else if (props.verticalAlign === 'bottom') return 'align-bottom'
  else if (props.verticalAlign === 'middle') return 'align-middle'
  else if (props.verticalAlign === 'text-bottom') return 'align-text-bottom'
  else if (props.verticalAlign === 'text-top') return 'align-text-top'
  else if (props.verticalAlign === 'top') return 'align-top'

  return ''
})
</script>

<template>
  <tr
    :class="[
      striped ? 'odd:bg-gray-50 dark:odd:bg-gray-800' : 'border-b border-gray-200 dark:border-gray-700',
      {
        'hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer': pointer,
      },
      alignClass
    ]"
  >
    <slot></slot>
  </tr>
</template>
