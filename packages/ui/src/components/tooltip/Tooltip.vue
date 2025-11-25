<script lang="ts">
const tooltipProps = {
  tag: {
    type: String,
    default: 'div',
  },
  tooltip: String,
  disabled: Boolean,
  position: {
    type: String as PropType<TooltipPosition>,
    default: 'bottom',
  },
}

export type TooltipPosition = 'top' | 'bottom' | 'left' | 'right'

export type TooltipProps = ExtractPublicPropTypes<typeof tooltipProps>

type InternalClasses = 'tooltip'
export interface TooltipTheme extends ThemeComponent<TooltipProps, InternalClasses> {}

export default { name: 'XTooltip' }
</script>

<script setup lang="ts">
import { computed, ref, useSlots } from 'vue'
import type { ExtractPublicPropTypes, PropType } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(tooltipProps)

const triggerRef = ref<HTMLElement | null>(null)
const tooltipRef = ref<HTMLElement | null>(null)
const isVisible = ref(false)
const tooltipStyle = ref<Record<string, string>>({})
const actualPosition = ref<TooltipPosition>(props.position)

const slots = useSlots()
const hasTooltip = computed(() => props.tooltip || slots.tooltip)

const computedDisabled = computed(() => props.disabled || !hasTooltip.value)

const arrowPositionClasses = computed(() => {
  if (computedDisabled.value) return ''

  const placements = {
    top: '-bottom-2.5 left-1/2 -translate-x-1/2 w-3.5',
    bottom: '-top-2.5 left-1/2 -translate-x-1/2 w-3.5',
    left: '-right-2.5 top-1/2 -translate-y-1/2 h-3.5',
    right: '-left-2.5 top-1/2 -translate-y-1/2 h-3.5',
  }

  return placements[actualPosition.value]
})

const arrowRotationClasses = computed(() => {
  if (computedDisabled.value) return ''

  const placements = {
    top: '-rotate-45 origin-top-left',
    bottom: 'rotate-45 origin-bottom-left',
    left: 'rotate-45 origin-top-left',
    right: '-rotate-45 origin-top-right',
  }

  return placements[actualPosition.value]
})

const animationOriginClasses = computed(() => {
  if (computedDisabled.value) return ''

  const origins = {
    top: 'origin-bottom',
    bottom: 'origin-top',
    left: 'origin-right',
    right: 'origin-left',
  }

  return origins[actualPosition.value]
})

const calculatePosition = () => {
  if (!triggerRef.value || !tooltipRef.value) return

  const triggerRect = triggerRef.value.getBoundingClientRect()
  const tooltipRect = tooltipRef.value.getBoundingClientRect()
  const spacing = 8 // 0.5rem = 8px
  const viewportWidth = window.innerWidth
  const viewportHeight = window.innerHeight

  let position = props.position
  let top = 0
  let left = 0

  // Calculate initial position based on placement
  switch (position) {
    case 'top':
      top = triggerRect.top - tooltipRect.height - spacing
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
      // Check if tooltip goes off-screen top
      if (top < 0) {
        position = 'bottom'
        top = triggerRect.bottom + spacing
      }
      break
    case 'bottom':
      top = triggerRect.bottom + spacing
      left = triggerRect.left + triggerRect.width / 2 - tooltipRect.width / 2
      // Check if tooltip goes off-screen bottom
      if (top + tooltipRect.height > viewportHeight) {
        position = 'top'
        top = triggerRect.top - tooltipRect.height - spacing
      }
      break
    case 'left':
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
      left = triggerRect.left - tooltipRect.width - spacing
      // Check if tooltip goes off-screen left
      if (left < 0) {
        position = 'right'
        left = triggerRect.right + spacing
      }
      break
    case 'right':
      top = triggerRect.top + triggerRect.height / 2 - tooltipRect.height / 2
      left = triggerRect.right + spacing
      // Check if tooltip goes off-screen right
      if (left + tooltipRect.width > viewportWidth) {
        position = 'left'
        left = triggerRect.left - tooltipRect.width - spacing
      }
      break
  }

  // Adjust horizontal position to stay within viewport
  if (position === 'top' || position === 'bottom') {
    if (left < 0) left = spacing
    if (left + tooltipRect.width > viewportWidth) {
      left = viewportWidth - tooltipRect.width - spacing
    }
  }

  // Adjust vertical position to stay within viewport
  if (position === 'left' || position === 'right') {
    if (top < 0) top = spacing
    if (top + tooltipRect.height > viewportHeight) {
      top = viewportHeight - tooltipRect.height - spacing
    }
  }

  actualPosition.value = position
  tooltipStyle.value = {
    top: `${top}px`,
    left: `${left}px`,
  }
}

const showTooltip = () => {
  if (computedDisabled.value) return
  isVisible.value = true
  setTimeout(calculatePosition, 0)
}

const hideTooltip = () => {
  if (computedDisabled.value) return
  isVisible.value = false
}

const { classes, className } = useTheme('Tooltip', {}, props)
</script>

<template>
  <component
    :is="tag"
    ref="triggerRef"
    :class="[
      className,
      {
        'inline-block': !$attrs.class,
      }]"
    @mouseenter="showTooltip"
    @mouseleave="hideTooltip"
  >
    <slot></slot>

    <teleport v-if="!computedDisabled" to="body">
      <transition
        enter-active-class="transition-opacity duration-150 ease-out"
        leave-active-class="transition-opacity duration-150 ease-in"
        enter-from-class="opacity-0"
        enter-to-class="opacity-100"
        leave-from-class="opacity-100"
        leave-to-class="opacity-0"
      >
        <div
          v-if="isVisible"
          ref="tooltipRef"
          :style="tooltipStyle"
          class="fixed z-[10001] pointer-events-none"
          :class="[
            classes.tooltip,
            animationOriginClasses
          ]"
        >
          <slot name="tooltip">{{ tooltip }}</slot>
          <div :class="['absolute overflow-hidden shadow-lg z-10', arrowPositionClasses]">
            <div :class="['h-2.5 w-2.5 bg-secondary-700 transform border border-secondary-800', arrowRotationClasses]"></div>
          </div>
        </div>
      </transition>
    </teleport>
  </component>
</template>
