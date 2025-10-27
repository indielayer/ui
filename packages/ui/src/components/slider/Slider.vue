<script lang="ts">
const sliderProps = {
  ...useColors.props('primary'),
  ...useInteractive.props(),
  ...useInputtable.props(),
  min: {
    type: [Number, String],
    default: 0,
  },
  max: {
    type: [Number, String],
    default: 100,
  },
  step: {
    type: [Number, String],
    default: 1,
  },
}

export type SliderProps = ExtractPublicPropTypes<typeof sliderProps>

type InternalClasses = 'wrapper' | 'input' | 'track' | 'progress'
export interface SliderTheme extends ThemeComponent<SliderProps, InternalClasses> {}

export default {
  name: 'XSlider',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import { ref, watch, type ExtractPublicPropTypes, computed } from 'vue'
import { useCommon } from '../../composables/useCommon'
import { useColors } from '../../composables/useColors'
import { useInteractive } from '../../composables/useInteractive'
import { useInputtable } from '../../composables/useInputtable'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

import XLabel from '../label/Label.vue'
import XInputFooter from '../inputFooter/InputFooter.vue'

const props = defineProps(sliderProps)

const emit = defineEmits(useInputtable.emits())

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
    :style="styles"
    :disabled="disabled"
    :required="required"
    :is-inside-form="isInsideForm"
    :label="label"
    :class="[
      className,
      classes.wrapper,
    ]"
    :tooltip="tooltip"
  >
    <div class="flex items-center relative w-full gap-2 min-h-[1.25rem]">
      <slot name="prefix" :value="value"></slot>
      <div class="relative flex items-center flex-1">
        <input
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

<style lang="postcss" scoped>
@reference "tailwindcss";

[type="range"]::-webkit-slider-thumb {
  @apply cursor-pointer h-5 w-5 border-solid border rounded-full
    bg-white appearance-none border-[color:var(--x-slider-bg)];
}

[type="range"]:focus::-webkit-slider-thumb {
  @apply ring-3 ring-offset-1;
}

[type="range"]::-moz-range-thumb {
  @apply cursor-pointer h-5 w-5 border-solid border rounded-full
    bg-white border-[color:var(--x-slider-bg)];
}

[type="range"]:focus::-moz-range-thumb {
  @apply ring-3 ring-offset-1;
}
</style>
