<script lang="ts">
import { defineComponent, ref, watch, onMounted, onBeforeUnmount } from 'vue'
import { useCSS } from '../../composables/css'
import { useCommon } from '../../composables/common'
import { useColors } from '../../composables/colors'
import { useInputtable } from '../../composables/inputtable'
import { useInteractive } from '../../composables/interactive'

export default defineComponent({
  name: 'XTextarea',

  validators: {
    ...useCommon.validators(),
  },

  props: {
    ...useCommon.props(),
    ...useInteractive.props(),
    ...useInputtable.props(),
    helper: String,
    label: String,
    dir: {
      type: String,
      default: 'ltr',
    },
    rows: Number,
    max: Number,
    maxlength: Number,
    min: Number,
    minlength: Number,
    placeholder: String,
    adjustToText: {
      type: Boolean,
      default: true,
    },
    preventEnter: Boolean,
    inputClass: String,
    block: Boolean,
  },

  emits: useInputtable.emits(),

  setup(props, { emit }) {
    const elRef = ref<HTMLTextAreaElement>()
    let observer: ResizeObserver | null = null

    onMounted(() => {
      if (elRef.value) {
        observer = new ResizeObserver(resize)
        observer.observe(elRef.value)
        window.addEventListener('resize', resize)
      }
    })

    onBeforeUnmount(() => {
      if (observer) observer.disconnect()
      window.removeEventListener('resize', resize)
    })

    watch([() => props.modelValue, () => props.size], () => {
      setTimeout(resize)
    })

    const css = useCSS('textarea')
    const colors = useColors()
    const color = colors.getPalette('primary')
    const style = css.get('border', color[500])

    function onInput() {
      resize()
    }

    function onEnter(e: KeyboardEvent) {
      if (props.preventEnter) e.preventDefault()
      e.stopPropagation()

      return
    }

    function resize() {
      if (props.adjustToText && elRef.value) {
        elRef.value.style.height = '1px'
        elRef.value.style.height = (2 + elRef.value.scrollHeight) + 'px'
      }
    }

    const interactive = useInteractive(elRef)

    return {
      ...interactive,
      ...useInputtable(props, { focus: interactive.focus, emit }),
      elRef,
      style,
      onInput,
      onEnter,
    }
  },
})
</script>

<template>
  <label
    class="inline-block relative align-bottom text-left"
    :class="{ 'mb-3': isInsideForm, 'w-full': block }"
  >
    <p
      v-if="label"
      class="font-medium text-gray-800 dark:text-gray-200 mb-1"
      :class="{
        'text-xs': size === 'xs',
        'text-sm': size === 'sm',
        'text-lg': size === 'lg',
        'text-xl': size === 'xl',
      }"
      v-text="label"
    ></p>

    <textarea
      ref="elRef"
      class="appearance-none block w-full placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-colors duration-150 ease-in-out border-gray-300 dark:border-gray-700 resize-none overflow-hidden border shadow-sm rounded-md
      focus:border-[color:var(--x-textarea-border)]
      "
      :style="style"
      :class="[
        disabled ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200',
        {
          // size
          'px-2 py-1 text-xs': size === 'xs',
          'px-2 py-2 text-sm': size === 'sm',
          'px-3 py-2': !size || !['auto', 'xs', 'sm', 'lg', 'xl'].includes(size),
          'px-4 py-3 text-lg': size === 'lg',
          'px-5 py-4 text-xl': size === 'xl',
        },
        {
          // error
          'border-red-500 focus:border-red-500 dark:focus:border-red-500': errorInternal,
        },
        inputClass,
      ]"
      :disabled="disabled"
      :max="max"
      :maxlength="maxlength"
      :min="min"
      :dir="dir"
      :rows="rows"
      :minlength="minlength"
      :name="name"
      :placeholder="placeholder"
      :readonly="readonly"
      :value="modelValue?.toString()"
      v-on="inputListeners"
      @keydown.enter="onEnter"
      @input="onInput"
    ></textarea>

    <p v-if="errorInternal" class="text-sm text-red-500 mt-1" v-text="errorInternal"></p>
    <p v-else-if="helper" class="text-sm text-gray-500 mt-1" v-text="helper"></p>
  </label>
</template>
