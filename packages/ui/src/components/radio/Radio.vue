<script lang="ts">
export default { name: 'XRadio' }
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useCommon } from '../../composables/common'
import { useTheme } from '../../composables/theme'
import { useColors } from '../../composables/colors'
import { useInteractive } from '../../composables/interactive'
import { useInputtable } from '../../composables/inputtable'

import XSpinner from '../../components/spinner/Spinner.vue'
import XInputError from '../helpers/InputError'

import theme from './Radio.theme'

const props = defineProps({
  ...useCommon.props(),
  ...useColors.props('primary'),
  ...useInteractive.props(),
  ...useInputtable.props(),
  value: [String, Number, Boolean, Function, Object, Array],
  label: String,
  helper: String,
  glow: Boolean,
})

const emit = defineEmits(useInputtable.emits(false))

const elRef = ref<HTMLElement | null>(null)

const selected = computed({
  get() {
    return props.value === props.modelValue
  },
  set() {
    emit('update:modelValue', props.value)
  },
})

const { focus, blur } = useInteractive(elRef)

const {
  errorInternal,
  reset,
  validate,
  setError,
} = useInputtable(props, { focus, emit, withListeners: false })

const { styles, classes, className } = useTheme('radio', theme, props, { selected })

defineExpose({ focus, blur, reset, validate, setError })
</script>

<template>
  <label
    ref="elRef"
    tabindex="0"
    :aria-selected="selected ? 'true' : 'false'"
    :aria-disabled="(disabled || loading) ? 'true' : undefined"
    :style="styles"
    :class="[
      className,
      classes.wrapper,
    ]"
    @keypress.prevent.stop.space="$emit('update:modelValue', value)"
  >
    <div
      class="flex items-center"
      :class="{ 'cursor-not-allowed': disabled }"
    >
      <input
        v-model="selected"
        :name="name"
        :required="required"
        :disabled="disabled || loading"
        type="radio"
        class="invisible absolute"
      />
      <div
        :class="[
          $style['radio'],
          classes.circle,
          [glow && !disabled && !loading ? $style['radio--glow'] : ''],
        ]"
      >
        <x-spinner v-if="loading" :size="size" class="absolute" />
        <svg
          v-else
          viewBox="0 0 20 20"
          class="fill-current w-full"
          :class="[
            classes.circleIcon,
            $style['radio_circle']
          ]"
        >
          <circle cx="10" cy="10" r="10"/>
        </svg>
      </div>
      <div>
        <div
          v-if="label"
          :class="classes.label"
          v-text="label"
        ></div>

        <div
          v-if="$slots.default"
          :class="classes.content"
        >
          <slot></slot>
        </div>
      </div>
    </div>

    <x-input-error :error="errorInternal" :helper="helper"/>
  </label>
</template>

<style lang="postcss" module>
  .radio {
    border-color: var(--x-radio-border);
    background-color: var(--x-radio-bg);

    &_circle {
      color: var(--x-radio-circle);
    }

    &--glow {
      box-shadow: 0 0 #000, 0 0 #000, 0 10px 15px -3px var(--x-radio-glow),0 4px 6px -4px var(--x-radio-glow);
    }

    :global(.dark) &, &:global(.dark) {
      border-color: var(--x-radio-dark-border);
      background-color: var(--x-radio-dark-bg);

      &_circle {
        color: var(--x-radio-dark-circle);
      }
    }
  }
</style>
