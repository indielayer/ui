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
      <select
        ref="input"
        class="block appearance-none w-full border border-gray-300 dark:border-gray-700 pr-8 rounded-form leading-tight
          focus:outline-none focus:border-primary-500 dark:focus:border-primary-500 transition-colors duration-150 ease-in-out"
        :class="[
          disabled
            ? 'bg-gray-200 dark:bg-gray-800 text-gray-800 dark:text-gray-200 cursor-not-allowed'
            : 'bg-white dark:bg-gray-900',
          {
            // shadow
            'border shadow': !flat,

            // size
            'py-1': size === 'auto',
            'px-2 py-1 text-xs': size === 'xs',
            'px-2 py-1 text-sm': size === 'sm',
            'px-3 py-2': !['auto', 'xs', 'sm', 'lg', 'xl'].includes(size),
            'px-4 py-3 text-lg': size === 'lg',
            'px-6 py-6 text-xl': size === 'xl',
          },
          {
            'text-gray-700 dark:text-gray-200': value === '' || value === null,

            // error
            'border-error-500 focus:border-error-500 dark:focus:border-error-500': errorInternal,
          },
        ]"
        :disabled="disabled"
        :name="name"
        :readonly="readonly"
        :value="value"

        v-on="listeners"
      >
        <option
          v-if="placeholder"
          disabled
          value=""
        >
          {{ placeholder }}
        </option>
        <slot></slot>
      </select>

      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <svg
          class="h-4 w-4 stroke-2"
          :class="[disabled ? 'text-gray-600 dark:text-gray-400': 'text-gray-700 dark:text-gray-300']"
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
export default {
  name: 'XSelect',

  props: {
    disabled: {
      default: false,
      type: Boolean,
    },

    name: {
      type: String,
      default: null,
    },

    validateOnInput: {
      type: Boolean,
      default: true,
    },

    hideDetails: {
      type: Boolean,
      default: false,
    },

    placeholder: {
      type: String,
      default: null,
    },

    readonly: {
      type: Boolean,
      default: null,
    },

    flat: {
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
          this.$emit('select', event.target.value)
        },
      }
    },
  },

  watch: {
    error(val) {
      this.errorInternal = val
    },
  },

  methods: {
    reset() {
      this.errorInternal = ''
      this.isFirstValidation = true
      this.$emit('input', '')
      this.$emit('select', '')
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
