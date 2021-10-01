<template>
  <tr
    class="border-b border-gray-200 dark:border-gray-700"
    :class="[
      {
        'hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer': clickable,
        // vertical-align
        'align-baseline': verticalAlign === 'baseline',
        'align-bottom': verticalAlign === 'bottom',
        'align-middle': verticalAlign === 'middle',
        'align-text-bottom': verticalAlign === 'text-bottom',
        'align-text-top': verticalAlign === 'text-top',
        'align-top': verticalAlign === 'top',
      },
    ]"
    v-bind="$attrs"
  >
    <slot></slot>
  </tr>
</template>

<script>
const validator = {
  verticalAlign: [
    'baseline',
    'bottom',
    'middle',
    'text-bottom',
    'text-top',
    'top',
  ],
}

export default {
  name: 'XTableRow',

  validator,

  props: {
    clickable: {
      type: Boolean,
      default: false,
    },

    verticalAlign: {
      type: String,
      default: 'top',
      validator: (value) => validator.verticalAlign.includes(value),
    },
  },
}
</script>
