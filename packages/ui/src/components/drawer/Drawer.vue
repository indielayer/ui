<script lang="ts">
import { computed, defineComponent, onMounted, ref, watch, watchEffect, type PropType } from 'vue'
import { breakpointsTailwind, SwipeDirection, useBreakpoints, useEventListener, useSwipe, type Breakpoints } from '@vueuse/core'

import XScroll from '@/components/scroll/Scroll.vue'

export default defineComponent({
  components: {
    XScroll,
  },

  inheritAttrs: false,

  props: {
    modelValue: Boolean,
    position: {
      type: String as PropType<'left' | 'right' | 'top' | 'bottom'>,
      default: 'left',
    },
    to: {
      type: [String, Object] as PropType<string | HTMLElement>,
      default: 'body',
    },
    width: {
      type: [String, Number],
      default: 320,
    },
    height: {
      type: [String, Number],
      default: 320,
    },
    breakpoint: [String, Number],
    backdrop: {
      type: Boolean,
      default: true,
    },
  },

  emits: ['update:modelValue'],

  expose: ['open', 'close'],

  setup(props, { emit }) {
    const detached = ref<boolean>(true)
    const visible = ref<boolean>(true)
    const value = ref<boolean>(props.modelValue)
    const backdropRef = ref<HTMLElement | null>(null)
    const drawerRef = ref<HTMLElement | null>(null)

    const isTailwindBreakpoint = typeof props.breakpoint === 'string'
    const breakpoints = useBreakpoints(isTailwindBreakpoint ? breakpointsTailwind : { md: props.breakpoint || 768 } as Breakpoints)
    const point = breakpoints.smaller(isTailwindBreakpoint ? props.breakpoint : 'md')

    watchEffect(() => {
      if (props.breakpoint) {
        close()
        detached.value = point.value
      }
    })

    useEventListener(backdropRef, 'pointerdown', close)

    watch(() => props.modelValue, (val) => {
      value.value = val
    })

    useEventListener(document, 'keydown', onKeyDown)

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape' && value.value) close()
    }

    const { lengthX, lengthY } = useSwipe(drawerRef, {
      // passive: false,
      // onSwipe(e: TouchEvent) {
      //   if (lengthX.value < 0) {
      //     const length = Math.abs(lengthX.value)
      //     left.value = `${length}px`
      //   } else {
      //     left.value = '0'
      //   }
      // },
      // onSwipeEnd(e: TouchEvent, direction: SwipeDirection) {
      //   if (lengthX.value < 0 && props.width && (Math.abs(lengthX.value) / props.width) >= 0.5) {
      //     left.value = '100%'
      //   } else {
      //     left.value = '0'
      //   }
      // },
      onSwipeEnd(e: TouchEvent, direction: SwipeDirection) {
        if (detached.value) {
          if (
            (props.position === 'left' && direction === 'LEFT') ||
            (props.position === 'right' && direction === 'RIGHT') ||
            (props.position === 'top' && direction === 'UP') ||
            (props.position === 'bottom' && direction === 'DOWN')
          ) close()
        }
      },
    })

    function close(e?: PointerEvent) {
      if (e && e.target !== backdropRef.value) return
      value.value = false
      emit('update:modelValue', false)
    }

    function open() {
      value.value = true
      emit('update:modelValue', true)
    }

    const styles = computed(() => {
      const styles: Record<string, string> = {}

      if (props.position === 'left' || props.position === 'right') styles['width'] = props.width + 'px'
      else if (props.position === 'top' || props.position === 'bottom') styles['height'] = props.height + 'px'

      return styles
    })

    const classes = computed(() => {
      const classes = []

      if (detached.value) {
        classes.push('absolute shadow-lg')

        if (props.position === 'top') classes.push('top-0 inset-x-0')
        else if (props.position === 'bottom') classes.push('bottom-0 inset-x-0')
        else if (props.position === 'left') classes.push('left-0 inset-y-0')
        else if (props.position === 'right') classes.push('right-0 inset-y-0')
      }

      return classes
    })

    function onBeforeEnter(el: HTMLElement) {
      if (props.position === 'top') el.style.top = `-${props.height}px`
      else if (props.position === 'bottom') el.style.bottom = `-${props.height}px`
      else if (props.position === 'left') el.style.left = `-${props.width}px`
      else if (props.position === 'right') el.style.right = `-${props.width}px`
    }

    function onEnter(el: HTMLElement, done: ()=> void) {
      if (!detached.value) {
        done()

        return
      }
      el.addEventListener('transitionend', done)
      setTimeout(() => {
        if (props.backdrop) el.classList.add('bg-gray-500/30')
        if (props.position === 'top') el.style.top = '0'
        else if (props.position === 'bottom') el.style.bottom = '0'
        else if (props.position === 'left') el.style.left = '0'
        else if (props.position === 'right') el.style.right = '0'
      }, 1)
    }

    function onBeforeLeave(el: HTMLElement) {}

    function onLeave(el: HTMLElement, done: ()=> void) {
      el.addEventListener('transitionend', done)
      setTimeout(() => {
        if (props.backdrop) el.classList.remove('bg-gray-500/30')
        if (props.position === 'top') el.style.top = `-${props.height}px`
        else if (props.position === 'bottom') el.style.bottom = `-${props.height}px`
        else if (props.position === 'left') el.style.left = `-${props.width}px`
        else if (props.position === 'right') el.style.right = `-${props.width}px`
      }, 1)
    }

    const deferShow = ref<boolean>(!!(props.to && (props.to instanceof HTMLElement || document.querySelector(props.to))))

    onMounted(() => {
      deferShow.value = true
    })

    return {
      deferShow,
      backdropRef,
      drawerRef,
      visible,
      classes,
      styles,
      detached,
      value,
      open,
      close,
      onBeforeEnter,
      onEnter,
      onBeforeLeave,
      onLeave,
    }
  },
})
</script>

<template>
  <Teleport v-if="deferShow" :to="to" :disabled="!detached">
    <Transition
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
    >
      <div
        v-if="!detached || (detached && value)"
        ref="backdropRef"
        :class="[
          $attrs.class,
          {
            'absolute z-40 inset-0 duration-150 ease-in-out': detached,
          },
        ]"
      >
        <div
          v-if="detached && value"
          ref="swipeRef"
          class="flex flex-col max-h-full"
        ></div>
        <div
          ref="drawerRef"
          class="flex flex-col max-h-full bg-white dark:bg-gray-800"
          :class="classes"
          :style="styles"
        >
          <slot name="header"></slot>
          <x-scroll
            :scrollbar="false"
            vertical
            class="flex-1"
          >
            <slot></slot>
          </x-scroll>
          <slot name="footer"></slot>
        </div>
      </div>
    </Transition>
  </Teleport>
</template>
