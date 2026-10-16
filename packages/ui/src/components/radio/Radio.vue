<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const radioProps = {
  ...useCommon.props(),
  ...useColors.props('primary'),
  ...useInteractive.props(),
  ...useInputtable.props(),
  value: {
    type: [String, Number],
    description: 'Value emitted when this option is selected (v-model / form-group).',
  },
  glow: optionalBooleanProp('Soft colored glow behind the control.'),
}

export type RadioProps = ExtractPublicPropTypes<typeof radioProps>

type InternalClasses = 'wrapper' | 'circle' | 'circleIcon' | 'label' | 'content'
type InternalExtraData = { selected: Ref<boolean>; isInsideForm: boolean; isInsideFormGroup: boolean; }
export interface RadioTheme extends ThemeComponent<RadioProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XRadio',
  inheritAttrs: false,
  validators: {
    ...useCommon.validators(),
  },
  docs: {
    slots: {
      default: 'Optional content shown below the label.',
    },
    emits: {
      ...useInputtable.emitDocs(false),
    },
    methods: {
      ...useInputtable.methodDocs(),
    },
  },
}
</script>

<script setup lang="ts">
import { computed, ref, type ExtractPublicPropTypes, type Ref, unref } from 'vue'
import { scheduleAnimationFrame } from '../../common/utils'
import { useCommon } from '../../composables/useCommon'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useColors } from '../../composables/useColors'
import { useInteractive } from '../../composables/useInteractive'
import { useInputtable } from '../../composables/useInputtable'
import { useFallthroughNativeAttrs } from '../../composables/useFallthroughNativeAttrs'

import XSpinner from '../../components/spinner/Spinner.vue'
import XInputFooter from '../inputFooter/InputFooter.vue'

const props = defineProps(radioProps)

const emit = defineEmits(useInputtable.emits(false))

const fallthrough = useFallthroughNativeAttrs()

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

/** One-shot motion; only set from user input so mount/SSR stay still. */
const animate = ref(false)

function bumpAnimate() {
  animate.value = false
  scheduleAnimationFrame(() => {
    animate.value = true
  })
}

function select() {
  bumpAnimate()
  emit('update:modelValue', props.value)
  formGroup.setValue(props.value as any)
}

const listeners = {
  click: () => {
    bumpAnimate()
  },
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
    v-bind="fallthrough.wrapperAttrs"
    ref="elRef"
    tabindex="0"
    :aria-selected="selected ? 'true' : 'false'"
    :aria-disabled="(disabled || loading) ? 'true' : undefined"
    :style="[fallthrough.wrapperStyle, styles]"
    :class="[
      fallthrough.wrapperClass,
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
        v-bind="fallthrough.nativeAttrs"
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
          classes.circle,
          $style.radio_control,
          animate && selected ? $style['radio_control--animate'] : '',
          [glow && !disabled && !loading ? $style['radio--glow'] : ''],
        ]"
      >
        <x-spinner v-if="loading" :size="size" class="absolute inset-0 m-auto" />
        <!--
          Single SVG draws fill + ring + center dot on the same coordinate
          system so the indicator stays centered on 1x (CSS border on
          rounded-full anti-aliases unevenly). Selected = solid fill + white
          center; idle = thin ring.
        -->
        <svg
          v-else
          viewBox="0 0 16 16"
          class="block h-full w-full"
          aria-hidden="true"
        >
          <circle
            cx="8"
            cy="8"
            r="8"
            fill="var(--x-radio-bg)"
            :class="$style['radio_bg']"
          />
          <!-- 1px ring via evenodd (integer radii — avoids half-pixel stroke blur on 1x) -->
          <path
            fill="var(--x-radio-border)"
            fill-rule="evenodd"
            d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0zm0 1a7 7 0 1 0 0 14A7 7 0 0 0 8 1z"
            :class="$style['radio_ring']"
          />
          <circle
            cx="8"
            cy="8"
            r="3"
            fill="currentColor"
            :class="[
              classes.circleIcon,
              $style['radio_circle'],
              $style.radio_dot,
              selected ? $style['radio_dot--selected'] : '',
              animate && selected ? $style['radio_dot--animate'] : '',
            ]"
          />
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

<style module>
.radio--glow {
  box-shadow: 0 10px 15px -3px var(--x-radio-glow), 0 4px 6px -4px var(--x-radio-glow);
}

.radio_control {
  transform-origin: center;
}

.radio_control--animate {
  animation: radio-pop 220ms cubic-bezier(0.34, 1.4, 0.64, 1);
}

.radio_bg,
.radio_ring {
  transition: fill 150ms ease;
}

.radio_circle {
  color: var(--x-radio-circle);
}

.radio_dot {
  transform-origin: center;
  transform-box: fill-box;
  transform: scale(0);
  opacity: 0;
}

.radio_dot--selected {
  transform: scale(1);
  opacity: 1;
}

.radio_dot--animate {
  animation: radio-dot-pop 200ms cubic-bezier(0.34, 1.4, 0.64, 1);
}

@keyframes radio-pop {
  0% { transform: scale(1); }
  35% { transform: scale(0.88); }
  70% { transform: scale(1.1); }
  100% { transform: scale(1); }
}

@keyframes radio-dot-pop {
  0% { transform: scale(0); opacity: 0; }
  60% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .radio_control--animate,
  .radio_dot--animate {
    animation: none;
  }

  .radio_dot--selected {
    transform: scale(1);
    opacity: 1;
  }
}

:global(.dark) .radio_bg,
.radio_bg:global(.dark) {
  fill: var(--x-radio-dark-bg);
}

:global(.dark) .radio_ring,
.radio_ring:global(.dark) {
  fill: var(--x-radio-dark-border);
}

:global(.dark) .radio_circle,
.radio_circle:global(.dark) {
  color: var(--x-radio-dark-circle);
}
</style>
