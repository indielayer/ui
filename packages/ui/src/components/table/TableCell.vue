<template>
  <td
    class="last:pr-0"
    :class="[
      {
        // density
        'py-1 pr-2': dense,
        'py-2 pr-4': !dense,
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

<script>
const validator = {
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

export default {
  name: 'XTableCell',

  validator,

  props: {
    textAlign: {
      default: null,
      type: String,
      validator: (value) => validator.textAlign.includes(value),
    },

    truncate: {
      default: false,
      type: Boolean,
    },

    dense: {
      default: false,
      type: Boolean,
    },

    fixed: {
      default: false,
      type: Boolean,
    },

    verticalAlign: {
      default: null,
      type: String,
      validator: (value) => validator.verticalAlign.includes(value),
    },
  },

  created() {
    if (this.truncate && !this.fixed) {
      console.warn('Table must have "fixed" property set to true when using TableCell "truncate" property')
    }
  },
}
</script>
