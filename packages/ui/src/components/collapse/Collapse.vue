<template>
  <component
    :is="tag"
    :aria-disabled="disabled"
    :aria-expanded="collapsed ? 'false' : 'true'"
  >
    <div
      class="flex items-center relative"
      :class="{
        'cursor-pointer' : !disabled,
        'flex-row-reverse': iconLeft,
      }"
      @click="toggleExpand()"
    >
      <div class="flex-1">
        <slot :collapsed="collapsed"></slot>
      </div>

      <div class="absolute top-1/2 transform -translate-y-1/2 right-2">
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-linecap="round"
          fill="none"
          role="presentation"
          class="stroke-2 w-5 h-5 transform transition-transform duration-200"
          :class="[
            iconLeft ? 'mr-2' : 'ml-2',
            { 'rotate-180': !collapsed }
          ]"
        >
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </div>
    </div>

    <template v-if="$slots.summary">
      <slot name="summary"></slot>
    </template>

    <div
      class="overflow-y-hidden transition-all duration-300 ease-in-out"
      :style="{ maxHeight: maxHeight + 'px' }"
    >
      <div ref="content">
        <slot name="content"></slot>
      </div>
    </div>
  </component>
</template>

<script>
export default {
  name: 'XCollapse',

  props: {
    disabled: {
      default: false,
      type: Boolean,
    },

    expanded: {
      default: false,
      type: Boolean,
    },

    iconLeft: {
      default: false,
      type: Boolean,
    },

    tag: {
      default: 'div',
      type: String,
    },
  },

  data() {
    return {
      collapsed: !this.expanded,
      maxHeight: !this.expanded ? 0 : 'auto',
    }
  },

  beforeMount() {
    window.addEventListener('resize', this.resizeContent)
  },

  beforeUnmount() {
    window.removeEventListener('resize', this.resizeContent)
  },

  mounted() {
    this.resizeContent()
  },

  methods: {
    toggleExpand() {
      if (this.disabled) return

      this.collapsed = !this.collapsed
      this.$emit('toggle', this.collapsed)
      this.resizeContent()
    },

    resizeContent() {
      if (this.collapsed) {
        this.maxHeight = 0
      } else {
        this.maxHeight = this.$refs.content.offsetHeight
      }
    },
  },
}
</script>
