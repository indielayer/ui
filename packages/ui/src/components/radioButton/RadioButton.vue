<script lang="ts">
import { variantBooleanProps } from '../../common/props'

const radioButtonProps = {
  ...useCommon.props(),
  ...useColors.props('primary'),
  ...useInteractive.props(),
  ...useInputtable.props(),
  value: [String, Number],
  ...variantBooleanProps(),
}

export type RadioButtonProps = ExtractPublicPropTypes<typeof radioButtonProps>

type InternalClasses = 'wrapper'
type InternalExtraData = { selected: Ref<boolean>; isInsideFormGroup: boolean; }
export interface RadioButtonTheme extends ThemeComponent<RadioButtonProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XRadioButton',
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

const props = defineProps(radioButtonProps)
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
} = useInputtable(props, { focus, emit, withListeners: false, formGroupJoined: true })

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
  if (props.disabled || props.loading) return
  emit('update:modelValue', props.value)
  formGroup.setValue(props.value as any)
}

const { styles, classes, className } = useTheme('RadioButton', {}, props, {
  selected,
  isInsideFormGroup,
})

defineExpose({ focus, blur, reset, validate, setError })
</script>

<template>
  <label
    ref="elRef"
    tabindex="0"
    :aria-pressed="selected ? 'true' : 'false'"
    :aria-disabled="(disabled || loading) ? 'true' : undefined"
    :style="styles"
    :class="[
      className,
      $style['btn'],
      isInsideFormGroup ? $style['btn--grouped'] : '',
      classes.wrapper,
    ]"
    @click="select"
    @keypress.prevent.stop.space="select"
  >
    <input
      v-model="selected"
      :name="name"
      :required="required"
      :disabled="disabled || loading"
      type="radio"
      class="invisible absolute"
    />
    <slot>{{ label }}</slot>
  </label>
</template>

<style module>
.btn {
  color: var(--x-radio-button-text);
  background-color: var(--x-radio-button-bg);
  border-color: var(--x-radio-button-border);
}

.btn:hover {
  color: var(--x-radio-button-text-hover, var(--x-radio-button-text));
  background-color: var(--x-radio-button-bg-hover, var(--x-radio-button-bg));
  border-color: var(--x-radio-button-border-hover, var(--x-radio-button-border));
}

.btn--grouped {
  border-radius: 0;
}

.btn--grouped:first-child {
  border-top-left-radius: 0.375rem;
  border-bottom-left-radius: 0.375rem;
}

.btn--grouped:last-child {
  border-top-right-radius: 0.375rem;
  border-bottom-right-radius: 0.375rem;
}

.btn--grouped + .btn--grouped {
  margin-left: -1px;
}

:global(.dark) .btn,
.btn:global(.dark) {
  color: var(--x-radio-button-dark-text, var(--x-radio-button-text));
  background-color: var(--x-radio-button-dark-bg, var(--x-radio-button-bg));
  border-color: var(--x-radio-button-dark-border, var(--x-radio-button-border));
}

:global(.dark) .btn:hover,
.btn:global(.dark):hover {
  color: var(--x-radio-button-dark-text-hover, var(--x-radio-button-dark-text, var(--x-radio-button-text)));
  background-color: var(--x-radio-button-dark-bg-hover, var(--x-radio-button-dark-bg, var(--x-radio-button-bg)));
  border-color: var(--x-radio-button-dark-border-hover, var(--x-radio-button-dark-border, var(--x-radio-button-border)));
}
</style>
