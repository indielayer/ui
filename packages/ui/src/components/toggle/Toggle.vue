<template>
  <label
    :class="[
      !disabled ? 'cursor-pointer' : 'cursor-not-allowed',
      label ? 'flex items-center' : 'inline-block',
    ]"
  >
    <div
      class="rounded-full transition-colors duration-300"
      :class="[
        {
          // shadow
          'border shadow': !flat,

          'w-8': size === 'sm' || size === 'xs',
          'w-10': !['xs', 'sm', 'lg', 'xl'].includes(size),
          'w-12': size === 'lg',
          'w-14': size === 'xl',
          'bg-gray-300 dark:bg-gray-600': disabled && !checked,
          'bg-gray-400 dark:bg-gray-400': disabled && checked,
          'bg-gray-200 dark:bg-gray-600': !disabled && !checked,
          'bg-primary-200  border-primary-200': !disabled && checked,
        }
      ]"
    >
      <input
        :id="id"
        v-model="checked"
        :aria-checked="checked ? 'true' : 'false'"
        :aria-disabled="disabled ? 'true' : null"
        :disabled="disabled"
        :name="name"
        :required="required"
        type="checkbox"
        class="hidden"
      />

      <div
        class="rounded-full shadow transform transition duration-300"
        :class="[
          {
            'h-4 w-4': size === 'sm' || size === 'xs',
            'h-5 w-5': !['xs', 'sm', 'lg', 'xl'].includes(size),
            'h-6 w-6': size === 'lg',
            'h-7 w-7': size === 'xl',
            'translate-x-full': checked,
            'bg-gray-200 dark:bg-gray-200': disabled,
            'bg-white': !disabled && !checked,
            'bg-primary-500': !disabled && checked,
          },
        ]"
      ></div>
    </div>
    <span
      v-if="label"
      class="pl-2 font-medium text-gray-800 dark:text-gray-200"
      :class="{
        'text-xs': size === 'xs',
        'text-sm': size === 'sm',
        'text-lg': size === 'lg',
        'text-xl': size === 'xl',
      }"
      v-text="label"
    >
    </span>
  </label>
</template>

<script>
export default {
  name: 'XToggle',

  model: {
    prop: 'option',
    event: 'change',
  },

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    id: {
      type: String,
      default: null,
    },

    option: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      default: null,
    },

    label: {
      type: String,
      default: null,
    },

    required: {
      type: Boolean,
      default: false,
    },

    flat: {
      type: Boolean,
      default: false,
    },

    size: {
      type: String,
      default: null,
    },
  },

  computed: {
    checked: {
      get() {
        return this.option
      },
      set(val) {
        this.$emit('change', val)
      },
    },
  },
}
</script>
