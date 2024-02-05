<script lang="ts">
const drawerPosition = ['left', 'right', 'top', 'bottom'] as const
const drawerProps = {
  modelValue: Boolean,
  position: {
    type: String as PropType<DrawerPosition>,
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
}

export type DrawerPosition = typeof drawerPosition[number]
export type DrawerProps = ExtractPublicPropTypes<typeof drawerProps>

type InternalClasses = 'wrapper' | 'backdrop'
export interface DrawerTheme extends ThemeComponent<DrawerProps, InternalClasses> {}

export default {
  name: 'XDrawer',
  inheritAttrs: false,
  validators: {
    position: drawerPosition,
  },
}
</script>

<script setup lang="ts">
import { computed, onMounted, ref, watch, watchEffect, type PropType, type ExtractPublicPropTypes } from 'vue'
import { breakpointsTailwind, useBreakpoints, useEventListener, useSwipe, type Breakpoints, type UseSwipeDirection } from '@vueuse/core'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

import XScroll from '../../components/scroll/Scroll.vue'

const props = defineProps(drawerProps)

const emit = defineEmits(['update:modelValue'])

const detached = ref<boolean>(true)
const value = ref<boolean>(props.modelValue)
const backdropRef = ref<HTMLElement | null>(null)
const drawerRef = ref<HTMLElement | null>(null)

const deferShow = ref<boolean>(false)

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
  // onSwipeEnd(e: TouchEvent, direction: UseSwipeDirection) {
  //   if (lengthX.value < 0 && props.width && (Math.abs(lengthX.value) / props.width) >= 0.5) {
  //     left.value = '100%'
  //   } else {
  //     left.value = '0'
  //   }
  // },
  onSwipeEnd(e: TouchEvent, direction: UseSwipeDirection) {
    if (detached.value) {
      if (
        (props.position === 'left' && direction === 'left') ||
            (props.position === 'right' && direction === 'right') ||
            (props.position === 'top' && direction === 'up') ||
            (props.position === 'bottom' && direction === 'down')
      ) close()
    }
  },
})

const autoStyles = computed(() => {
  const s: Record<string, string> = {}

  if (props.position === 'left' || props.position === 'right') s['width'] = `${props.width}px`
  else if (props.position === 'top' || props.position === 'bottom') s['height'] = `${props.height}px`

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

function onBeforeEnter(el: Element) {
  el.classList.add('inset-0')
  if (props.position === 'top') (el as HTMLElement).style.top = `-${props.height}px`
  else if (props.position === 'bottom') (el as HTMLElement).style.bottom = `-${props.height}px`
  else if (props.position === 'left') (el as HTMLElement).style.left = `-${props.width}px`
  else if (props.position === 'right') (el as HTMLElement).style.right = `-${props.width}px`
}

function onEnter(el: Element, done: () => void) {
  if (!detached.value) {
    done()

    return
  }
  el.addEventListener('transitionend', done)
  setTimeout(() => {
    if (props.backdrop) el.classList.add('bg-slate-500/30')
    if (props.position === 'top') (el as HTMLElement).style.top = '0'
    else if (props.position === 'bottom') (el as HTMLElement).style.bottom = '0'
    else if (props.position === 'left') (el as HTMLElement).style.left = '0'
    else if (props.position === 'right') (el as HTMLElement).style.right = '0'
  }, 1)
}

function onBeforeLeave(el: Element) {}

function onLeave(el: Element, done: () => void) {
  el.addEventListener('transitionend', done)
  setTimeout(() => {
    if (props.backdrop) el.classList.remove('bg-slate-500/30')
    if (props.position === 'top') (el as HTMLElement).style.top = `-${props.height}px`
    else if (props.position === 'bottom') (el as HTMLElement).style.bottom = `-${props.height}px`
    else if (props.position === 'left') (el as HTMLElement).style.left = `-${props.width}px`
    else if (props.position === 'right') (el as HTMLElement).style.right = `-${props.width}px`
  }, 1)
}

function onAfterLeave(el: Element) {
  el.classList.remove('inset-0')
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

const { styles, classes, className } = useTheme('Drawer', {}, props)

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
      @after-leave="onAfterLeave"
    >
      <div
        v-show="breakpoint ? (value && point || !point) : value"
        ref="backdropRef"
        :class="[
          $attrs.class,
          classes.backdrop,
          detached || !breakpoint ? 'absolute z-40' : '',
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
