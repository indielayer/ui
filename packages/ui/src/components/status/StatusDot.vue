<template>
  <component
    :is="$props.tag"
    v-bind="$attrs"
    class="inline-block relative h-3 w-3"
  >
    <div
      v-if="$props.animate"
      class="animate-ping absolute h-full w-full rounded-full opacity-75"
      :class="[
        {
          // status
          'bg-primary-400': $props.status === 'primary',
          'bg-error-400': $props.status === 'error',
          'bg-success-400': $props.status === 'success',
          'bg-warning-400': $props.status === 'warning',
        },
      ]"
    ></div>

    <div
      class="absolute rounded-full h-full w-full"
      :class="[
        {
          // status
          'bg-primary-500': $props.status === 'primary',
          'bg-error-500': $props.status === 'error',
          'bg-success-500': $props.status === 'success',
          'bg-warning-500': $props.status === 'warning',
        },
      ]"
    ></div>
  </component>
</template>

<script>
const validator = {
  status: [
    'primary',
    'error',
    'success',
    'warning',
  ],
}

export default {
  name: 'XStatusDot',

  validator,

  props: {
    animate: {
      type: Boolean,
      default: false,
    },

    status: {
      type: String,
      default: 'primary',
      validator: (value) => validator.status.includes(value),
    },

    tag: {
      type: String,
      default: 'div',
    },
  },
}
</script>
