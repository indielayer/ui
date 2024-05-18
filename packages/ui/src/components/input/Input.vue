<script lang="ts">
const inputProps = {
  ...useCommon.props(),
  ...useColors.props('primary'),
  ...useInteractive.props(),
  ...useInputtable.props(),
  showPasswordToggle: {
    type: Boolean,
    default: true,
  },
  dir: {
    type: String as PropType<'ltr' | 'rtl'>,
    default: 'ltr',
  },
  icon: String,
  iconLeft: String,
  iconRight: String,
  max: [Number, String],
  maxlength: [Number, String],
  min: [Number, String],
  minlength: [Number, String],
  placeholder: String,
  type: {
    type: String,
    default: 'text',
  },
  block: Boolean,
}

export type InputProps = ExtractPublicPropTypes<typeof inputProps>

type InternalClasses = 'wrapper' | 'input' | 'icon'
type InternalExtraData = { errorInternal: any; }
export interface InputTheme extends ThemeComponent<InputProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XInput',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import { ref, type PropType, type ExtractPublicPropTypes, watch, useAttrs, computed } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useColors } from '../../composables/useColors'
import { useCommon } from '../../composables/useCommon'
import { useInputtable } from '../../composables/useInputtable'
import { useInteractive } from '../../composables/useInteractive'
import { eyeIcon, eyeVisibleIcon } from '../../common/icons'

import XLabel from '../label/Label.vue'
import XIcon from '../icon/Icon.vue'
import XInputFooter from '../inputFooter/InputFooter.vue'

const props = defineProps(inputProps)

const emit = defineEmits(useInputtable.emits())

const attrs = useAttrs()
const dataAttrs = computed(() => {
  return Object.keys(attrs).reduce((acc, key) => {
    if (key.startsWith('data-')) acc[key] = attrs[key]

    return acc
  }, {} as Record<string, any>)
})

const elRef = ref<HTMLInputElement | null>(null)
const currentType = ref(props.type)

watch(() => props.type, (newValue) => { currentType.value = newValue })

function onChange(e: Event) {
  if (!e.target) return

  const target = (e.target as HTMLInputElement)

  if (props.type === 'number') {
    const value = Number(target.value)

    if (typeof props.min !== 'undefined') {
      if (value < Number(props.min)) target.value = props.min.toString()
    }

    if (typeof props.max !== 'undefined') {
      if (value > Number(props.max)) target.value = props.max.toString()
    }
  }
}

function togglePasswordVisibility() {
  currentType.value = currentType.value === 'password' ? 'text' : 'password'
}

const { focus, blur } = useInteractive(elRef)

const {
  errorInternal,
  hideFooterInternal,
  isInsideForm,
  inputListeners,
  reset,
  validate,
  setError,
} = useInputtable(props, { focus, emit })

const { styles, classes, className } = useTheme('Input', {}, props, { errorInternal })

defineExpose({ focus, blur, reset, validate, setError })
</script>

<template>
  <x-label
    :style="styles"
    :block="block"
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
    <div class="relative">
      <slot name="prefix">
        <x-icon
          v-if="iconLeft || icon"
          :size="size"
          :icon="iconLeft || icon"
          class="ml-2 left-1"
          :class="classes.icon"
        />
      </slot>

      <input
        :id="id"
        ref="elRef"
        :class="[
          classes.input,
          type === 'password' ? 'pr-10' : '',
          // error
          errorInternal
            ? 'border-error-500 dark:border-error-400 focus:outline-error-500'
            : 'focus:outline-[color:var(--x-input-border)]',
          {
            '!pl-10': iconLeft || icon,
            '!pr-10': iconRight,
          },
        ]"
        :disabled="disabled"
        :min="min"
        :max="max"
        :minlength="minlength"
        :maxlength="maxlength"
        :dir="dir"
        :name="name"
        :placeholder="placeholder"
        :readonly="readonly"
        :type="currentType"
        :value="typeof modelValue !== 'undefined' ? modelValue : ''"
        v-bind="dataAttrs"
        v-on="inputListeners"
        @change="onChange"
      />

      <slot name="suffix">
        <x-icon
          v-if="iconRight"
          :size="size"
          :icon="iconRight"
          class="mr-2 right-1"
          :class="classes.icon"
        />
        <x-icon
          v-else-if="type === 'password' && showPasswordToggle"
          :size="size"
          :icon="currentType === 'password' ? eyeIcon : eyeVisibleIcon"
          class="mr-2 right-1 cursor-pointer"
          :class="classes.icon"
          @click="togglePasswordVisibility()"
        />
      </slot>
    </div>

    <x-input-footer v-if="!hideFooterInternal" :error="errorInternal" :helper="helper"/>
  </x-label>
</template>
