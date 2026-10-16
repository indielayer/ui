<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const checkboxProps = {
  ...useCommon.props(),
  ...useColors.props('primary'),
  ...useInteractive.props(),
  ...useInputtable.props(),
  value: {
    type: [String, Number],
    description: 'Value used when the checkbox is inside an x-form-group (array selection).',
  },
  indeterminate: {
    type: Boolean,
    description: 'Shows an indeterminate (mixed) check state.',
  },
  glow: optionalBooleanProp('Soft colored glow behind the control.'),
}

export type CheckboxProps = ExtractPublicPropTypes<typeof checkboxProps>

type InternalClasses = 'wrapper' | 'content' | 'box' | 'icon' | 'label'
type InternalExtraData = { checked: Ref<boolean>; isInsideForm: boolean; isInsideFormGroup: boolean;}
export interface CheckboxTheme extends ThemeComponent<CheckboxProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XCheckbox',
  inheritAttrs: false,
  validators: {
    ...useCommon.validators(),
  },
  docs: {
    slots: {
      default: 'Label content when the `label` prop is not set.',
      icon: 'Custom checked-state icon.',
    },
    emits: {
      ...useInputtable.emitDocs(false),
    },
    methods: {
      ...useInputtable.methodDocs(),
      toggle: 'Toggle the checked state (no-op when disabled, loading, or readonly).',
    },
  },
}
</script>

<script setup lang="ts">
import { ref, unref, watch, type ExtractPublicPropTypes, type Ref } from 'vue'
import { scheduleAnimationFrame } from '../../common/utils'
import { useColors } from '../../composables/useColors'
import { useCommon } from '../../composables/useCommon'
import { useInputtable } from '../../composables/useInputtable'
import { useFallthroughNativeAttrs } from '../../composables/useFallthroughNativeAttrs'
import { useInteractive } from '../../composables/useInteractive'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

import XInputFooter from '../inputFooter/InputFooter.vue'
import XSpinner from '../spinner/Spinner.vue'

const props = defineProps(checkboxProps)

const emit = defineEmits(useInputtable.emits(false))

const fallthrough = useFallthroughNativeAttrs()

const elRef = ref<HTMLElement | null>(null)
const checked = ref(false)
/** One-shot motion; only set from user input so mount/SSR stay still. */
const animate = ref(false)

function bumpAnimate() {
  animate.value = false
  scheduleAnimationFrame(() => {
    animate.value = true
  })
}

function toggle() {
  if (props.disabled || props.loading || props.readonly) return
  bumpAnimate()
  checked.value = !checked.value
}

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

if (isInsideFormGroup) {
  watch(() => formGroup.value, () => {
    const formGroupValue = unref(formGroup.value)

    if (formGroupValue && Array.isArray(formGroupValue) && formGroupValue.includes(props.value as never)) checked.value = true
    else checked.value = false
  }, { immediate: true, deep: true })

  watch(() => checked.value, (value) => {
    if (!props.value) return

    const formGroupValue = unref(formGroup.value)

    if (value) {
      if (formGroupValue && Array.isArray(formGroupValue)) {
        if (!formGroupValue.includes(props.value as never)) {
          const newValue = [...formGroupValue, props.value]

          formGroup.setValue(newValue as any)
        }
      } else {
        formGroup.setValue([props.value as any])
      }
    } else {
      if (formGroupValue && Array.isArray(formGroupValue) && formGroupValue.includes(props.value as never)) {
        const index = formGroupValue.findIndex((v) => v === props.value)
        const newValue = [...formGroupValue]

        newValue.splice(index, 1)
        formGroup.setValue(newValue as any)
      }
    }
  })
} else {
  watch(() => props.modelValue, (value) => {
    checked.value = !!value
  }, { immediate: true })

  watch(() => checked.value, (value) => {
    emit('update:modelValue', value)
  })
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

const { styles, classes, className } = useTheme('Checkbox', {}, props, { checked, isInsideForm, isInsideFormGroup })

defineExpose({ focus, blur, toggle, reset, validate, setError })
</script>

<template>
  <label
    v-bind="fallthrough.wrapperAttrs"
    :style="[fallthrough.wrapperStyle, styles]"
    :class="[
      fallthrough.wrapperClass,
      className,
      classes.wrapper,
    ]"
  >
    <div
      ref="elRef"
      :class="classes.content"
      tabindex="0"
      @keypress.prevent.stop.space="toggle"
    >
      <input
        v-bind="fallthrough.nativeAttrs"
        :id="id"
        v-model="checked"
        :name="name"
        :aria-checked="indeterminate ? 'mixed' : (checked ? 'true' : 'false')"
        :aria-disabled="disabled ? 'true' : undefined"
        type="checkbox"
        class="invisible absolute"
        :disabled="disabled || loading || readonly"
        :required="required"
        v-on="listeners"
      />
      <div
        :class="[
          classes.box,
          $style.checkbox_box,
          animate && (checked || indeterminate) ? $style['checkbox_box--animate'] : '',
          [(glow && !disabled && !loading) ? $style['checkbox--glow'] : ''],
        ]"
      >
        <x-spinner v-if="loading" :size="size" class="absolute inset-0 m-auto" />
        <!--
          Single SVG draws box fill + 1px ring + indicator on one coordinate
          system (same approach as Radio) so the check stays centered on 1x.
        -->
        <svg
          v-else
          viewBox="0 0 16 16"
          class="block h-full w-full"
          aria-hidden="true"
        >
          <rect
            width="16"
            height="16"
            rx="4"
            fill="var(--x-checkbox-bg)"
            :class="$style.checkbox_bg"
          />
          <path
            fill="var(--x-checkbox-border)"
            fill-rule="evenodd"
            d="M4 0h8a4 4 0 0 1 4 4v8a4 4 0 0 1-4 4H4a4 4 0 0 1-4-4V4a4 4 0 0 1 4-4Zm0 1a3 3 0 0 0-3 3v8a3 3 0 0 0 3 3h8a3 3 0 0 0 3-3V4a3 3 0 0 0-3-3H4Z"
            :class="$style.checkbox_ring"
          />
          <rect
            v-if="indeterminate"
            x="4"
            y="7.25"
            width="8"
            height="1.5"
            rx="0.75"
            fill="currentColor"
            :class="[
              classes.icon,
              $style.checkbox_mark,
              $style['checkbox_mark--checked'],
              animate ? $style['checkbox_mark--animate'] : '',
            ]"
          />
          <slot v-else name="icon">
            <!--
              Stroke check on the same 16×16 grid as the box chrome.
              fill-none must win over any fill-* theme class or the open
              path fills into a blob and looks bottom-left.
            -->
            <path
              d="M4.75 8.35 6.9 10.5 11.25 5.5"
              class="fill-none stroke-current"
              stroke-width="1.75"
              stroke-linecap="round"
              stroke-linejoin="round"
              pathLength="1"
              :class="[
                classes.icon,
                $style.checkbox_check,
                checked ? $style['checkbox_check--checked'] : '',
                animate && checked ? $style['checkbox_check--animate'] : '',
              ]"
            />
          </slot>
        </svg>
      </div>
      <div v-if="label || $slots.default" :class="classes.label">
        <span v-if="label" v-text="label"></span>
        <slot v-else></slot>
      </div>
    </div>

    <x-input-footer v-if="!hideFooterInternal" :error="errorInternal" :helper="helper"/>
  </label>
</template>

<style module>
.checkbox--glow {
  box-shadow: 0 0 #000, 0 0 #000, 0 10px 15px -3px var(--x-checkbox-glow), 0 4px 6px -4px var(--x-checkbox-glow);
}

.checkbox_box {
  transform-origin: center;
}

.checkbox_box--animate {
  animation: checkbox-pop 220ms cubic-bezier(0.34, 1.4, 0.64, 1);
}

.checkbox_bg,
.checkbox_ring {
  transition: fill 150ms ease;
}

.checkbox_check {
  stroke-dasharray: 1;
  stroke-dashoffset: 1;
  opacity: 0;
  transform-origin: center;
  transform-box: fill-box;
}

.checkbox_check--checked {
  stroke-dashoffset: 0;
  opacity: 1;
}

.checkbox_check--animate {
  stroke-dashoffset: 1;
  opacity: 1;
  animation:
    checkbox-draw 180ms ease forwards,
    checkbox-mark-pop 220ms cubic-bezier(0.34, 1.4, 0.64, 1);
}

.checkbox_mark {
  transform-origin: center;
  transform-box: fill-box;
  opacity: 0;
  transform: scale(0.5);
}

.checkbox_mark--checked {
  opacity: 1;
  transform: scale(1);
}

.checkbox_mark--animate {
  animation: checkbox-mark-pop 220ms cubic-bezier(0.34, 1.4, 0.64, 1) forwards;
}

@keyframes checkbox-pop {
  0% { transform: scale(1); }
  35% { transform: scale(0.9); }
  70% { transform: scale(1.08); }
  100% { transform: scale(1); }
}

@keyframes checkbox-draw {
  to { stroke-dashoffset: 0; }
}

@keyframes checkbox-mark-pop {
  0% { transform: scale(0.4); opacity: 0; }
  60% { transform: scale(1.15); opacity: 1; }
  100% { transform: scale(1); opacity: 1; }
}

@media (prefers-reduced-motion: reduce) {
  .checkbox_box--animate,
  .checkbox_check--animate,
  .checkbox_mark--animate {
    animation: none;
  }

  .checkbox_check--animate {
    stroke-dashoffset: 0;
    opacity: 1;
  }

  .checkbox_mark--animate {
    opacity: 1;
    transform: scale(1);
  }
}

:global(.dark) .checkbox_bg,
.checkbox_bg:global(.dark) {
  fill: var(--x-checkbox-dark-bg);
}

:global(.dark) .checkbox_ring,
.checkbox_ring:global(.dark) {
  fill: var(--x-checkbox-dark-border);
}
</style>
