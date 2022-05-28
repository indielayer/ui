<script lang="ts">
import { defineComponent, ref, watch, computed, type StyleValue } from 'vue'
import { useCSS } from '@/composables/css'
import { useCommon } from '@/composables/common'
import { useColors } from '@/composables/colors'
import { useInteractive } from '@/composables/interactive'
import { useInputtable } from '@/composables/inputtable'

import XSpinner from '@/components/spinner/Spinner.vue'

export default defineComponent({
  name: 'XCheckbox',

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
    label: String,
    glow: Boolean,
  },

  emits: useInputtable.emits(false),

  expose: ['toggle'],

  setup(props, { attrs, emit }) {
    const elRef = ref<HTMLElement>()
    const checked = ref(false)

    watch(() => props.modelValue, (value) => {
      checked.value = !!value
    })

    watch(() => checked.value, (value) => {
      emit('update:modelValue', value)
    })

    const sizeClasses = computed(() => {
      if (props.size === 'xs' || props.size === 'sm') return 'h-4 w-4'
      else if (props.size === 'xl') return 'h-6 w-6'

      return 'h-5 w-5'
    })

    const iconSizeClasses = computed(() => {
      if (props.size === 'xs' || props.size === 'sm') return 'h-2 w-2'
      else if (props.size === 'xl') return 'h-4 w-4'

      return 'h-3 w-3'
    })

    const css = useCSS()
    const colors = useColors()
    const gray = colors.getPalette('gray')

    const cssVariables = computed(() => {
      const color = colors.getPalette(props.color)
      const vars: (object | string)[] = []

      if (props.loading) {
        return css.variables({
          bg: 'transparent',
          border: 'transparent',
          dark: {
            bg: 'transparent',
            border: 'transparent',
          },
        })
      }

      if (props.disabled) {
        vars.push(css.variables({
          bg: gray[100],
          border: gray[200],
          dark: {
            bg: gray[800],
            border: gray[700],
          },
        }))
      } else {
        if (checked.value) {
          vars.push(css.variables({
            bg: color[500],
            border: color[500],
            dark: {
              bg: color[500],
              border: color[500],
            },
          }))
        } else {
          vars.push(css.variables({
            bg: '#fff',
            border: props.glow ? color[300] : gray[300],
            dark: {
              bg: gray[900],
              border: props.glow ? color[300] : gray[400],
            },
          }))
        }

        if (props.glow) {
          vars.push(css.get('glow', colors.getColorOpacity(color[500], 0.5)))
        }
      }

      return vars as StyleValue
    })

    function toggle() {
      checked.value = !checked.value
    }

    const interactive = useInteractive(elRef)

    return {
      ...interactive,
      ...useInputtable(props, { focus: interactive.focus, emit, withListeners: false }),
      elRef,
      checked,
      sizeClasses,
      iconSizeClasses,
      cssVariables,
      toggle,
    }
  },
})
</script>

<template>
  <label class="inline-block relative cursor-pointer align-middle mb-1 pb-2">
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
        class="rounded flex justify-center items-center flex-shrink-0 border-2
          border-[color:var(--x-border)]
          bg-[color:var(--x-bg)]
          dark:border-[color:var(--x-dark-border)]
          dark:bg-[color:var(--x-dark-bg)]
        "
        :style="cssVariables"
        :class="[
          [(glow && !disabled && !loading) ? $style['checkbox--glow'] : ''],
          sizeClasses,
        ]"
      >
        <x-spinner v-if="loading" :size="size" class="absolute" />
        <svg
          v-else
          class="fill-current text-gray-100 dark:text-gray-900"
          :class="[iconSizeClasses, {
            'opacity-0': !checked,
          }]"
          viewBox="0 0 20 20"
        >
          <path d="M0 11l2-2 5 5L18 3l2 2L7 18z" />
        </svg>
      </div>
      <div
        class="inline-block font-medium text-gray-800 dark:text-gray-200 pl-2"
        :class="{
          'text-xs': size === 'xs',
          'text-sm': size === 'sm',
          'text-lg': size === 'lg',
          'text-xl': size === 'xl',
        }"
      >
        <span v-if="label" v-text="label"></span>
        <slot v-else></slot>
      </div>
    </div>
    <p v-if="errorInternal" class="text-sm text-red-500 mt-1" v-text="errorInternal"></p>
  </label>
</template>

<style lang="postcss" module scoped>
  .checkbox {
    &--glow {
      box-shadow: 0 0 #000, 0 0 #000, 0 10px 15px -3px var(--x-glow),0 4px 6px -4px var(--x-glow);
    }
  }
</style>
