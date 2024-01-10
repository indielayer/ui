<script lang="ts">
const validators = {
  align: ['bottom', 'center', 'left', 'right', 'top'] as const,
  position: ['bottom', 'left', 'right', 'top'] as const,
}

const popoverProps = {
  align: {
    type: String as PropType<PopoverAlign>,
    default: 'center',
    validator: (value: string) => validators.align.includes(value as PopoverAlign),
  },
  position: {
    type: String as PropType<PopoverPosition>,
    default: 'bottom',
    validator: (value: string) => validators.position.includes(value as PopoverPosition),
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
}

export type PopoverAlign = typeof validators.align[number]
export type PopoverPosition = typeof validators.position[number]
export type PopoverProps = ExtractPublicPropTypes<typeof popoverProps>

type InternalClasses = 'wrapper' | 'content'
export interface PopoverTheme extends ThemeComponent<PopoverProps, InternalClasses> {}

export default {
  name: 'XPopover',
  validators,
}
</script>

<script setup lang="ts">
import { computed, ref, useCssModule, watch, type PropType, type ExtractPublicPropTypes } from 'vue'
import { onClickOutside, useEventListener } from '@vueuse/core'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(popoverProps)

const emit = defineEmits(['open', 'close', 'toggle'])

const elRef = ref<HTMLElement | null>(null)
const contentRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)

let stopClickOutside: undefined | (() => void) = undefined

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

  if (position === 'top') c.push(`bottom-full ${$style['popover-top']}`)
  if (position === 'bottom') c.push(`top-full bottom-0 ${$style['popover-bottom']}`)
  if (position === 'right') c.push(`left-full ${$style['popover-right']}`)
  if (position === 'left') c.push(`right-full left-auto ${$style['popover-left']}`)

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

const { styles, classes, className } = useTheme('Popover', {}, props)

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
        $style['popover-content'],
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
  .popover-content {
    visibility: hidden;
    transition-duration: 0.1s;
    transition-timing-function: cubic-bezier(0.4, 0, 1, 1);
  }

  .popover-top {
    --tw-translate-y: 0.5rem;
  }

  .popover-right {
    --tw-translate-x: -0.5rem;
  }

  .popover-bottom {
    --tw-translate-y: -0.5rem;
  }

  .popover-left {
    --tw-translate-x: 0.5rem;
  }

  &.is-open .popover-content,
  &.hover:hover .popover-content {
    visibility: visible;
    transition-duration: 0.15s;
    transition-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }

  &.is-open .popover-top,
  &.hover:hover .popover-top {
    --tw-translate-y: -0.25rem;
  }

  &.is-open .popover-right,
  &.hover:hover .popover-right {
    --tw-translate-x: 0.25rem;
  }

  &.is-open .popover-bottom,
  &.hover:hover .popover-bottom {
    --tw-translate-y: 0.25rem;
  }

  &.is-open .popover-left,
  &.hover:hover .popover-left {
    --tw-translate-x: -0.25rem;
  }
}
</style>
