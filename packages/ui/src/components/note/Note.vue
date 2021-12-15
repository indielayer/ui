<template>
  <component
    :is="tag"
    class="flex rounded-md p-2"
    :class="filled ? [`bg-${color}-500 text-${color}-50`] : [`border text-${color}-500 border-${color}-500`]"
  >
    <svg
      v-if="!$slots.icon"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      stroke="currentColor"
      stroke-linejoin="round"
      stroke-linecap="round"
      fill="none"
      role="presentation"
      class="flex-none stroke-2 w-4 h-4 mt-1 mr-2"
    >
      <template v-if="color === 'primary'">
        <circle cx="12" cy="12" r="10"/>
        <line x1="12" y1="8" x2="12" y2="12"/>
        <line x1="12" y1="16" x2="12" y2="16"/>
      </template>

      <template v-if="color === 'success'">
        <path d="M12 22C17.5228 22 22 17.5228 22 12C22 6.47715 17.5228 2 12 2C6.47715 2 2 6.47715 2 12C2 17.5228 6.47715 22 12 22Z" />
        <path d="M16 10L10.5 15L8 12.7273" />
      </template>

      <template v-if="color === 'error'">
        <path d="M7.86 2H16.14L22 7.86V16.14L16.14 22H7.86L2 16.14V7.86L7.86 2Z" />
        <path d="M9 9L15 15" />
        <path d="M15 9L9 15" />
      </template>
      <template v-if="color === 'warning'">
        <path stroke="none" d="M0 0h24v24H0z" fill="none"/>
        <path d="M12 9v2m0 4v.01"/>
        <path d="M5 19h14a2 2 0 0 0 1.84 -2.75l-7.1 -12.25a2 2 0 0 0 -3.5 0l-7.1 12.25a2 2 0 0 0 1.75 2.75"/>
      </template>
    </svg>

    <div
      v-if="$slots.icon"
      class="flex-none pr-2"
    >
      <slot name="icon"></slot>
    </div>

    <slot></slot>
  </component>
</template>

<script>
export default {
  name: 'XNote',

  props: {
    filled: {
      type: Boolean,
      default: false,
    },

    tag: {
      type: String,
      default: 'div',
    },

    color: {
      type: String,
      default: 'primary',
    },
  },
}
</script>
