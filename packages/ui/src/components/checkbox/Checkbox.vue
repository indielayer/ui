<template>
  <label class="inline-block mb-1 relative cursor-pointer pb-2">
    <div
      ref="focusRef"
      class="flex items-center"
      :class="{ 'cursor-not-allowed': disabled }"
      :tabindex="0"
      @keypress.prevent.stop.enter.space="toggle"
    >
      <input
        v-model="checked"
        :aria-checked="checked ? 'true' : 'false'"
        :aria-disabled="disabled ? 'true' : null"
        type="checkbox"
        class="invisible absolute"
        :disabled="disabled || loading"
        :name="name"
        :required="required"
        :value="modelValue"
      />
      <div
        class="rounded flex justify-center items-center flex-shrink-0"
        :class="[
          {
            'shadow': !flat && !loading,
            [`shadow-lg shadow-${color}-500/50`]: !flat && glow && modelValue,

            'h-4 w-4': size === 'sm' || size === 'xs',
            'h-5 w-5': !['xs', 'sm', 'xl'].includes(size),
            'h-6 w-6': size === 'xl',
          },
          disabled ? {
            'bg-gray-500 border-gray-600 dark:border-gray-400': modelValue,
            'bg-gray-200 border-gray-300 dark:border-gray-700': !modelValue,
          } :
          {
            [`bg-${color}-500 border-${color}-500`]: modelValue && !loading,
            'border bg-white dark:bg-gray-900 border-gray-300 hover:border-gray-900 dark:border-gray-700': !modelValue && !loading,
          }
        ]"
      >
        <x-spinner v-if="loading" :size="size" class="absolute" />
        <svg
          v-else
          class="fill-current text-gray-100"
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
      <div
        class="inline-block font-medium text-gray-800 dark:text-gray-200 pl-2"
        :class="{
          'text-xs': size === 'xs',
          'text-sm': size === 'sm',
          'text-lg': size === 'lg',
          'text-xl': size === 'xl',
        }"
      >
        <span v-if="label" v-text="label"></span>
        <slot v-else></slot>
      </div>
    </div>
    <p v-if="errorInternal" class="text-sm text-error-500 mt-1" v-text="errorInternal"></p>
  </label>
</template>

<script>
import { withProps, withValidator, withEmits, useInputtable } from '../../composables/inputtable'
import XSpinner from '../spinner/Spinner.vue'

export default {
  name: 'XCheckbox',
  components: {
    XSpinner,
  },

  validator: {
    ...withValidator(),
  },

  props: {
    ...withProps(),

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

  methods: {
    toggle() {
      this.$emit('update:modelValue', !this.modelValue)
    },
  },
}
</script>
