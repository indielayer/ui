<script lang="ts">
import type { PropType } from 'vue'
import { optionalBooleanProp } from '../../common/props'

const sliderProps = {
  ...useColors.props('primary'),
  ...useInteractive.props(),
  ...useInputtable.props(),
  min: {
    type: [Number, String],
    default: 0,
    description: 'Minimum value of the range.',
  },
  max: {
    type: [Number, String],
    default: 100,
    description: 'Maximum value of the range.',
  },
  step: {
    type: [Number, String],
    default: 1,
    description: 'Increment between selectable values. Use `"mark"` to restrict selection to `marks` keys.',
  },
  marks: {
    type: Object as PropType<Record<number, string>>,
    description: 'Tick labels keyed by value within `[min, max]` (e.g. `{ 0: \'0°C\', 100: \'100°C\' }`).',
  },
  showTooltip: optionalBooleanProp('Shows the current value above the thumb while hovering or focusing.'),
  formatTooltip: {
    type: Function as PropType<(value: number) => string>,
    description: 'Formats the thumb tooltip text. Defaults to `String(value)`.',
  },
}

export type SliderProps = ExtractPublicPropTypes<typeof sliderProps>

type InternalClasses = 'wrapper' | 'input' | 'track' | 'progress' | 'mark' | 'markLabel' | 'valueTooltip'
export interface SliderTheme extends ThemeComponent<SliderProps, InternalClasses> {}

export default {
  name: 'XSlider',
  inheritAttrs: false,
  validators: {
    ...useCommon.validators(),
  },
  docs: {
    slots: {
      prefix: 'Content before the track (`value`).',
      suffix: 'Content after the track (`value`).',
    },
    emits: {
      ...useInputtable.emitDocs(),
    },
    methods: {
      ...useInputtable.methodDocs(),
    },
  },
}
</script>

<script setup lang="ts">
import { ref, watch, unref, type ExtractPublicPropTypes, computed } from 'vue'
import { useCommon } from '../../composables/useCommon'
import { useColors } from '../../composables/useColors'
import { useInteractive } from '../../composables/useInteractive'
import { useInputtable } from '../../composables/useInputtable'
import { useFallthroughNativeAttrs } from '../../composables/useFallthroughNativeAttrs'
import { useResolvedComponentProps } from '../../composables/resolveComponentDefaults'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

import XLabel from '../label/Label.vue'
import XInputFooter from '../inputFooter/InputFooter.vue'

const props = defineProps(sliderProps)
const resolvedProps = useResolvedComponentProps('Slider', props)

const emit = defineEmits(useInputtable.emits())

const fallthrough = useFallthroughNativeAttrs()

const elRef = ref<HTMLInputElement | null>(null)
const value = ref<number>(Number(props.modelValue ?? 0))
const tipHover = ref(false)
const tipFocus = ref(false)

const { focus, blur } = useInteractive(elRef)

watch(() => props.modelValue, (val) => {
  value.value = Number(val ?? 0)
})

watch(value, (val) => {
  emit('update:modelValue', val)
})

const minNum = computed(() => Number(props.min))
const maxNum = computed(() => Number(props.max))

const progress = computed(() => {
  const range = maxNum.value - minNum.value

  if (range === 0) return 0

  return ((value.value - minNum.value) / range) * 100
})

const isStepMark = computed(() => props.step === 'mark')

const markEntries = computed(() => {
  if (!props.marks) return []

  return Object.entries(props.marks)
    .map(([key, label]) => ({
      value: Number(key),
      label,
    }))
    .filter((entry) => !Number.isNaN(entry.value))
    .sort((a, b) => a.value - b.value)
})

const markValues = computed(() => markEntries.value.map((entry) => entry.value))

const nativeStep = computed(() => (isStepMark.value ? 'any' : props.step))

const tipVisible = computed(() => Boolean(resolvedProps.value.showTooltip) && (tipHover.value || tipFocus.value))

const tipText = computed(() => {
  if (typeof props.formatTooltip === 'function') return props.formatTooltip(value.value)

  return String(value.value)
})

const markPosition = (markValue: number) => {
  const range = maxNum.value - minNum.value

  if (range === 0) return 0

  return ((markValue - minNum.value) / range) * 100
}

const markAlign = (markValue: number) => {
  const pct = markPosition(markValue)

  if (pct <= 0) return 'start'
  if (pct >= 100) return 'end'

  return 'center'
}

const markStyle = (markValue: number) => {
  const pct = markPosition(markValue)
  const align = markAlign(markValue)

  return {
    left: `${pct}%`,
    transform: align === 'start'
      ? 'translateX(0)'
      : align === 'end'
        ? 'translateX(-100%)'
        : 'translateX(-50%)',
  }
}

const snapToNearestMark = (raw: number) => {
  const marks = markValues.value

  if (!marks.length) return raw

  let nearest = marks[0]
  let best = Math.abs(raw - nearest)

  for (let i = 1; i < marks.length; i++) {
    const distance = Math.abs(raw - marks[i])

    if (distance < best) {
      best = distance
      nearest = marks[i]
    }
  }

  return nearest
}

const stepMarkBy = (direction: -1 | 1) => {
  const marks = markValues.value

  if (!marks.length) return

  const current = snapToNearestMark(value.value)
  const index = marks.indexOf(current)
  const nextIndex = Math.min(marks.length - 1, Math.max(0, index + direction))

  value.value = marks[nextIndex]
}

const selectMark = (markValue: number) => {
  if (props.disabled || props.readonly) return
  value.value = markValue
}

const onMarkKeydown = (event: KeyboardEvent) => {
  if (!isStepMark.value || props.disabled || props.readonly) return

  switch (event.key) {
    case 'ArrowLeft':
    case 'ArrowDown':
      event.preventDefault()
      stepMarkBy(-1)
      break
    case 'ArrowRight':
    case 'ArrowUp':
      event.preventDefault()
      stepMarkBy(1)
      break
    case 'Home':
      event.preventDefault()
      value.value = markValues.value[0]
      break
    case 'End':
      event.preventDefault()
      value.value = markValues.value[markValues.value.length - 1]
      break
  }
}

const {
  errorInternal,
  hideFooterInternal,
  isInsideForm,
  isInsideInputGroup,
  inputListeners,
  reset,
  validate,
  setError,
} = useInputtable(props, { focus, emit })

const sliderListeners = computed(() => {
  const base = unref(inputListeners)

  return {
    ...base,
    focus: (event: Event) => {
      tipFocus.value = true
      base.focus(event)
    },
    blur: (event: Event) => {
      tipFocus.value = false
      base.blur(event)
    },
    input: (event: Event) => {
      const target = event.target as HTMLInputElement

      if (isStepMark.value) {
        target.value = String(snapToNearestMark(Number(target.value)))
      }

      base.input(event)
    },
  }
})

const { styles, classes, className } = useTheme('Slider', {}, props)

defineExpose({ focus, blur, reset, validate, setError })
</script>

<template>
  <x-label
    v-bind="fallthrough.wrapperAttrs"
    :style="[fallthrough.wrapperStyle, styles]"
    :disabled="disabled"
    :required="required"
    :is-inside-form="isInsideForm"
    :is-inside-input-group="isInsideInputGroup"
    :label="label"
    :class="[
      fallthrough.wrapperClass,
      className,
      classes.wrapper,
    ]"
    :tooltip="tooltip"
  >
    <div class="w-full">
      <div class="flex items-center relative w-full gap-2 min-h-5">
        <slot name="prefix" :value="value"></slot>
        <div
          class="relative flex items-center flex-1 h-5"
          @mouseenter="tipHover = true"
          @mouseleave="tipHover = false"
        >
          <input
            v-bind="fallthrough.nativeAttrs"
            :id="id"
            ref="elRef"
            type="range"
            :class="[classes.input, 'absolute z-10 inset-x-0 appearance-none bg-transparent focus:outline-hidden focus-visible:outline-hidden']"
            :disabled="disabled"
            :name="name"
            :max="max"
            :min="min"
            :step="nativeStep"
            :readonly="readonly"
            :value="value"
            v-on="sliderListeners"
            @keydown="onMarkKeydown"
          />
          <div :class="['absolute inset-x-0', classes.track]">
            <div
              :class="classes.progress"
              :style="{ width: progress + '%' }"
            ></div>
          </div>

          <div
            v-if="tipVisible"
            :class="[classes.valueTooltip, 'pointer-events-none absolute z-20 -translate-x-1/2']"
            :style="{ left: progress + '%', bottom: 'calc(100% + 0.375rem)' }"
          >
            {{ tipText }}
            <span class="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-secondary-700"></span>
          </div>
        </div>
        <slot name="suffix" :value="value"></slot>
      </div>

      <div
        v-if="markEntries.length"
        class="relative mt-1.5 h-4 w-full"
      >
        <button
          v-for="mark in markEntries"
          :key="mark.value"
          type="button"
          :class="[
            classes.mark,
            markAlign(mark.value) === 'start' && 'text-left',
            markAlign(mark.value) === 'end' && 'text-right',
            markAlign(mark.value) === 'center' && 'text-center',
          ]"
          :style="markStyle(mark.value)"
          :disabled="disabled || readonly"
          :aria-label="mark.label"
          @click="selectMark(mark.value)"
        >
          <span :class="classes.markLabel">{{ mark.label }}</span>
        </button>
      </div>
    </div>

    <x-input-footer v-if="!hideFooterInternal" :error="errorInternal" :helper="helper"/>
  </x-label>
</template>

<style scoped>
[type="range"]::-webkit-slider-thumb {
  appearance: none;
  background-color: #fff;
  border: 2px solid var(--x-slider-bg);
  border-radius: 9999px;
  box-shadow: var(--ui-shadow-sm);
  cursor: pointer;
  height: 1.3rem;
  width: 1.3rem;
}

[type="range"]:focus::-webkit-slider-thumb {
  box-shadow: var(--ui-shadow-sm), 0 0 0 1px #fff, 0 0 0 3px var(--color-primary-500, currentColor);
}

[type="range"]::-moz-range-thumb {
  background-color: white;
  border: 2px solid var(--x-slider-bg);
  border-radius: 9999px;
  box-shadow: var(--ui-shadow-sm);
  cursor: pointer;
  height: 1.3rem;
  width: 1.3rem;
}

[type="range"]:focus::-moz-range-thumb {
  box-shadow: var(--ui-shadow-sm), 0 0 0 1px #fff, 0 0 0 3px var(--color-primary-500, currentColor);
}
</style>
