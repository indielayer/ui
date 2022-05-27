<script lang="ts">
import { defineComponent, computed, ref } from 'vue'
import { useCSS } from '@/composables/css'
import { useCommon } from '@/composables/common'
import { useColors } from '@/composables/colors'
import { useInteractive } from '@/composables/interactive'
import { useInputtable } from '@/composables/inputtable'

import XSpinner from '@/components/spinner/Spinner.vue'

export default defineComponent({
  name: 'XRadio',

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
    value: [String, Number, Boolean, Function, Object, Array],
    label: String,
    glow: Boolean,
  },

  emits: useInputtable.emits(false),

  setup(props, { attrs, emit }) {
    const elRef = ref<HTMLElement>()

    const selected = computed({
      get() {
        return props.value === props.modelValue
      },
      set() {
        emit('update:modelValue', props.value)
      },
    })

    const css = useCSS()
    const colors = useColors()
    const gray = colors.getPalette('gray')

    const styles = computed(() => {
      const color = colors.getPalette(props.color)
      const vars = []

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
        if (selected.value) {
          vars.push(css.variables({
            bg: 'transparent',
            border: gray[200],
            circle: gray[200],
            dark: {
              bg: 'transparent',
              border: gray[700],
              circle: gray[700],
            },
          }))
        } else {
          vars.push(css.variables({
            bg: gray[200],
            border: gray[200],
            dark: {
              bg: gray[700],
              border: gray[700],
            },
          }))
        }
      } else {
        if (selected.value) {
          vars.push(css.variables({
            bg: 'transparent',
            border: color[500],
            circle: color[500],
            dark: {
              bg: 'transparent',
              border: color[500],
              circle: color[500],
            },
          }))
        } else {
          vars.push(css.variables({
            bg: '#fff',
            border: props.glow ? color[300] : gray[300],
            dark: {
              bg: gray[900],
              border: props.glow ? color[300] : gray[300],
            },
          }))
        }

        if (props.glow) {
          vars.push(css.get('glow', colors.getColorOpacity(color[500], 0.5)))
        }
      }

      return vars
    })

    const interactive = useInteractive(elRef)

    return {
      ...interactive,
      ...useInputtable(props, { focus: interactive.focus, emit, withListeners: false }),
      selected,
      styles,
      elRef,
    }
  },
})
</script>

<template>
  <label
    ref="elRef"
    class="inline-block mb-1 relative cursor-pointer focus:outline-none"
    :aria-selected="selected ? 'true' : 'false'"
    :aria-disabled="(disabled || loading) ? 'true' : undefined"
    tabindex="0"
    @keypress.prevent.stop.space="$emit('update:modelValue', value)"
  >
    <div
      class="flex items-center"
      :class="{ 'cursor-not-allowed': disabled }"
    >
      <input
        v-model="selected"
        :name="name"
        :required="required"
        :disabled="disabled || loading"
        type="radio"
        class="invisible absolute"
      />
      <div
        class="rounded-full flex justify-center items-center flex-shrink-0 border-2
          border-[color:var(--x-border)]
          bg-[color:var(--x-bg)]
          dark:border-[color:var(--x-dark-border)]
          dark:bg-[color:var(--x-dark-bg)]
        "
        :style="styles"
        :class="[
          [glow && !disabled && !loading ? $style['radio--glow'] : ''],
          {
            'h-4 w-4': size === 'sm' || size === 'xs',
            'h-5 w-5': !size || !['xs', 'sm', 'xl'].includes(size),
            'h-6 w-6': size === 'xl',
          },
        ]"
      >
        <x-spinner v-if="loading" :size="size" class="absolute" />
        <svg
          v-else
          class="fill-current text-[color:var(--x-circle)] dark:text-[color:var(--x-dark-circle)] w-full"
          :class="{
            'opacity-0': !selected,
            'h-2': size === 'sm' || size === 'xs',
            'h-[0.6rem]': !size || !['xs', 'sm', 'lg', 'xl'].includes(size),
            'h-2.5': size === 'lg',
            'h-3': size === 'xl',
          }"
          viewBox="0 0 20 20"
        >
          <circle cx="10" cy="10" r="10"/>
        </svg>
      </div>
      <span
        v-if="label"
        class="font-medium text-gray-800 dark:text-gray-200 pl-2"
        :class="{
          'text-xs': size === 'xs',
          'text-sm': size === 'sm',
          'text-lg': size === 'lg',
          'text-xl': size === 'xl',
        }"
        v-text="label"
      ></span>
    </div>

    <div
      v-if="$slots.default"
      :class="{
        'text-xs pl-6': size === 'xs',
        'text-sm pl-6': size === 'sm',
        'pl-7': !size || !['xs', 'sm', 'lg', 'xl'].includes(size),
        'text-lg pl-7': size === 'lg',
        'text-lg pl-8': size === 'xl',
      }"
    >
      <slot></slot>
    </div>
    <p v-if="errorInternal" class="text-sm text-error-500 mt-1" v-text="errorInternal"></p>
  </label>
</template>

<style lang="postcss" module scoped>
  .radio {
    &--glow {
      box-shadow: 0 0 #000, 0 0 #000, 0 10px 15px -3px var(--x-glow),0 4px 6px -4px var(--x-glow);
    }
  }
</style>
