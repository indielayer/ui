<template>
  <label
    class="inline-block mb-1 relative pb-2"
    :class="[!disabled ? 'cursor-pointer' : 'cursor-not-allowed']"
  >
    <div class="flex items-center">
      <div
        class="rounded-full transition-colors duration-300"
        :class="[
          {
            // shadow
            'border shadow': !flat,
            [`shadow-lg shadow-${color}-500/50`]: !flat && glow && modelValue,

            'w-8': size === 'sm' || size === 'xs',
            'w-10': !['xs', 'sm', 'lg', 'xl'].includes(size),
            'w-12': size === 'lg',
            'w-14': size === 'xl',
            'bg-gray-300 dark:bg-gray-600': disabled && !checked,
            'bg-gray-400 dark:bg-gray-400': disabled && checked,
            'bg-gray-200 dark:bg-gray-600': !disabled && !checked,
            [`bg-${color}-200  border-${color}-200`]: !disabled && checked,
          }
        ]"
      >
        <input
          :id="id"
          v-model="checked"
          :aria-checked="checked ? 'true' : 'false'"
          :aria-disabled="disabled ? 'true' : null"
          type="checkbox"
          class="hidden"
          :disabled="disabled || loading"
          :name="name"
          :required="required"
          :value="modelValue"
        />

        <x-spinner v-if="loading" :size="size" :class="{'translate-x-full': checked}" />
        <div
          v-else
          class="rounded-full shadow transform transition duration-300 flex-shrink-0"
          :class="[
            {
              'h-4 w-4': size === 'sm' || size === 'xs',
              'h-5 w-5': !['xs', 'sm', 'lg', 'xl'].includes(size),
              'h-6 w-6': size === 'lg',
              'h-7 w-7': size === 'xl',
              'translate-x-full': checked,
              'bg-gray-200 dark:bg-gray-200': disabled,
              'bg-white': !disabled && !checked,
              [`bg-${color}-500`]: !disabled && checked,
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
    </div>
    <p v-if="errorInternal" class="text-sm text-error-500 mt-1" v-text="errorInternal"></p>
  </label>
</template>

<script>
import { withProps, withValidator, withEmits, useInputtable } from '../../composables/inputtable'
import XSpinner from '../spinner/Spinner.vue'

export default {
  name: 'XToggle',

  components: {
    XSpinner,
  },

  validator: {
    ...withValidator(),
  },

  props: {
    ...withProps(),

    id: {
      type: String,
      default: null,
    },

    label: {
      type: String,
      default: null,
    },

    glow: {
      type: Boolean,
      default: false,
    },
  },

  emits: withEmits(false),

  setup(props, { attrs, emit }) {
    return {
      ...useInputtable(props, { attrs, emit, useListeners: false }),
    }
  },

  computed: {
    checked: {
      get() {
        return this.modelValue
      },

      set(val) {
        this.$emit('update:modelValue', val)
      },
    },
  },
}
</script>
