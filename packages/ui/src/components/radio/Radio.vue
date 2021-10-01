<template>
  <label
    class="inline-block cursor-pointer focus:outline-none"
    :class="{
      'rounded border border-gray-300 dark:border-gray-700 p-2 hover:border-primary-500 dark:hover:border-primary-500': bordered,
      'transition-colors duration-150 ease-in-out': bordered,
      'border-primary-500 dark:border-primary-500': checked && !disabled,
    }"
    :aria-checked="checked ? 'true' : 'false'"
    :aria-disabled="disabled ? 'true' : null"
    :tabindex="0"
  >
    <div
      class="flex items-center"
      :class="{ 'cursor-not-allowed': disabled }"
    >
      <input
        ref="input"
        v-model="selected"
        type="radio"
        class="invisible absolute"
        :disabled="disabled"
        :name="name"
        :required="required"
        :value="value"
      />
      <div
        class="border rounded-full flex justify-center items-center flex-none"
        :class="[
          {
            // shadow
            'shadow': !flat,

            'h-4 w-4': size === 'sm' || size === 'xs',
            'h-5 w-5': !['xs', 'sm', 'xl'].includes(size),
            'h-6 w-6': size === 'xl',

            'hover:border-primary-500': !disabled,
            'bg-primary-500 border-primary-500': checked && !disabled,
            'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700': !checked && !disabled,
            // disabled
            'bg-gray-500 border-gray-600 dark:border-gray-400': checked && disabled,
            'bg-gray-200 border-gray-300 dark:border-gray-700': !checked && disabled,
          }
        ]"
      >
        <svg
          class="fill-current text-primary-100"
          :class="{
            'opacity-0': !checked,
            'h-2 w-2': size === 'sm' || size === 'xs',
            'h-3 w-3': !['xs', 'sm', 'xl'].includes(size),
            'h-4 w-4': size === 'xl',
          }"
          viewBox="0 0 20 20"
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </div>
      <span
        v-if="label"
        class="font-medium text-gray-800 dark:text-gray-200 pl-2"
        :class="{
          'text-xs': size === 'xs',
          'text-sm': size === 'sm',
          'text-lg': size === 'lg',
          'text-xl': size === 'xl',
        }"
        v-text="label"
      ></span>
    </div>

    <div
      v-if="$slots.default"
      :class="{
        'text-xs pl-6': size === 'xs',
        'text-sm pl-6': size === 'sm',
        'pl-7': !['xs', 'sm', 'lg', 'xl'].includes(size),
        'text-lg pl-7': size === 'lg',
        'text-lg pl-8': size === 'xl',
      }"
    >
      <slot></slot>
    </div>
  </label>
</template>

<script>
export default {
  name: 'XRadio',

  model: {
    prop: 'options',
    event: 'change',
  },

  props: {
    bordered: {
      type: Boolean,
      default: false,
    },

    disabled: {
      type: Boolean,
      default: false,
    },

    options: {
      type: [String, Number, Boolean, Function, Object, Array],
      default: null,
    },

    name: {
      type: String,
      default: null,
    },

    size: {
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

    value: {
      type: [String, Number, Boolean, Function, Object, Array],
      default: null,
    },
  },

  computed: {
    checked() {
      return this.options === this.value
    },

    selected: {
      get() {
        return this.options
      },

      set(val) {
        this.$emit('change', val)
      },
    },
  },

  methods: {
    focus() {
      this.$refs.input.focus()
    },
  },
}
</script>
