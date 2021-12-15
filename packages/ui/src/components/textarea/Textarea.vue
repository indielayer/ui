<template>
  <label class="inline-block mb-1 relative">
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

    <textarea
      ref="focusRef"
      class="appearance-none block w-full text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 rounded-form leading-tight
        focus:outline-none focus:border-primary-500 dark:focus:border-primary-500 transition-colors duration-150 ease-in-out border-gray-300 dark:border-gray-700 resize-none overflow-hidden"
      :class="[
        disabled ? 'bg-gray-200 dark:bg-gray-800 cursor-not-allowed' : 'bg-white dark:bg-gray-900',
        {
          // size
          'py-1': size === 'auto',
          'px-2 py-1 text-xs': size === 'xs',
          'px-2 py-1 text-sm': size === 'sm',
          'px-3 py-2': !['auto', 'xs', 'sm', 'lg', 'xl'].includes(size),
          'px-4 py-3 text-lg': size === 'lg',
          'px-6 py-6 text-xl': size === 'xl',
        },
        flat ? '!p-0 !bg-transparent' : 'border shadow',
        {
          // error
          'border-error-500 focus:border-error-500 dark:focus:border-error-500': errorInternal,
        },
        inputClass,
      ]"
      :disabled="disabled"
      :max="max"
      :maxlength="maxlength"
      :min="min"
      :dir="dir"
      :minlength="minlength"
      :name="name"
      :placeholder="placeholder"
      :readonly="readonly"
      :value="modelValue"
      v-on="inputListeners"
      @keydown="onKeyDown"
      @input="onInput"
    ></textarea>

    <p v-if="errorInternal" class="text-sm text-error-500 mt-1" v-text="errorInternal"></p>
  </label>
</template>

<script>
import { withProps, withValidator, withEmits, useInputtable } from '../../composables/inputtable'

export default {
  name: 'XTextarea',

  validator: withValidator(),

  props: {
    ...withProps(),

    label: {
      type: String,
      default: '',
    },

    dir: {
      type: String,
      default: 'ltr',
    },

    max: {
      type: Number,
      default: null,
    },

    maxlength: {
      type: Number,
      default: null,
    },

    min: {
      type: Number,
      default: null,
    },

    minlength: {
      type: Number,
      default: null,
    },

    placeholder: {
      type: String,
      default: null,
    },

    adjustToText: {
      type: Boolean,
      default: true,
    },

    preventEnter: {
      type: Boolean,
      default: false,
    },

    inputClass: {
      type: String,
      default: '',
    },
  },

  emits: withEmits(),

  setup(props, { attrs, emit }) {
    return {
      ...useInputtable(props, { attrs, emit }),
    }
  },

  watch: {
    modelValue() {
      setTimeout(this.resize)
    },
    size() {
      setTimeout(this.resize)
    },
  },

  mounted() {
    this.resize()
    window.addEventListener('resize', this.resize)
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.resize)
  },

  methods: {
    onInput() {
      this.resize()
    },
    onKeyDown(e) {
      if (this.preventEnter && e.keyCode === 13) {
        e.preventDefault()
        e.stopPropagation()

        return
      }
    },
    resize() {
      if (this.adjustToText) {
        const { focusRef } = this.$refs

        focusRef.style.height = '1px'
        focusRef.style.height = (2 + focusRef.scrollHeight) + 'px'
      }
    },
  },
}
</script>
