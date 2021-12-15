<script>
import { defineComponent, h } from 'vue'

export default defineComponent({
  name: 'XForm',
  inheritAttrs: false,
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
    errors: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {
      inputs: [],
    }
  },
  watch: {
    errors(errors) {
      this.$nextTick(() => {
        errors.forEach((error) => {
          const input = this.inputs.find((i) => i.name === error.field)

          if (input) input.setErrorInternal(error.msg)
        })
      })
    },
  },
  mounted() {
    this.getInputs(this.vnodesInDefaultSlot)

    if (this.autoFocus) {
      if (this.inputs && this.inputs.length > 0) this.inputs[0].focus()
    }
  },
  methods: {
    submit(e) {
      e.preventDefault()
      e.stopPropagation()

      const isFormValid = this.autoValidate ? this.validate() : true

      this.$emit('submit', isFormValid)
    },
    validate() {
      let isFormValid = true

      this.inputs.forEach((input) => {
        const isInputValid = input.validate()

        if (!isInputValid && isFormValid) {
          isFormValid = false

          // focus on input error
          if (input.focus) input.focus()
        }
      })

      return isFormValid
    },
    getInputs(vnodesInDefaultSlot) {
      if (!Array.isArray(vnodesInDefaultSlot)) return

      vnodesInDefaultSlot.forEach((vNode) => {
        const vInstance = vNode.component?.ctx

        if (vInstance && typeof vInstance.validate === 'function') this.inputs.push(vInstance)
        else if (vNode.children) this.getInputs(vNode.children)
      })
    },
  },
  render() {
    const vnodesInDefaultSlot = this.$slots.default ? this.$slots.default() : []

    this.vnodesInDefaultSlot = vnodesInDefaultSlot

    return h(
      'form',
      {
        onKeyUp: (event) => {
          if (event.target !== event.currentTarget) return
          if (event.key === 'Enter') this.submit(event)
        },
        onSubmit: this.submit,
      },
      [
        h('fieldset', {
          disabled: this.disabled,
        },
        vnodesInDefaultSlot),
      ],
    )
  },
})
</script>
