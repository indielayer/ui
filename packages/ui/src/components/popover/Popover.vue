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
import { onClickOutside } from '@vueuse/core'
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
  disabled: Boolean,
  hover: Boolean,
  block: Boolean,
})

const emit = defineEmits(['open', 'close', 'toggle'])

const elRef = ref<HTMLElement | null>(null)
const isOpen = ref(false)

let stopClickOutside: undefined | (()=> void) = undefined

watch(isOpen, (newValue) => {
  if (props.hover) return

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
const contentClasses = computed(() => {
  const c = []

  c.push({
    // align-left
    'left-0 right-auto': props.align === 'left' && ['bottom', 'top'].includes(props.position),
    // align-center
    'left-1/2 right-auto -translate-x-1/2': props.align === 'center' && ['bottom', 'top'].includes(props.position),
    // align-right
    'right-0 left-auto': props.align === 'right' && ['bottom', 'top'].includes(props.position),
    // align-top
    'top-0 bottom-auto': props.align === 'top' && ['left', 'right'].includes(props.position),
    // align-middle
    '-translate-y-1/2 top-1/2 bottom-auto': props.align === 'center' && ['left', 'right'].includes(props.position),
    // align-bottom
    'bottom-0': props.align === 'bottom' && ['left', 'right'].includes(props.position),
  })

  if (props.position === 'top') c.push(`bottom-full pb-2 ${$style.popoverTop}`)
  if (props.position === 'right') c.push(`left-full pl-2 ${$style.popoverRight}`)
  if (props.position === 'bottom') c.push(`top-full bottom-0 ${$style.popoverBottom}`)
  if (props.position === 'left') c.push(`right-full left-auto pr-2 ${$style.popoverLeft}`)

  if (props.block) c.push('min-w-full')

  return c
})

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
      class="absolute bottom-0 left-0 right-0 sm:p-0 transform transition-transform z-40"
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
    --tw-translate-y: -0.25rem;
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
    --tw-translate-y: 0.25rem;
  }

  &.hover:hover .popoverRight,
  &.is-open .popoverRight {
    --tw-translate-x: 0px;
  }

  &.hover:hover .popoverBottom,
  &.is-open .popoverBottom {
    --tw-translate-y: 0.25rem;
  }

  &.hover:hover .popoverLeft,
  &.is-open .popoverLeft {
    --tw-translate-x: 0px;
  }
}
</style>
