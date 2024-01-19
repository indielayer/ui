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
  helper: String,
  label: String,
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

type InternalClasses = 'wrapper' | 'label' | 'input' | 'icon'
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
import { ref, type PropType, type ExtractPublicPropTypes, watch } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useColors } from '../../composables/useColors'
import { useCommon } from '../../composables/useCommon'
import { useInputtable } from '../../composables/useInputtable'
import { useInteractive } from '../../composables/useInteractive'
import { eyeIcon, eyeVisibleIcon } from '../../common/icons'

import XIcon from '../icon/Icon.vue'
import XInputFooter from '../inputFooter/InputFooter.vue'

const props = defineProps(inputProps)

const emit = defineEmits(useInputtable.emits())

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
  <label
    :style="styles"
    class="relative"
    :class="[
      className,
      classes.wrapper,
      { 'mb-3': isInsideForm, 'w-full': block }
    ]"
  >
    <p
      v-if="label"
      :class="classes.label"
      v-text="label"
    ></p>

    <div class="relative">
      <slot name="prefix">
        <x-icon
          v-if="iconLeft"
          :size="size"
          :icon="iconLeft"
          class="ml-2 left-1"
          :class="classes.icon"
        />
      </slot>

      <input
        ref="elRef"
        :class="[
          classes.input,
          type === 'password' ? 'pr-10' : '',
          // error
          errorInternal
            ? 'border-red-500 dark:border-red-400 focus:outline-red-500'
            : 'focus:outline-[color:var(--x-input-border)]',
          {
            '!pl-10': iconLeft,
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
        :value="modelValue || ''"
        v-bind="$attrs"
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

    <x-input-footer v-if="!hideFooter" :error="errorInternal" :helper="helper"/>
  </label>
</template>
