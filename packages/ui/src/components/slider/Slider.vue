<script lang="ts">
import { computed, defineComponent, ref, watch } from 'vue'
import { useCSS } from '@/composables/css'
import { useCommon } from '@/composables/common'
import { useColors } from '@/composables/colors'
import { useInteractive } from '@/composables/interactive'
import { useInputtable } from '@/composables/inputtable'

import { useEventListener } from '@vueuse/core'

import XProgress from '@/components/progress/Progress.vue'

export default defineComponent({
  name: 'XSlider',

  components: {
    XProgress,
  },

  validators: {
    ...useCommon.validators(),
  },

  props: {
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
  },

  emits: useInputtable.emits(false),

  setup(props, { emit }) {
    const elRef = ref<HTMLElement>()
    const dragRef = ref<HTMLElement>()
    const progressRef = ref<HTMLElement>()
    const draggingElement = ref<HTMLElement>()
    const value = ref<number>(Number(props.modelValue ?? 0))

    const interactive = useInteractive(elRef)

    const labelClasses = computed(() => {
      if (props.size === 'xs') return 'text-xs'
      else if (props.size === 'sm') return 'text-sm'
      else if (props.size === 'lg') return 'text-lg'
      else if (props.size === 'xl') return 'text-xl'

      return ''
    })

    const css = useCSS('slider')
    const colors = useColors()
    const style = computed(() => {
      const color = colors.getPalette(props.color)

      return css.variables({
        bg: color[500],
        // width: value.value + '%',
      })
    })

    watch(() => props.modelValue, (val) => {
      value.value = Number(val ?? 0)
    })

    watch(value, (val) => {
      emit('update:modelValue', val)
    })

    const initial = ref()
    const position = ref()
    const isDragging = computed(() => !!initial.value)

    function startProgressDrag(e: PointerEvent) {
      e.stopPropagation()
      if (!dragRef.value || !progressRef.value) return

      interactive.focus()

      const maxWidth = progressRef.value.offsetWidth
      let percent = Math.floor(e.offsetX * 100 / maxWidth)

      console.log(e, e.offsetX, percent)

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

      interactive.focus()

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

    useEventListener(progressRef, 'pointerdown', startProgressDrag, false)
    useEventListener(dragRef, 'pointerdown', startDrag, false)
    useEventListener(window, 'pointermove', moveDrag, true)
    useEventListener(window, 'pointerup', endDrag, true)

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

    return {
      ...interactive,
      ...useInputtable(props, { focus: interactive.focus, emit, withListeners: false }),
      labelClasses,
      draggingElement,
      value,
      elRef,
      dragRef,
      progressRef,
      style,
      isDragging,
      position,
    }
  },
})
</script>

<template>
  <label
    ref="elRef"
    tabindex="0"
    class="group inline-block relative align-bottom text-left focus:outline-none"
    :class="{ 'mb-3': isInsideForm }"
    :style="style"
  >
    <p
      v-if="label"
      class="font-medium text-gray-800 dark:text-gray-200 mb-1"
      :class="labelClasses"
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
          class="absolute w-[20px] h-[20px] -mt-[13px] -ml-[10px] rounded-full bg-white border shadow-sm group-focus:border-primary-500"
          :class="[isDragging ? 'cursor-grabbing' : 'cursor-grab']"
          :style="`left: ${value}%;`"
        ></div>
      </div>
      <slot name="suffix" :value="value"></slot>
    </div>

    <p v-if="errorInternal" class="text-sm text-error-500 mt-1" v-text="errorInternal"></p>
  </label>
</template>
