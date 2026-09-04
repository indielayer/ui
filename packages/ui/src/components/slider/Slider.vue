<script lang="ts">
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
    description: 'Increment between selectable values.',
  },
}

export type SliderProps = ExtractPublicPropTypes<typeof sliderProps>

type InternalClasses = 'wrapper' | 'input' | 'track' | 'progress'
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
import { ref, watch, type ExtractPublicPropTypes, computed } from 'vue'
import { useCommon } from '../../composables/useCommon'
import { useColors } from '../../composables/useColors'
import { useInteractive } from '../../composables/useInteractive'
import { useInputtable } from '../../composables/useInputtable'
import { useFallthroughNativeAttrs } from '../../composables/useFallthroughNativeAttrs'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

import XLabel from '../label/Label.vue'
import XInputFooter from '../inputFooter/InputFooter.vue'

const props = defineProps(sliderProps)

const emit = defineEmits(useInputtable.emits())

const fallthrough = useFallthroughNativeAttrs()

const elRef = ref<HTMLElement | null>(null)
const value = ref<number>(Number(props.modelValue ?? 0))

const { focus, blur } = useInteractive(elRef)

watch(() => props.modelValue, (val) => {
  value.value = Number(val ?? 0)
})

watch(value, (val) => {
  emit('update:modelValue', val)
})

const progress = computed(() => {
  return ((value.value - Number(props.min)) / (Number(props.max) - Number(props.min))) * 100
})

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
    <div class="flex items-center relative w-full gap-2 min-h-[1.25rem]">
      <slot name="prefix" :value="value"></slot>
      <div class="relative flex items-center flex-1">
        <input
          v-bind="fallthrough.nativeAttrs"
          :id="id"
          ref="elRef"
          type="range"
          :class="[classes.input, 'absolute z-10 appearance-none bg-transparent focus:outline-hidden focus-visible:outline-hidden']"
          :disabled="disabled"
          :name="name"
          :max="max"
          :min="min"
          :step="step"
          :readonly="readonly"
          :value="value"
          v-on="inputListeners"
        />
        <div :class="['absolute w-full', classes.track]">
          <div
            :class="classes.progress"
            :style="{ width: progress + '%' }"
          ></div>
        </div>
      </div>
      <slot name="suffix" :value="value"></slot>
    </div>

    <x-input-footer v-if="!hideFooterInternal" :error="errorInternal" :helper="helper"/>
  </x-label>
</template>

<style scoped>
[type="range"]::-webkit-slider-thumb {
  appearance: none;
  background-color: white;
  border: 1px solid var(--x-slider-bg);
  border-radius: 9999px;
  cursor: pointer;
  height: 1.25rem;
  width: 1.25rem;
}

[type="range"]:focus::-webkit-slider-thumb {
  box-shadow: 0 0 0 1px #fff, 0 0 0 3px var(--color-primary-500, currentColor);
}

[type="range"]::-moz-range-thumb {
  background-color: white;
  border: 1px solid var(--x-slider-bg);
  border-radius: 9999px;
  cursor: pointer;
  height: 1.25rem;
  width: 1.25rem;
}

[type="range"]:focus::-moz-range-thumb {
  box-shadow: 0 0 0 1px #fff, 0 0 0 3px var(--color-primary-500, currentColor);
}
</style>
