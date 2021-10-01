<template>
  <div
    v-bind="$attrs"
    :class="[
      {
        'h-full flex-col': $props.vertical,
        'w-full': !$props.vertical
      },
    ]"
    class="flex justify-center items-center"
  >
    <div
      class="bg-gray-200 dark:bg-gray-600 flex-grow"
      :style="[
        {
          width: $props.vertical ? '1px' : 'auto',
          height: !$props.vertical ? '1px' : 'auto'
        }
      ]"
    ></div>
    <div
      v-if="$props.label"
      class="font-medium text-sm text-gray-600 dark:text-gray-300"
      :class="[{
        'my-2': $props.vertical,
        'mx-4': !$props.vertical
      }]"
      v-text="$props.label"
    ></div>
    <div
      class="bg-gray-200 dark:bg-gray-600 flex-grow"
      :style="[
        {
          width: $props.vertical ? '1px' : 'auto',
          height: !$props.vertical ? '1px' : 'auto'
        }
      ]"
    ></div>
  </div>
</template>

<script>
export default {
  name: 'XDivider',

  props: {
    label: {
      type: String,
      default: '',
    },
    vertical: {
      type: Boolean,
      default: false,
    },
  },
}
</script>
