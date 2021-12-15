<template>
  <label class="inline-block mb-1 relative pb-2">
    <p
      v-if="label"
      class="font-medium text-gray-800 dark:text-gray-200 mb-1"
      :class="{
        'text-xs': size === 'xs',
        'text-sm': size === 'sm',
        'text-lg': size === 'lg',
        'text-xl': size === 'xl',
      }"
      v-text="label"
    ></p>

    <div class="relative">
      <select
        ref="focusRef"
        v-model="selected"
        class="block appearance-none w-full border border-gray-300 dark:border-gray-700 pr-8 rounded-form leading-tight
          focus:outline-none focus:border-primary-500 dark:focus:border-primary-500 transition-colors duration-150 ease-in-out"
        :class="[
          disabled
            ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 cursor-not-allowed'
            : 'bg-white dark:bg-gray-900',
          {
            // shadow
            'shadow': !flat,

            // size
            'py-1': size === 'auto',
            'px-2 py-1 text-xs': size === 'xs',
            'px-2 py-1 text-sm': size === 'sm',
            'px-3 py-2': !['auto', 'xs', 'sm', 'lg', 'xl'].includes(size),
            'px-4 py-3 text-lg': size === 'lg',
            'px-6 py-6 text-xl': size === 'xl',
          },
          {
            'text-gray-400 dark:text-gray-500': modelValue === '' || modelValue === null,

            // error
            'border-error-500 focus:border-error-500 dark:focus:border-error-500': errorInternal,
          },
        ]"
        :disabled="disabled || loading"
        :name="name"
        :readonly="readonly"
        :value="modelValue"
        v-on="inputListeners"
      >
        <option
          v-if="placeholder"
          disabled
          value=""
        >
          {{ placeholder }}
        </option>
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
        <slot></slot>
      </select>

      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <x-spinner v-if="loading" :size="size" />
        <svg
          v-else
          class="stroke-2"
          :class="[
            disabled ? 'text-gray-600 dark:text-gray-400': 'text-gray-700 dark:text-gray-300',
            {
              'h-3 w-3': size === 'sm' || size === 'xs',
              'h-4 w-4': !['xs', 'sm', 'xl'].includes(size),
              'h-5 w-5': size === 'xl',
            }
          ]"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-linecap="round"
          fill="none"
        >
          <path d="M18 8L12 2L6 8" />
          <path d="M18 16L12 22L6 16" />
        </svg>
      </div>
    </div>

    <p v-if="errorInternal" class="text-sm text-error-500 mt-1" v-text="errorInternal"></p>
  </label>
</template>

<script>
import { withProps, withValidator, withEmits, useInputtable } from '../../composables/inputtable'
import XSpinner from '../spinner/Spinner.vue'

export default {
  name: 'XSelect',
  components: {
    XSpinner,
  },

  validator: {
    ...withValidator(),
  },

  props: {
    ...withProps(),

    placeholder: {
      type: String,
      default: null,
    },

    flat: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      default: null,
    },

    options: {
      type: Array,
      default: null,
    },
  },

  emits: withEmits(false),

  setup(props, { attrs, emit }) {
    return {
      ...useInputtable(props, { attrs, emit, useListeners: false }),
    }
  },

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
}
</script>
