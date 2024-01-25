<script lang="ts">
const radioProps = {
  ...useCommon.props(),
  ...useColors.props('primary'),
  ...useInteractive.props(),
  ...useInputtable.props(),
  value: [String, Number],
  glow: Boolean,
}

export type RadioProps = ExtractPublicPropTypes<typeof radioProps>

type InternalClasses = 'wrapper' | 'circle' | 'circleIcon' | 'label' | 'content'
type InternalExtraData = { selected: Ref<boolean>; isInsideForm: boolean; isInsideFormGroup: boolean; }
export interface RadioTheme extends ThemeComponent<RadioProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XRadio',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import { computed, ref, type ExtractPublicPropTypes, type Ref, unref } from 'vue'
import { useCommon } from '../../composables/useCommon'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useColors } from '../../composables/useColors'
import { useInteractive } from '../../composables/useInteractive'
import { useInputtable } from '../../composables/useInputtable'

import XSpinner from '../../components/spinner/Spinner.vue'
import XInputFooter from '../inputFooter/InputFooter.vue'

const props = defineProps(radioProps)

const emit = defineEmits(useInputtable.emits(false))

const elRef = ref<HTMLElement | null>(null)

const { focus, blur } = useInteractive(elRef)

const {
  errorInternal,
  hideFooterInternal,
  isInsideForm,
  isInsideFormGroup,
  isFirstValidation,
  formGroup,
  reset,
  validate,
  setError,
} = useInputtable(props, { focus, emit, withListeners: false })

const selected = computed({
  get() {
    const formGroupValue = unref(formGroup.value)

    if (isInsideFormGroup) return formGroupValue === props.value

    return props.value === props.modelValue
  },
  set() {
    emit('update:modelValue', props.value)
    formGroup.setValue(props.value as any)
  },
})

function select() {
  emit('update:modelValue', props.value)
  formGroup.setValue(props.value as any)
}

const listeners = {
  input: () => {
    if (isInsideFormGroup) return
    setTimeout(() => {
      if (props.validateOnInput && !isFirstValidation.value) validate(props.modelValue)
    }, 0)
  },
}

const { styles, classes, className } = useTheme('Radio', {}, props, { selected, isInsideForm, isInsideFormGroup })

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
    @keypress.prevent.stop.space="select"
  >
    <div
      class="flex items-center"
      :class="{ 'cursor-not-allowed': disabled }"
    >
      <input
        :id="id"
        v-model="selected"
        :name="name"
        :required="required"
        :disabled="disabled || loading"
        type="radio"
        class="invisible absolute"
        v-on="listeners"
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

    <x-input-footer v-if="!hideFooterInternal" :error="errorInternal" :helper="helper"/>
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
      box-shadow: 0 0 #000, 0 0 #000, 0 10px 15px -3px var(--x-radio-glow), 0 4px 6px -4px var(--x-radio-glow);
    }

    :global(.dark) &,
    &:global(.dark) {
      border-color: var(--x-radio-dark-border);
      background-color: var(--x-radio-dark-bg);

      &_circle {
        color: var(--x-radio-dark-circle);
      }
    }
  }
</style>
