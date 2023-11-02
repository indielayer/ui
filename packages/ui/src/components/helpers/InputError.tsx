import { defineComponent } from 'vue'

export default defineComponent({
  name: 'InputError',
  props: {
    error: String,
    helper: String,
  },
  setup(props) {
    return () => props.error
      ? <p class="text-sm text-red-500 dark:text-red-400 mt-1">{props.error}</p>
      : props.helper ? <p class="text-sm text-gray-500 dark:text-gray-400 mt-1">{props.helper}</p> : ''
  },
})
