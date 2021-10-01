<template>
  <div
    class="fixed z-40 inset-0 overflow-y-auto transition-all"
    :class="[
      isOpen ? 'visible' : 'invisible ease-in duration-100'
    ]"
  >
    <div
      class="fixed inset-0 bg-gray-500 dark:bg-gray-600 transition-opacity"
      :class="[
        isOpen ? 'ease-out duration-200 opacity-75' : 'ease-in duration-100 opacity-0',
      ]"
      @click.self="close()"
    ></div>

    <div class="flex items-end sm:items-center justify-center min-h-full p-4 sm:p-6">
      <div
        class="relative inline-block bg-white dark:bg-gray-900 rounded-lg shadow-xl transform transition-all"
        :class="[
          {
            'w-full': size === 'auto',
            'sm:max-w-xs w-full': size === 'xs',
            'sm:max-w-sm w-full': size === 'sm',
            'sm:max-w-lg w-full': !['auto', 'full', 'xs', 'sm', 'lg', 'xl'].includes(size),
            'sm:max-w-xl w-full': size === 'lg',
            'sm:max-w-3xl w-full': size === 'xl',
            'w-full': size === 'full',
          },
          isOpen ?
            'ease-out duration-200 opacity-100 translate-y-0 sm:scale-100'
            : 'ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
        ]"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-headline"
      >
        <slot></slot>
        <div v-if="showClose" class="absolute rounded-full bg-white -top-4 -right-4 w-10 h-10 shadow-md flex items-center justify-center cursor-pointer" @click="close()">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-linejoin="round"
            stroke-linecap="round"
            fill="none"
            role="presentation"
            class="stroke-2 w-4 h-4"
          >
            <line x1="18" y1="6" x2="6" y2="18"/>
            <line x1="6" y1="6" x2="18" y2="18"/>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'XModal',

  props: {
    size: {
      type: String,
      default: null,
    },
    showClose: {
      type: Boolean,
      default: false,
    },
  },

  data() {
    return {
      isOpen: false,
    }
  },

  beforeMount() {
    document.addEventListener('keydown', this.onKeydown)
  },

  beforeUnmount() {
    document.removeEventListener('keydown', this.onKeydown)
  },

  methods: {
    close() {
      this.isOpen = false
      this.$emit('close')
    },

    onKeydown(event) {
      if (event.keyCode === 27 && this.isOpen) {
        this.close()
      }
    },

    open() {
      this.isOpen = true
      this.$emit('open')
    },

    toggle() {
      this.isOpen = !this.isOpen
      this.$emit('toggle', this.isOpen)
    },
  },
}
</script>
