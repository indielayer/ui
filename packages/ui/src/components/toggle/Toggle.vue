<script lang="ts">
import { computed, defineComponent, ref } from 'vue'
import { useCSS } from '../../composables/css'
import { useCommon } from '../../composables/common'
import { useColors } from '../../composables/colors'
import { useInputtable } from '../../composables/inputtable'
import { useInteractive } from '../../composables/interactive'

import XSpinner from '../../components/spinner/Spinner.vue'

export default defineComponent({
  name: 'XToggle',

  components: {
    XSpinner,
  },

  validators: {
    ...useCommon.validators(),
  },

  props: {
    ...useCommon.props(),
    ...useColors.props('primary'),
    ...useInteractive.props(),
    ...useInputtable.props(),
    id: String,
    label: String,
    glow: Boolean,
  },

  emits: useInputtable.emits(false),

  setup(props, { emit }) {
    const elRef = ref<HTMLElement>()
    const checked = computed({
      get(): boolean {
        return !!props.modelValue
      },
      set(val: boolean) {
        emit('update:modelValue', val)
      },
    })

    const css = useCSS()
    const colors = useColors()

    const styles = computed(() => {
      const color = colors.getPalette(props.color)

      return css.variables({
        bg: color[500],
        dark: {
          bg: color[600],
        },
      })
    })

    const interactive = useInteractive(elRef)

    return {
      ...interactive,
      ...useInputtable(props, { focus: interactive.focus, emit, withListeners: false }),
      elRef,
      checked,
      styles,
    }
  },
})
</script>

<template>
  <label
    class="inline-block"
    :class="[!disabled ? 'cursor-pointer' : 'cursor-not-allowed']"
  >
    <div class="flex items-center">
      <div
        class="flex items-center rounded-full transition-colors duration-300 border-[3px] shrink-0 border-transparent"
        :style="styles"
        :class="{
          [`shadow-lg shadow-${color}-500/50`]: glow && modelValue,
          'bg-gray-300 dark:bg-gray-500': !disabled && !checked && !loading,
          'bg-gray-100 dark:bg-gray-700': disabled || loading,
          'bg-[color:var(--x-bg)]': !disabled && checked,
        }"
      >
        <div
          class="relative shrink-0"
          :class="[
            {
              'w-6': size === 'sm' || size === 'xs',
              'w-8': !size || !['xs', 'sm', 'lg', 'xl'].includes(size),
              'w-10': size === 'lg',
              'w-12': size === 'xl',
            }
          ]"
        >
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
            class="rounded-full shadow transform transition duration-300 flex-shrink-0"
            :class="[
              {
                'h-3 w-3': size === 'sm' || size === 'xs',
                'h-4 w-4': !size || !['xs', 'sm', 'lg', 'xl'].includes(size),
                'h-5 w-5': size === 'lg',
                'h-6 w-6': size === 'xl',
                'translate-x-full': checked,
                'bg-gray-shadow-md': !disabled
              },
              [disabled ? 'bg-gray-50 dark:bg-gray-800' : 'bg-white dark:bg-gray-800']
            ]"
          ></div>
        </div>
      </div>
      <span
        v-if="label"
        class="pl-2 font-medium text-gray-800 dark:text-gray-200"
        :class="{
          'text-xs': size === 'xs',
          'text-sm': size === 'sm',
          'text-lg': size === 'lg',
          'text-xl': size === 'xl',
        }"
        v-text="label"
      >
      </span>
      <x-spinner v-if="loading" :size="size" class="ml-1" />
    </div>
    <p v-if="errorInternal" class="text-sm text-red-500 mt-1" v-text="errorInternal"></p>
  </label>
</template>
