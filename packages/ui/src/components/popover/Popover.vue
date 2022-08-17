<script lang="ts">
const validators = {
  align: ['bottom','center','left','right','top'],
  position: ['bottom','left','right','top'],
}

export default {
  name: 'XPopover',
  validators,
}
</script>

<script setup lang="ts">
import { computed, ref, useCssModule, watch, type PropType } from 'vue'
import { onClickOutside, useEventListener } from '@vueuse/core'
import { useTheme } from '../../composables/theme'

import theme from './Popover.theme'

const props = defineProps({
  align: {
    type: String as PropType<'bottom' | 'center' | 'left' | 'right' | 'top'>,
    default: 'center',
    validator: (value: string) => validators.align.includes(value),
  },
  position: {
    type: String as PropType<'bottom' | 'left' | 'right' | 'top'>,
    default: 'bottom',
    validator: (value: string) => validators.position.includes(value),
  },
  dismissOnClick: {
    type: Boolean,
    default: true,
  },
  autoAlign: {
    type: Boolean,
    default: true,
  },
  disabled: Boolean,
  hover: Boolean,
  block: Boolean,
})

const emit = defineEmits(['open', 'close', 'toggle'])

const elRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)

let stopClickOutside: undefined | (()=> void) = undefined

watch(isOpen, (newValue) => {
  if (props.hover) return

  if (newValue) {
    checkVisibility()
  } else {
    resetOutbounds()
  }

  if (stopClickOutside) {
    stopClickOutside()
    stopClickOutside = undefined
  }

  if (newValue) {
    setTimeout(() => {
      stopClickOutside = onClickOutside(elRef, close)
    })
  }
})

const $style = useCssModule()
const isOutLeft = ref(false)
const isOutRight = ref(false)
const isOutTop = ref(false)
const isOutBottom = ref(false)
const contentClasses = computed(() => {
  const c = []

  let align = props.align
  let position = props.position

  if (isOutTop.value) {
    if (position === 'top') position = 'bottom'
    else if ((position === 'left' || position === 'right')) align = 'top'
  }

  if (isOutBottom.value) {
    if (position === 'bottom') position = 'top'
    else if ((position === 'left' || position === 'right')) align = 'bottom'
  }

  if (isOutLeft.value) {
    if (position === 'left') position = 'right'
    else if ((position === 'top' || position === 'bottom')) align = 'left'
  }

  if (isOutRight.value) {
    if (position === 'right') position = 'left'
    else if ((position === 'top' || position === 'bottom')) align = 'right'
  }

  if (position === 'top') c.push(`bottom-full ${$style.popoverTop}`)
  if (position === 'bottom') c.push(`top-full bottom-0 ${$style.popoverBottom}`)
  if (position === 'right') c.push(`left-full ${$style.popoverRight}`)
  if (position === 'left') c.push(`right-full left-auto ${$style.popoverLeft}`)

  if (align === 'left' && ['bottom', 'top'].includes(position)) c.push('left-0 right-auto')
  if (align === 'center' && ['bottom', 'top'].includes(position)) c.push('left-1/2 right-auto -translate-x-1/2')
  if (align === 'right' && ['bottom', 'top'].includes(position)) c.push('right-0 left-auto')
  if (align === 'top' && ['left', 'right'].includes(position)) c.push('top-0 bottom-auto')
  if (align === 'center' && ['left', 'right'].includes(position)) c.push('-translate-y-1/2 top-1/2 bottom-auto')
  if (align === 'bottom' && ['left', 'right'].includes(position)) c.push('bottom-0')

  if (props.block) c.push('min-w-full')

  return c
})

if (props.hover) {
  useEventListener(elRef, 'mouseenter', checkVisibility)
  useEventListener(elRef, 'mouseleave', resetOutbounds)
}

function resetOutbounds() {
  isOutLeft.value = false
  isOutRight.value = false
  isOutTop.value = false
  isOutBottom.value = false
}

function checkVisibility() {
  if (!contentRef.value) return
  const clientRect = contentRef.value.getBoundingClientRect()

  isOutLeft.value = clientRect.left < 0
  isOutRight.value = clientRect.right > (window.innerWidth || document.documentElement.clientWidth)
  isOutTop.value = clientRect.top < 0
  isOutBottom.value = clientRect.bottom > (window.innerHeight || document.documentElement.clientHeight)
}

function close() {
  if (props.disabled) return
  isOpen.value = false
  emit('close')
}

function open() {
  if (props.disabled) return
  isOpen.value = true
  emit('open')
}

function toggle() {
  if (props.disabled) return
  isOpen.value = !isOpen.value
  emit('toggle', isOpen.value)
}

const { styles, classes, className } = useTheme('popover', theme, props)

defineExpose({ open, close, toggle, isOpen })
</script>

<template>
  <div
    ref="elRef"
    class="inline-block relative"
    :style="styles"
    :class="[
      className,
      classes.wrapper,
      $style.popover,
      [hover ? $style.hover : ''],
      [isOpen ? $style['is-open'] : ''],
      { 'w-full': block }
    ]"
  >
    <div class="flex" @click="!hover ? toggle() : null">
      <slot></slot>
    </div>

    <div
      ref="contentRef"
      class="absolute transform transition-transform z-40 h-fit"
      :class="[
        $style.popoverContent,
        contentClasses,
        classes.content
      ]"
      @click="dismissOnClick ? close() : null"
    >
      <slot name="content"></slot>
    </div>
  </div>
</template>

<style lang="postcss" module>
.popover {
  .popoverContent {
    visibility: hidden;
    transition-duration: .1s;
    transition-timing-function: cubic-bezier(.4,0,1,1);
  }
  .popoverTop {
    --tw-translate-y: 0.5rem;
  }
  .popoverRight {
    --tw-translate-x: -0.5rem;
  }
  .popoverBottom {
    --tw-translate-y: -0.5rem;
  }
  .popoverLeft {
    --tw-translate-x: 0.5rem;
  }

  &.hover:hover .popoverContent,
  &.is-open .popoverContent {
    visibility: visible;
    transition-duration: .15s;
    transition-timing-function: cubic-bezier(0,0,.2,1);
  }

  &.hover:hover .popoverTop,
  &.is-open .popoverTop {
    --tw-translate-y: -0.25rem;
  }

  &.hover:hover .popoverRight,
  &.is-open .popoverRight {
    --tw-translate-x: 0.25rem;
  }

  &.hover:hover .popoverBottom,
  &.is-open .popoverBottom {
    --tw-translate-y: 0.25rem;
  }

  &.hover:hover .popoverLeft,
  &.is-open .popoverLeft {
    --tw-translate-x: -0.25rem;
  }
}
</style>
