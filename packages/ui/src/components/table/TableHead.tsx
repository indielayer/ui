import { defineComponent } from 'vue'

export default defineComponent({
  name: 'XTableHead',
  setup(props, { slots }) {
    return () => (
      <thead class="align-bottom">
        <tr class="text-sm text-gray-600 dark:text-gray-400 border-b">
          {slots.default?.()}
        </tr>
      </thead>
    )
  },
})
