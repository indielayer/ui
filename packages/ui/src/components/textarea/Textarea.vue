<template>
  <label
    class="block mb-1 relative"
    :class="hideDetails ? 'pb-2' : 'pb-6'"
  >
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
      ref="input"
      class="appearance-none block w-full text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 rounded-form leading-tight
        focus:outline-none focus:border-primary-500 dark:focus:border-primary-500 transition-colors duration-150 ease-in-out border-gray-300 dark:border-gray-700 resize-none overflow-hidden"
      :class="[
        disabled ? 'bg-gray-200 dark:bg-gray-800 cursor-not-allowed' : 'bg-white dark:bg-gray-900',
        flat ? 'p-0 bg-transparent' : {
          // shadow
          'border shadow': true,

          // size
          'py-1': size === 'auto',
          'px-2 py-1 text-xs': size === 'xs',
          'px-2 py-1 text-sm': size === 'sm',
          'px-3 py-2': !['auto', 'xs', 'sm', 'lg', 'xl'].includes(size),
          'px-4 py-3 text-lg': size === 'lg',
          'px-6 py-6 text-xl': size === 'xl',
        },
        {
          // error
          'border-error-500 focus:border-error-500 dark:focus:border-error-500': errorInternal,
        },
        inputClass,
      ]"
      :disabled="disabled"
      :maxlength="maxlength"
      :name="name"
      :placeholder="placeholder"
      :readonly="readonly"
      :value="value"

      v-on="listeners"
      @keydown="onKeyDown"
    ></textarea>

    <p v-if="errorInternal" class="text-sm text-error-500 mt-1" v-text="errorInternal"></p>
  </label>
</template>

<script>
export default {
  name: 'XTextarea',

  props: {
    disabled: {
      default: false,
      type: Boolean,
    },

    validateOnInput: {
      type: Boolean,
      default: true,
    },

    hideDetails: {
      type: Boolean,
      default: false,
    },

    label: {
      type: String,
      default: '',
    },

    maxlength: {
      type: Number,
      default: null,
    },

    name: {
      type: String,
      default: null,
    },

    placeholder: {
      type: String,
      default: null,
    },

    readonly: {
      type: Boolean,
      default: null,
    },

    size: {
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

    flat: {
      type: Boolean,
      default: false,
    },

    inputClass: {
      type: String,
      default: '',
    },

    value: {
      type: [String, Number],
      default: null,
    },

    error: {
      type: String,
      default: '',
    },

    rules: {
      type: Array,
      default: () => [],
    },
  },

  data() {
    return {
      isFirstValidation: true,
      currentType: this.type,
      errorInternal: this.error,
    }
  },

  computed: {
    listeners() {
      return {
        // Add listeners from parent
        ...this.$attrs,
        // Ensure that the component works with v-model
        blur: (event) => this.$emit('blur', event),
        focus: (event) => this.$emit('focus', event),
        input: (event) => {
          if (this.validateOnInput && !this.isFirstValidation) this.validate(event.target.value)
          this.resize()
          this.$emit('input', event.target.value)
        },
        change: (event) => this.$emit('change', event),
      }
    },
  },

  watch: {
    error(val) {
      this.errorInternal = val
    },
    value() {
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
    onKeyDown(e) {
      if (this.preventEnter && e.keyCode === 13) {
        e.preventDefault()
        e.stopPropagation()

        return
      }
    },
    resize() {
      if (this.adjustToText) {
        const { input } = this.$refs

        input.style.height = '1px'
        input.style.height = (2 + input.scrollHeight) + 'px'
      }
    },
    reset() {
      this.errorInternal = ''
      this.isFirstValidation = true
      this.$emit('input', '')
    },
    focus() {
      this.$refs.input.focus()
    },
    validate(val) {
      val = val || this.value

      this.isFirstValidation = false

      for (let i = 0; i < this.rules.length; i++) {
        const item = this.rules[i]

        let isValid = true

        // Direct Function
        if (typeof item === 'function') {
          const rule = item

          isValid = rule(val)
        } else if (Array.isArray(item) && item.length === 2) {
          // Rule array [function, options]
          const { 0: rule, 1: options } = item

          isValid = rule(val, options)
        } else {
          // Rule object { fn, options }
          const rule = item.fn
          const { options } = item

          isValid = rule(val, options)
        }

        if (isValid !== true) {
          this.errorInternal = isValid

          return false
        }
      }

      this.errorInternal = ''

      return true
    },
  },
}
</script>
