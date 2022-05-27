<script lang="ts">
import { defineComponent } from 'vue'

const validators = {
  textAlign: [
    null,
    'left',
    'center',
    'right',
    'justify',
  ],
  verticalAlign: [
    null,
    'baseline',
    'bottom',
    'middle',
    'text-bottom',
    'text-top',
    'top',
  ],
}

export default defineComponent({
  name: 'XTableCell',

  validators,

  props: {
    textAlign: {
      type: String,
      validator: (value: string) => validators.textAlign.includes(value),
    },
    truncate: Boolean,
    dense: Boolean,
    fixed: Boolean,
    verticalAlign: {
      type: String,
      default: 'middle',
      validator: (value: string) => validators.verticalAlign.includes(value),
    },
  },

  setup(props) {
    if (props.truncate && !props.fixed) {
      console.warn('Table must have "fixed" property set to true when using TableCell "truncate" property')
    }
  },
})
</script>

<template>
  <td
    class="last:pr-0 px-3"
    :class="[
      {
        // density
        'py-2': dense,
        'py-4': !dense,
        // text-align
        'text-left': textAlign === 'left',
        'text-center': textAlign === 'center',
        'text-right': textAlign === 'right',
        'text-justify': textAlign === 'justify',
        // vertical-align
        'align-baseline': verticalAlign === 'baseline',
        'align-bottom': verticalAlign === 'bottom',
        'align-middle': verticalAlign === 'middle',
        'align-text-bottom': verticalAlign === 'text-bottom',
        'align-text-top': verticalAlign === 'text-top',
        'align-top': verticalAlign === 'top',
        // truncate
        'truncate': truncate && fixed,
      },
    ]"
  >
    <slot></slot>
  </td>
</template>
