<script lang="ts">
import { defineComponent, ref, computed } from 'vue'
import { useCSS } from '../../composables/css'
import { useColors } from '../../composables/colors'
import { useCommon } from '../../composables/common'
import { useInputtable } from '../../composables/inputtable'
import { useInteractive } from '../../composables/interactive'

export default defineComponent({
  name: 'XInput',

  validators: {
    ...useCommon.validators(),
  },

  props: {
    ...useCommon.props(),
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
    iconRight: String,
    max: Number,
    maxlength: Number,
    min: Number,
    minlength: Number,
    placeholder: String,
    type: {
      type: String,
      default: 'text',
    },
    inputClass: String,
  },

  emits: useInputtable.emits(),

  setup(props, { emit }) {
    const elRef = ref<HTMLInputElement>()
    const currentType = ref(props.type)

    const labelClasses = computed(() => {
      if (props.size === 'xs') return 'text-xs'
      else if (props.size === 'sm') return 'text-sm'
      else if (props.size === 'lg') return 'text-lg'
      else if (props.size === 'xl') return 'text-xl'

      return ''
    })

    const sizeClasses = computed(() => {
      if (props.size === 'xs') return 'px-2 py-1 text-xs'
      else if (props.size === 'sm') return 'px-2 py-2 text-sm'
      else if (props.size === 'lg') return 'px-4 py-3 text-lg'
      else if (props.size === 'xl') return 'px-5 py-4 text-xl'

      return 'px-3 py-2'
    })

    const css = useCSS('input')
    const colors = useColors()
    const color = colors.getPalette('primary')
    const style = css.get('border', color[500])

    function onChange(e: Event) {
      if (!e.target) return

      const target = (e.target as HTMLInputElement)
      const value = Number(target.value)

      if (props.type === 'number') {
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

    const interactive = useInteractive(elRef)

    return {
      ...interactive,
      ...useInputtable(props, { focus: interactive.focus, emit }),
      currentType,
      labelClasses,
      sizeClasses,
      style,
      elRef,
      onChange,
      togglePasswordVisibility,
    }
  },
})
</script>

<template>
  <label
    class="inline-block relative align-bottom text-left"
    :class="{ 'mb-3': isInsideForm }"
  >
    <p
      v-if="label"
      class="font-medium text-gray-800 dark:text-gray-200 mb-1"
      :class="labelClasses"
      v-text="label"
    ></p>

    <div class="relative">
      <x-icon
        v-if="icon"
        :size="size"
        :icon="icon"
        class="text-gray-600 dark:text-gray-300 absolute ml-2 left-0 my-auto inset-y-0"
      />

      <input
        ref="elRef"
        class="appearance-none block w-full placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none transition-colors duration-150 ease-in-out border-gray-300 hover:border-gray-400 dark:border-gray-700 border shadow-sm rounded-md
        focus:border-[color:var(--x-input-border)]
        "
        :style="style"
        :class="[
          sizeClasses,
          disabled ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 cursor-not-allowed' : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200',
          type === 'password' ? 'pr-9' : '',
          {
            '!pl-9': icon,
            '!pr-9': iconRight,
            // error
            'border-red-500 focus:border-red-500 dark:focus:border-red-500': errorInternal,
          },
          inputClass,
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
        :value="modelValue"
        v-bind="$attrs"
        v-on="inputListeners"
        @change="onChange"
      />

      <x-icon
        v-if="iconRight"
        :size="size"
        :icon="iconRight"
        class="text-gray-600 dark:text-gray-300 absolute mr-2 right-0 my-auto inset-y-0"
      />

      <svg
        v-else-if="type === 'password' && showPasswordToggle"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        stroke="currentColor"
        stroke-linejoin="round"
        stroke-linecap="round"
        fill="none"
        class="text-gray-600 dark:text-gray-300 stroke-2 w-5 h-5 absolute my-auto mr-2 inset-y-0 right-1 cursor-pointer"
        @click="togglePasswordVisibility()"
      >
        <template v-if="currentType === 'password'">
          <path d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </template>

        <template v-else>
          <path d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
        </template>
      </svg>
    </div>

    <p v-if="errorInternal" class="text-sm text-red-500 mt-1" v-text="errorInternal"></p>
    <p v-else-if="helper" class="text-sm text-gray-500 mt-1" v-text="helper"></p>
  </label>
</template>
