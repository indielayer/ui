<template>
  <label
    class="block mb-1 relative cursor-pointer"
    :class="hideDetails ? 'pb-2' : 'pb-6'"
  >
    <div
      class="flex items-center"
      :class="{ 'cursor-not-allowed': disabled }"
    >
      <input
        ref="input"
        v-model="selected"
        type="checkbox"
        class="invisible absolute"
        :disabled="disabled"
        :name="name"
        :required="required"
        :value="modelValue"
      />
      <div
        class="border rounded flex justify-center items-center flex-none"
        :class="[
          {
            // shadow
            'shadow': !flat,

            'h-4 w-4': size === 'sm' || size === 'xs',
            'h-5 w-5': !['xs', 'sm', 'xl'].includes(size),
            'h-6 w-6': size === 'xl',

            'hover:border-primary-500': !disabled,
            'bg-primary-500 border-primary-500': modelValue && !disabled,
            'bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700': !modelValue && !disabled,
            // disabled
            'bg-gray-500 border-gray-600 dark:border-gray-400': modelValue && disabled,
            'bg-gray-200 border-gray-300 dark:border-gray-700': !modelValue && disabled,
          }
        ]"
      >
        <svg
          class="fill-current text-primary-100"
          :class="{
            'opacity-0': !modelValue,
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
  </label>
</template>

<script>
export default {
  name: 'XCheckbox',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    name: {
      type: String,
      default: null,
    },

    required: {
      type: Boolean,
      default: false,
    },

    size: {
      type: String,
      default: null,
    },

    label: {
      type: String,
      default: null,
    },

    flat: {
      type: Boolean,
      default: false,
    },

    modelValue: {
      type: [String, Number, Boolean, Function, Object, Array],
      default: null,
    },

    hideDetails: {
      type: Boolean,
      default: false,
    },
  },

  emits: ['update:modelValue'],

  computed: {
    selected: {
      get() {
        return this.modelValue
      },

      set(val) {
        this.$emit('update:modelValue', val)
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
