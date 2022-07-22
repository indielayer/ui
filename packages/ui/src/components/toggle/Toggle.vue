<script lang="ts">
export default { name: 'XToggle' }
</script>

<script setup lang="ts">
import { computed, ref } from 'vue'
import { useTheme } from '../../composables/theme'
import { useCommon } from '../../composables/common'
import { useColors } from '../../composables/colors'
import { useInputtable } from '../../composables/inputtable'
import { useInteractive } from '../../composables/interactive'

import XSpinner from '../../components/spinner/Spinner.vue'
import XInputError from '../helpers/InputError'

import theme from './Toggle.theme'

const props = defineProps({
  ...useCommon.props(),
  ...useColors.props('primary'),
  ...useInteractive.props(),
  ...useInputtable.props(),
  id: String,
  label: String,
  helper: String,
  glow: Boolean,
})

const emit = defineEmits(useInputtable.emits(false))

const elRef = ref<HTMLElement | null>(null)

const checked = computed({
  get(): boolean {
    return !!props.modelValue
  },
  set(val: boolean) {
    emit('update:modelValue', val)
  },
})

const { focus, blur } = useInteractive(elRef)

const {
  errorInternal,
  reset,
  validate,
  setError,
} = useInputtable(props, { focus, emit, withListeners: false })

const { styles, classes, className } = useTheme('toggle', theme, props)

defineExpose({ focus, blur, reset, validate, setError })
</script>

<template>
  <label
    class="inline-block"
    :class="[
      className,
      classes.wrapper,
      disabled ? 'cursor-not-allowed' : 'cursor-pointer'
    ]"
  >
    <div class="flex items-center">
      <div
        class="flex items-center rounded-full transition-colors duration-300 border-[3px] shrink-0 border-transparent"
        :style="styles"
        :class="{
          [`shadow-lg shadow-${color}-500/50`]: glow && modelValue,
          'bg-gray-300 dark:bg-gray-500': !disabled && !checked && !loading,
          'bg-gray-100 dark:bg-gray-700': disabled || loading,
          'bg-[color:var(--x-toggle-bg)] dark:bg-[color:var(--x-toggle-dark-bg)]': !disabled && checked,
        }"
      >
        <div :class="classes.buttonWrapper">
          <input
            :id="id"
            ref="elRef"
            v-model="checked"
            :aria-checked="checked ? 'true' : 'false'"
            :aria-disabled="disabled ? 'true' : undefined"
            type="checkbox"
            class="hidden"
            :disabled="disabled || loading"
            :name="name"
            :required="required"
            :value="modelValue"
          />
          <div
            :class="[
              classes.button,
              {
                'translate-x-full': checked,
                'shadow': !disabled
              },
              disabled ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-800'
            ]"
          ></div>
        </div>
      </div>
      <span
        v-if="label"
        class="ml-2"
        :class="classes.label"
        v-text="label"
      >
      </span>
      <x-spinner v-if="loading" :size="size" class="ml-1" />
    </div>

    <x-input-error :error="errorInternal" :helper="helper"/>
  </label>
</template>
