<template>
  <label
    ref="focusRef"
    class="inline-block mb-1 relative cursor-pointer focus:outline-none"
    :class="{
      ['rounded border p-2 hover:border-gray-500 dark:hover:border-gray-500 transition-colors duration-150 ease-in-out']: bordered,
      [`border-gray-300 dark:border-gray-700`]: bordered && !selected,
      [`border-${color}-500 dark:border-${color}-500`]: bordered && selected && !disabled,
    }"
    :aria-checked="selected ? 'true' : 'false'"
    :aria-disabled="disabled ? 'true' : null"
    :tabindex="0"
    @keypress.prevent.stop.enter.space="$emit('update:modelValue', value)"
  >
    <div
      class="flex items-center"
      :class="{ 'cursor-not-allowed': disabled }"
    >
      <input
        v-model="selected"
        type="radio"
        class="invisible absolute"
        :disabled="disabled || loading"
        :name="name"
        :required="required"
        :value="modelValue"
      />
      <div
        class="rounded-full flex justify-center items-center flex-shrink-0"
        :class="[
          {
            // shadow
            'shadow': !flat && !loading,
            [`shadow-lg shadow-${color}-500/50`]: !flat && glow && selected,

            'h-4 w-4': size === 'sm' || size === 'xs',
            'h-5 w-5': !['xs', 'sm', 'xl'].includes(size),
            'h-6 w-6': size === 'xl',
          },
          disabled ? {
            'bg-gray-500 border-gray-600 dark:border-gray-400': selected,
            'bg-gray-200 border-gray-300 dark:border-gray-700': !selected,
          } :
          {
            [`bg-${color}-500 border-${color}-500`]: selected && !loading,
            'border bg-white dark:bg-gray-900 border-gray-300 dark:border-gray-700': !selected && !loading,
          }
        ]"
      >
        <x-spinner v-if="loading" :size="size" class="absolute" />
        <svg
          v-else
          class="fill-current text-gray-100"
          :class="{
            'opacity-0': !selected,
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
    <p v-if="errorInternal" class="text-sm text-error-500 mt-1" v-text="errorInternal"></p>
  </label>
</template>

<script>
import { withProps, withValidator, withEmits, useInputtable } from '../../composables/inputtable'
import XSpinner from '../spinner/Spinner.vue'

export default {
  name: 'XRadio',
  components: {
    XSpinner,
  },

  validator: {
    ...withValidator(),
  },

  props: {
    ...withProps(),
    bordered: {
      type: Boolean,
      default: false,
    },

    value: {
      type: [String, Number, Boolean, Function, Object, Array],
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
    selected: {
      get() {
        return this.value === this.modelValue
      },

      set() {
        this.$emit('update:modelValue', this.value)
      },
    },
  },
}
</script>
