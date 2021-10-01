<template>
  <div
    class="inline-block relative xpopover"
    :class="[
      { 'hover': hover,
        'is-open': isOpen,
      },
      $attrs.class,
      $attrs.staticClass,
    ]"
  >
    <div class="flex" @click="!hover ? toggle() : null">
      <slot></slot>
    </div>

    <div
      v-if="!hover"
      class="fixed inset-0 opacity-0 z-40"
      :class="[isOpen ? 'visible' : 'invisible']"
      @click.self="close()"
    ></div>

    <div
      class="absolute w-auto bottom-0 left-0 right-0 sm:p-0 transform transition-transform z-50 xpopover-content whitespace-nowrap max-w-xs"
      :class="[
        {
          // align-left
          'left-0 right-auto': align === 'left' && ['bottom', 'top'].includes(position),
          // align-center
          'left-1/2 right-auto -translate-x-1/2': align === 'center' && ['bottom', 'top'].includes(position),
          // align-right
          'right-0 left-auto': align === 'right' && ['bottom', 'top'].includes(position),
          // align-top
          'top-0 bottom-auto': align === 'top' && ['left', 'right'].includes(position),
          // align-middle
          '-translate-y-1/2 top-1/2 bottom-auto': align === 'center' && ['left', 'right'].includes(position),
          // align-bottom
          'bottom-0': align === 'bottom' && ['left', 'right'].includes(position),

          // position-top
          'xpopover-top bottom-full pb-2': position === 'top',
          // position-right
          'xpopover-right left-full pl-2': position === 'right',
          // position-bottom
          'xpopover-bottom top-full bottom-0': position === 'bottom',
          // position-left
          'xpopover-left right-full left-auto pr-2': position === 'left',
        }
      ]"
      @click="dismissible ? close() : null"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<script>
const validator = {
  align: [
    'bottom',
    'center',
    'left',
    'right',
    'top',
  ],
  position: [
    'bottom',
    'left',
    'right',
    'top',
  ],
}

export default {
  name: 'XPopover',

  validator,

  props: {
    align: {
      type: String,
      default: 'center',
      validator: (value) => validator.align.includes(value),
    },

    hover: {
      type: Boolean,
      default: false,
    },

    dismissible: {
      type: Boolean,
      default: true,
    },

    position: {
      default: 'bottom',
      type: String,
      validator: (value) => validator.position.includes(value),
    },
  },

  data() {
    return {
      isOpen: false,
    }
  },

  methods: {
    close() {
      this.isOpen = false
      this.$emit('close')
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

<style lang="css">
.xpopover-content {
  visibility: hidden;
  transition-duration: .1s;
  transition-timing-function: cubic-bezier(.4,0,1,1);
}
.xpopover-top {
  --tw-translate-y: 0.5rem;
}
.xpopover-right {
  --tw-translate-x: -0.5rem;
}
.xpopover-bottom {
  --tw-translate-y: -0.25rem;
}
.xpopover-left {
  --tw-translate-x: 0.5rem;
}

.xpopover.hover:hover .xpopover-content,
.xpopover.is-open .xpopover-content {
  visibility: visible;
  transition-duration: .15s;
  transition-timing-function: cubic-bezier(0,0,.2,1);
}

.xpopover.hover:hover .xpopover-top,
.xpopover.is-open .xpopover-top {
  --tw-translate-y: 0.25rem;
}

.xpopover.hover:hover .xpopover-right,
.xpopover.is-open .xpopover-right {
  --tw-translate-x: 0px;
}

.xpopover.hover:hover .xpopover-bottom,
.xpopover.is-open .xpopover-bottom {
  --tw-translate-y: 0.25rem;
}

.xpopover.hover:hover .xpopover-left,
.xpopover.is-open .xpopover-left {
  --tw-translate-x: 0px;
}
</style>
