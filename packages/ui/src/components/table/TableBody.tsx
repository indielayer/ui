import { defineComponent } from 'vue'

export default defineComponent({
  name: 'XTableBody',
  setup(props, { slots }) {
    return () => <tbody>{slots.default?.()}</tbody>
  },
})
