<script lang="ts">
export default { name: 'XInput' }
</script>

<script setup lang="ts">
import { computed, reactive, ref } from 'vue'
import { useTheme } from '../../composables/theme'
import { useColors } from '../../composables/colors'
import { useCommon } from '../../composables/common'
import { useInputtable } from '../../composables/inputtable'
import { useInteractive } from '../../composables/interactive'
import { eyeIcon, eyeVisibleIcon } from '../../common/icons'

import XIcon from '../icon/Icon.vue'
import XInputError from '../helpers/InputError'

import theme from './Input.theme'

const props = defineProps({
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
    type: String,
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
})

const emit = defineEmits(useInputtable.emits())

const elRef = ref<HTMLInputElement | null>(null)
const currentType = ref(props.type)

function onChange(e: Event) {
  if (!e.target) return

  const target = (e.target as HTMLInputElement)

  if (props.type === 'number') {
    const value = Number(target.value)

    if (typeof props.min !== 'undefined') {
      if (value < props.min) target.value = props.min.toString()
    }

    if (typeof props.max !== 'undefined') {
      if (value > props.max) target.value = props.max.toString()
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

const { styles, classes, className } = useTheme('input', theme, props, { errorInternal })

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
      <x-icon
        v-if="iconLeft"
        :size="size"
        :icon="iconLeft"
        class="ml-2 left-1"
        :class="classes.icon"
      />

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
    </div>

    <x-input-error :error="errorInternal" :helper="helper"/>
  </label>
</template>
