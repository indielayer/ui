<template>
  <div
    class="fixed z-40 w-full sm:w-96"
    :class="{
      // align
      'left-0': align === 'left',
      'right-0': align === 'right',
      // position
      'bottom-0': position === 'bottom',
      'top-0': position === 'top',
    }"
  >
    <transition-group
      tag="ul"
      enter-active-class="transition ease-out duration-500"
      leave-active-class="transition ease-out duration-500"
      enter-class="transform translate-y-2 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-class="transform translate-y-0 opacity-100"
      leave-to-class="transform translate-y-2 opacity-0"
      move-class="ease-in-out duration-200"
    >
      <li
        v-for="event in events"
        :key="event.id"
        :class="[
          'px-4',
          {
            'pb-2': position === 'bottom',
            'pt-2': position === 'top',
          }
        ]"
      >
        <div
          :class="[
            'rounded px-4 py-3 cursor-pointer w-full',
            {
              // type
              'bg-gray-900 dark:bg-white text-white dark:text-gray-900 border border-gray-700 dark:border-gray-200':
                !event.type || (event.type && !['success', 'error', 'warn'].includes(event.type)),
              'bg-success-500 text-success-50': event.type && event.type === 'success',
              'bg-error-500 text-error-50': event.type && event.type === 'error',
              'bg-warning-500 text-warning-50': event.type && event.type === 'warn',
            }
          ]"
          @click="remove(event)"
        >
          {{ event.content }}
        </div>
      </li>
    </transition-group>
  </div>
</template>

<script>
const validator = {
  align: [
    'left',
    'right',
  ],
  position: [
    'bottom',
    'top',
  ],
}

export default {
  name: 'XToast',

  validator,

  props: {
    align: {
      type: String,
      default: 'right',
      validator: (value) => validator.align.includes(value),
    },

    position: {
      default: 'bottom',
      type: String,
      validator: (value) => validator.position.includes(value),
    },

    timeout: {
      type: Number,
      default: 3500,
    },
  },

  data() {
    return {
      events: [],
    }
  },

  methods: {
    log(content) {
      this.add(content)
    },

    success(content) {
      this.add(content, 'success')
    },

    warn(content) {
      this.add(content, 'warn')
    },

    error(content) {
      this.add(content, 'error')
    },

    add(content, type = null) {
      const event = {
        id: Date.now(),
        content,
        type,
      }

      this.events.push(event)
      this.setTimer(event)
    },

    remove(event) {
      this.events = this.events.filter((e) => e.id !== event.id)
    },

    setTimer(event) {
      setTimeout(
        () => {
          this.remove(event)
        },
        this.timeout,
      )
    },
  },
}
</script>
