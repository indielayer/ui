<script lang="ts">
export default { name: 'XCheckbox' }
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTheme } from '../../composables/theme'
import { useCommon } from '../../composables/common'
import { useColors } from '../../composables/colors'
import { useInteractive } from '../../composables/interactive'
import { useInputtable } from '../../composables/inputtable'

import XSpinner from '../../components/spinner/Spinner.vue'
import XInputError from '../helpers/InputError'

import theme from './Checkbox.theme'

const props = defineProps({
  ...useCommon.props(),
  ...useColors.props('primary'),
  ...useInteractive.props(),
  ...useInputtable.props(),
  label: String,
  helper: String,
  glow: Boolean,
})

const emit = defineEmits(useInputtable.emits(false))

const elRef = ref<HTMLElement | null>(null)
const checked = ref(false)

watch(() => props.modelValue, (value) => {
  checked.value = !!value
}, { immediate: true })

watch(() => checked.value, (value) => {
  emit('update:modelValue', value)
})

function toggle() {
  checked.value = !checked.value
}

const { focus, blur } = useInteractive(elRef)

const {
  errorInternal,
  isInsideForm,
  reset,
  validate,
  setError,
} = useInputtable(props, { focus, emit, withListeners: false })

const { styles, classes, className } = useTheme('checkbox', theme, props, { checked })

defineExpose({ focus, blur, toggle, reset, validate, setError })
</script>

<template>
  <label
    :style="styles"
    :class="[
      className,
      classes.wrapper,
      { 'mb-3': isInsideForm }
    ]"
  >
    <div
      ref="elRef"
      class="flex items-center"
      :class="{ 'cursor-not-allowed': disabled }"
      tabindex="0"
      @keypress.prevent.stop.space="toggle"
    >
      <input
        v-model="checked"
        :aria-checked="checked ? 'true' : 'false'"
        :aria-disabled="disabled ? 'true' : undefined"
        type="checkbox"
        class="invisible absolute"
        :disabled="disabled || loading"
        :name="name"
        :required="required"
      />
      <div
        :class="[
          classes.box,
          [(glow && !disabled && !loading) ? $style['checkbox--glow'] : ''],
        ]"
      >
        <x-spinner v-if="loading" :size="size" class="absolute" />
        <slot v-else name="icon">
          <svg
            viewBox="0 0 20 20"
            :class="[classes.icon, { 'opacity-0': !checked }]"
          >
            <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
          </svg>
        </slot>
      </div>
      <div :class="classes.label">
        <span v-if="label" v-text="label"></span>
        <slot v-else></slot>
      </div>
    </div>

    <x-input-error :error="errorInternal" :helper="helper"/>
  </label>
</template>

<style lang="postcss" module>
  .checkbox {
    &--glow {
      box-shadow: 0 0 #000, 0 0 #000, 0 10px 15px -3px var(--x-checkbox-glow),0 4px 6px -4px var(--x-checkbox-glow);
    }
  }
</style>
