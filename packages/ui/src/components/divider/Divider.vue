<template>
  <div
    :class="[
      {
        'h-full flex-col': vertical,
        'w-full': !vertical
      },
    ]"
    class="flex justify-center items-center"
  >
    <div
      class="bg-gray-200 dark:bg-gray-600 flex-grow"
      :style="[
        {
          width: vertical ? '1px' : 'auto',
          height: !vertical ? '1px' : 'auto'
        }
      ]"
    ></div>
    <div
      v-if="label"
      class="font-medium text-sm text-gray-600 dark:text-gray-300"
      :class="[{
        'my-2': vertical,
        'mx-4': !vertical
      }]"
      v-text="label"
    ></div>
    <div
      class="bg-gray-200 dark:bg-gray-600 flex-grow"
      :style="[
        {
          width: vertical ? '1px' : 'auto',
          height: !vertical ? '1px' : 'auto'
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
