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

    <div class="relative">
      <span
        v-if="$slots.icon"
        class="flex items-center w-5 h-5 text-gray-500 absolute my-auto ml-2 inset-y-0"
        :class="[{
          'mr-2 left-0': $slots.icon && !iconRight,
          'ml-2 right-0': $slots.icon && iconRight,
        }]"
      >
        <slot name="icon"></slot>
      </span>

      <input
        ref="input"
        class="appearance-none block w-full text-gray-700 dark:text-gray-200 placeholder-gray-400 dark:placeholder-gray-600 rounded-form leading-tight
          focus:outline-none focus:border-primary-500 dark:focus:border-primary-500 transition-colors duration-150 ease-in-out border-gray-300 dark:border-gray-700"
        :class="[
          disabled ? 'bg-gray-200 dark:bg-gray-800 cursor-not-allowed' : 'bg-white dark:bg-gray-900',
          type === 'password' ? 'pr-9' : (flat ? '' : 'pr-4'),
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
            '!pl-9': $slots.icon && !iconRight,
            '!pr-9': $slots.icon && iconRight,
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
        :type="currentType"
        :value="value"
        v-bind="$attrs"
        @change="onChange"
      />

      <svg
        v-if="type === 'password' && showPasswordToggle"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-linecap="round"
        fill="none"
        class="text-gray-700 dark:text-gray-300 stroke-2 w-4 h-4 absolute my-auto mr-2 inset-y-0 right-1 cursor-pointer"
        @click="togglePasswordVisibility()"
      >
        <template v-if="currentType === 'password'">
          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z" />
          <circle cx="12" cy="12" r="3"/>
        </template>

        <template v-else>
          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24" />
          <line x1="1" y1="1" x2="23" y2="23"/>
        </template>
      </svg>
    </div>

    <p v-if="errorInternal" class="text-sm text-error-500 mt-1" v-text="errorInternal"></p>
  </label>
</template>

<script>
export default {
  name: 'XInput',

  props: {
    disabled: {
      type: Boolean,
      default: false,
    },

    showPasswordToggle: {
      type: Boolean,
      default: true,
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

    iconRight: {
      type: Boolean,
      default: false,
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

    type: {
      type: String,
      default: 'text',
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
  },

  methods: {
    onChange(e) {
      if (this.type === 'number') {
        if (this.min !== null) {
          if (e.target.value < this.min) e.target.value = this.min
        }

        if (this.max !== null) {
          if (e.target.value > this.max) e.target.value = this.max
        }
      }
    },
    togglePasswordVisibility() {
      this.currentType = this.currentType === 'password' ? 'text' : 'password'
      // this.$refs.input.setAttribute('type', this.currentType)
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
