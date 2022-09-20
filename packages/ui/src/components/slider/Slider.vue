<script lang="ts">
export default { name: 'XSlider' }
</script>

<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useEventListener } from '@vueuse/core'
import { useCommon } from '../../composables/common'
import { useColors } from '../../composables/colors'
import { useInteractive } from '../../composables/interactive'
import { useInputtable } from '../../composables/inputtable'
import { useTheme } from '../../composables/theme'

import XProgress from '../../components/progress/Progress.vue'

import theme from './Slider.theme'

const props = defineProps({
  ...useCommon.props(),
  ...useColors.props('primary'),
  ...useInteractive.props(),
  ...useInputtable.props(),
  label: String,
  min: Number,
  max: Number,
  step: {
    type: Number,
    default: 1,
  },
  gradient: Boolean,
})

const emit = defineEmits(useInputtable.emits(false))

const elRef = ref<HTMLElement | null>(null)
const dragRef = ref<HTMLElement | null>(null)
const progressRef = ref<HTMLElement | null>(null)
const value = ref<number>(Number(props.modelValue ?? 0))

const { focus, blur } = useInteractive(elRef)

watch(() => props.modelValue, (val) => {
  value.value = Number(val ?? 0)
})

watch(value, (val) => {
  emit('update:modelValue', val)
})

const initial = ref()
const isDragging = computed(() => !!initial.value)

function startProgressDrag(e: PointerEvent) {
  e.stopPropagation()
  if (!dragRef.value || !progressRef.value) return

  focus()

  const maxWidth = progressRef.value.offsetWidth
  let percent = Math.floor(e.offsetX * 100 / maxWidth)

  if (percent < 0) percent = 0
  if (percent > 100) percent = 100

  value.value = percent

  setTimeout(() => {
    initial.value = {
      x: e.x,
      y: e.y,
      maxWidth,
      offsetX: dragRef.value?.offsetLeft,
    }
  })
  e.preventDefault()
  e.stopPropagation()
}

function startDrag(e: PointerEvent) {
  if (!dragRef.value || !progressRef.value) return

  focus()

  initial.value = {
    x: e.x,
    y: e.y,
    maxWidth: progressRef.value.offsetWidth,
    offsetX: dragRef.value.offsetLeft,
  }

  e.preventDefault()
  e.stopPropagation()
}

function moveDrag(e: PointerEvent) {
  if (!initial.value || !dragRef.value) return

  const { x, maxWidth, offsetX } = initial.value
  const movedX = e.x - x

  if (movedX === 0) return

  const newMoveX = offsetX + movedX
  let percent = Math.floor(newMoveX * 100 / maxWidth)

  if (percent < 0) percent = 0
  if (percent > 100) percent = 100

  value.value = percent

  e.preventDefault()
  e.stopPropagation()
}

function endDrag(e: PointerEvent) {
  if (!initial.value) return
  initial.value = undefined
  e.preventDefault()
  e.stopPropagation()
}

if (typeof window !== 'undefined') {
  useEventListener(progressRef, 'pointerdown', startProgressDrag, false)
  useEventListener(dragRef, 'pointerdown', startDrag, false)
  useEventListener(window, 'pointermove', moveDrag, true)
  useEventListener(window, 'pointerup', endDrag, true)
}

useEventListener(elRef, 'keydown', handleKeydown)

function handleKeydown(e: KeyboardEvent) {
  if (e.code === 'ArrowLeft') {
    const nextValue = value.value - 1

    if (nextValue >= 0) value.value = nextValue

    e.preventDefault()
  } else if (e.code === 'ArrowRight') {
    const nextValue = value.value + 1

    if (nextValue <= 100) value.value = nextValue

    e.preventDefault()
  }
}

const {
  errorInternal,
  reset,
  validate,
  setError,
  isInsideForm,
} = useInputtable(props, { focus, emit, withListeners: false })

const { styles, classes, className } = useTheme('slider', theme, props)

defineExpose({ focus, blur, reset, validate, setError })
</script>

<template>
  <label
    ref="elRef"
    tabindex="0"
    class="group relative"
    :class="[
      className,
      classes.wrapper,
      { 'mb-3': isInsideForm }
    ]"
    :style="styles"
  >
    <p
      v-if="label"
      :class="classes.label"
      v-text="label"
    ></p>

    <div class="flex items-center relative w-full" >
      <slot name="prefix" :value="value"></slot>
      <div
        ref="progressRef"
        :class="[isDragging ? 'cursor-grabbing' : 'cursor-grab']"
        class="relative w-full py-2 mx-2"
      >
        <div class="-mx-2">
          <x-progress
            :percentage="value"
            :animate="false"
            thick
            class="w-full"
            :gradient="gradient"
          />
        </div>
        <div
          ref="dragRef"
          class="absolute group-focus:border-[color:var(--x-slider-border)]"
          :class="[
            classes.drag,
            isDragging ? 'cursor-grabbing' : 'cursor-grab'
          ]"
          :style="`left: ${value}%;`"
        ></div>
      </div>
      <slot name="suffix" :value="value"></slot>
    </div>

    <p v-if="errorInternal" class="text-sm text-red-500 mt-1" v-text="errorInternal"></p>
  </label>
</template>
