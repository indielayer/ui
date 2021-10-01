<template>
  <form @submit="submit" @keypress.enter="submit">
    <fieldset :disabled="disabled">
      <slot></slot>
    </fieldset>
  </form>
</template>

<script>
export default {
  props: {
    autoValidate: {
      type: Boolean,
      default: true,
    },
    autoFocus: {
      type: Boolean,
      default: true,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    apiErrors: {
      type: Array,
      default: () => [],
    },
  },
  watch: {
    apiErrors(errors) {
      this.$nextTick(() => {
        errors.forEach((error) => {
          this.$slots.default().every((vNode) => {
            const vInstance = vNode.componentInstance

            if (vInstance) {
              vInstance.errorInternal = error.msg

              return false
            }

            return true
          })
        })
      })
    },
  },
  mounted() {
    if (this.autoFocus) {
      this.$slots.default().every((vNode) => {
        const vInstance = vNode.componentInstance

        if (vInstance && typeof vInstance.focus === 'function') {
          vInstance.focus()

          return false
        }

        return true
      })
    }
  },
  methods: {
    submit(e) {
      e.preventDefault()

      const isFormValid = this.autoValidate ? this.validate() : true

      this.$emit('submit', isFormValid)
    },
    validate() {
      let isFormValid = true

      this.$slots.default().forEach((vNode) => {
        const vInstance = vNode.componentInstance

        if (vInstance && typeof vInstance.validate === 'function') {
          const isInputValid = vInstance.validate()

          if (!isInputValid && isFormValid) {
            isFormValid = false

            // focus on input error
            if (vInstance.focus) vInstance.focus()
          }
        }
      })

      return isFormValid
    },
  },
}
</script>
