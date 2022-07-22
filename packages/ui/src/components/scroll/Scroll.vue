<script lang="ts">
export default { name: 'XScroll' }
</script>

<script setup lang="ts">
import { ref, toRefs } from 'vue'
import { useScroll, useResizeObserver, useEventListener } from '@vueuse/core'
import { useTheme } from '../../composables/theme'

import theme from './Scroll.theme'

const props = defineProps({
  shadow: Boolean,
  horizontal: Boolean,
  mousewheel: Boolean,
  scrollbar: {
    type: Boolean,
    default: true,
  },
})

const scrollEl = ref<HTMLElement | null>(null)

const { x, y, isScrolling, arrivedState, directions } = useScroll(scrollEl)
const { left, right, top, bottom } = toRefs(arrivedState)

useResizeObserver(scrollEl, triggerScroll)

if (props.horizontal && props.mousewheel)
  useEventListener(scrollEl, 'wheel', (e: WheelEvent) => {
    if (!scrollEl.value || scrollEl.value.scrollWidth <= scrollEl.value.clientWidth) return

    e.preventDefault()
    scrollEl.value.scrollLeft += e.deltaY + e.deltaX
  })

function triggerScroll() {
  scrollEl.value?.dispatchEvent(new CustomEvent('scroll'))
}

const { styles, classes, className } = useTheme('scroll', theme, props)
</script>

<template>
  <div
    class="flex relative overflow-hidden"
    :style="styles"
    :class="[
      className,
      classes.wrapper,
      $style.scrollWrap,
      horizontal ? [
        $style.horizontal,
        {
          [$style['shadow-left']]: !left,
          [$style['shadow-right']]: !right,
        }
      ] : [
        $style.vertical,
        {
          [$style['shadow-top']]: !top,
          [$style['shadow-bottom']]: !bottom,
        }
      ]
    ]"
  >
    <div
      ref="scrollEl"
      class="relative overflow-auto w-full"
      :class="[
        [horizontal ? 'overflow-x-auto' : 'overflow-y-auto'],
        {
          [$style.hideScroll]: !scrollbar,
        }
      ]"
    >
      <slot></slot>
    </div>
  </div>
</template>

<style lang="postcss" module>
.scrollWrap {
  &:before, &:after {
    content: "";
    pointer-events: none;
    position: absolute;
    z-index: 1;
    transition: box-shadow .2s;
  }

  &.horizontal:before, &.horizontal:after {
    top: 0;
    bottom: 0;
    width: 20px;
  }

  &.vertical:before, &.vertical:after {
    right: 0;
    left: 0;
    height: 20px;
  }

  &.horizontal:before {
    left: 0;
  }
  &.horizontal:after {
    right: 0;
  }
  &.vertical:before {
    top: 0;
  }
  &.vertical:after {
    bottom: 0;
  }

  &.shadow-left:before {
    box-shadow: inset 12px 0 10px -10px rgb(0 0 0 / 7%);
  }

  &.shadow-right:after {
    box-shadow: inset -12px 0 10px -10px rgb(0 0 0 / 7%);
  }

  &.shadow-top:before {
    box-shadow: inset 0 12px 10px -10px rgb(0 0 0 / 7%);
  }

  &.shadow-bottom:after {
    box-shadow: inset 0 -12px 10px -10px rgb(0 0 0 / 7%);
  }
}

.hideScroll {
  -ms-overflow-style: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
}
</style>
