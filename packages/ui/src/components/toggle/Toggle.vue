<script lang="ts">
const toggleProps = {
  ...useCommon.props(),
  ...useColors.props('primary'),
  ...useInteractive.props(),
  ...useInputtable.props(),
  id: String,
  label: String,
  helper: String,
  glow: Boolean,
}

export type ToggleProps = ExtractPublicPropTypes<typeof toggleProps>

type InternalClasses = 'wrapper' | 'label' | 'buttonWrapper' | 'button'
export interface ToggleTheme extends ThemeComponent<ToggleProps, InternalClasses> {}

export default {
  name: 'XToggle',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import { computed, ref, type ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useCommon } from '../../composables/useCommon'
import { useColors } from '../../composables/useColors'
import { useInputtable } from '../../composables/useInputtable'
import { useInteractive } from '../../composables/useInteractive'

import XSpinner from '../../components/spinner/Spinner.vue'
import XInputFooter from '../inputFooter/InputFooter.vue'

const props = defineProps(toggleProps)

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

const { styles, classes, className } = useTheme('Toggle', {}, props)

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
        class="flex items-center rounded-full transition-colors duration-300 border-[3px] shrink-0 !border-transparent"
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

    <x-input-footer :error="errorInternal" :helper="helper"/>
  </label>
</template>
