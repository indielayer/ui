<script lang="ts">
export default {
  name: 'XDrawer',
  inheritAttrs: false,
}
</script>

<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect, type PropType } from 'vue'
import { breakpointsTailwind, SwipeDirection, useBreakpoints, useEventListener, useSwipe, type Breakpoints } from '@vueuse/core'
import { useTheme } from '../../composables/theme'

import XScroll from '../../components/scroll/Scroll.vue'

import theme from './Drawer.theme'

const props = defineProps({
  modelValue: Boolean,
  position: {
    type: String as PropType<'left' | 'right' | 'top' | 'bottom'>,
    default: 'left',
  },
  teleportTo: {
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
})

const emit = defineEmits(['update:modelValue'])

const detached = ref<boolean>(true)
const value = ref<boolean>(props.modelValue)
const backdropRef = ref<HTMLElement | null>(null)
const drawerRef = ref<HTMLElement | null>(null)

let deferShow = ref<boolean>(false)

if (typeof window !== 'undefined') deferShow = ref<boolean>(!!(props.teleportTo && (props.teleportTo instanceof HTMLElement || document.querySelector(props.teleportTo))))

const isTailwindBreakpoint = typeof props.breakpoint === 'string'
const breakpoints = useBreakpoints(isTailwindBreakpoint ? breakpointsTailwind : { md: props.breakpoint || 768 } as Breakpoints)
const point = breakpoints.smaller(isTailwindBreakpoint ? props.breakpoint : 'md')

watchEffect(() => {
  if (props.breakpoint) {
    if (point.value) {
      detached.value = true
      close()
    } else {
      detached.value = false
      open()
    }
  }
})

useEventListener(backdropRef, 'pointerdown', close)

watch(() => props.modelValue, (val) => {
  value.value = val
})

if (typeof window !== 'undefined') useEventListener(document, 'keydown', onKeyDown)

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

const autoStyles = computed(() => {
  const s: Record<string, string> = {}

  if (props.position === 'left' || props.position === 'right') s['width'] = props.width + 'px'
  else if (props.position === 'top' || props.position === 'bottom') s['height'] = props.height + 'px'

  return s
})

const autoClasses = computed(() => {
  const c = []

  if (detached.value) {
    c.push('absolute shadow-lg')

    if (props.position === 'top') c.push('top-0 inset-x-0')
    else if (props.position === 'bottom') c.push('bottom-0 inset-x-0')
    else if (props.position === 'left') c.push('left-0 inset-y-0')
    else if (props.position === 'right') c.push('right-0 inset-y-0')
  }

  return c
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

function close(e?: PointerEvent) {
  if (e && e.target !== backdropRef.value) return
  value.value = false
  emit('update:modelValue', false)
}

function open() {
  value.value = true
  emit('update:modelValue', true)
}

onMounted(() => {
  deferShow.value = true
})

const { styles, classes, className } = useTheme('drawer', theme, props)

defineExpose({ open, close })
</script>

<template>
  <teleport v-if="deferShow" :to="teleportTo" :disabled="!detached">
    <transition
      :css="false"
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
    >
      <div
        v-if="value"
        ref="backdropRef"
        :class="[
          $attrs.class,
          detached ? classes.backdrop : ''
        ]"
      >
        <div
          v-if="detached && value"
          ref="swipeRef"
          class="flex flex-col max-h-full"
        ></div>
        <div
          ref="drawerRef"
          :class="[
            className,
            autoClasses,
            classes.wrapper
          ]"
          :style="[autoStyles, styles]"
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
    </transition>
  </teleport>
</template>
