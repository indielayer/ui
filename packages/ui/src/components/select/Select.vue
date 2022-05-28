<script lang="ts">
import { computed, defineComponent, ref, watch, type PropType } from 'vue'
import { useCSS } from '@/composables/css'
import { useCommon } from '@/composables/common'
import { useColors } from '@/composables/colors'
import { useInputtable } from '@/composables/inputtable'
import { useInteractive } from '@/composables/interactive'

import { useEventListener } from '@vueuse/core'

import XTag from '@/components/tag/Tag.vue'
import XMenuItem from '@/components/menu/MenuItem.vue'
import XSpinner from '@/components/spinner/Spinner.vue'
import XPopover from '@/components/popover/Popover.vue'
import XPopoverContainer from '@/components/popover/PopoverContainer.vue'

export type SelectOption = {
  value: number | string,
  disabled: boolean,
  label: string
}

export default defineComponent({
  name: 'XSelect',

  components: {
    XTag,
    XMenuItem,
    XSpinner,
    XPopover,
    XPopoverContainer,
  },

  validators: {
    ...useCommon.validators(),
  },

  props: {
    ...useCommon.props(),
    ...useInteractive.props(),
    ...useInputtable.props(),
    placeholder: String,
    options: Array as PropType<Array<SelectOption>>,
    multiple: Boolean,
    label: String,
    helper: String,
    flat: Boolean,
  },

  emits: useInputtable.emits(),

  setup(props, { emit }) {
    const elRef = ref<HTMLElement>()
    const labelRef = ref()
    const itemsRef = ref()
    const popoverRef = ref()
    const selectedIndex = ref<number | undefined>()

    const interactive = useInteractive(elRef)

    const checkIcon = '<path d="M5 13l4 4L19 7" />'

    const selected = computed({
      get(): any {
        if (props.multiple) {
          if (!props.modelValue) return []
          if (Array.isArray(props.modelValue)) return props.modelValue
          else return [props.modelValue]
        }

        return props.modelValue
      },
      set(value: string | number | []) {
        emit('update:modelValue', value)
      },
    })

    const internalOptions = computed(() => {
      if (!props.options || props.options.length === 0) return []

      return props.options.map((option) => {
        let isActive = false

        if (props.multiple && Array.isArray(selected.value)) {
          // @ts-ignore
          isActive = selected.value.includes(option.value)
        } else {
          isActive = option.value === selected.value
        }

        return {
          value: option.value,
          label: option.label,
          active: isActive,
          disabled: option.disabled,
          iconRight: isActive ? checkIcon : undefined,
          onClick: () => handleOptionClick(option.value),
        }
      })
    })

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

    const css = useCSS('select')
    const colors = useColors()
    const color = colors.getPalette('primary')
    const style = css.get('border', color[500])

    const availableOptions = computed(() => props.options?.filter((option) => !option.disabled))

    watch(() => popoverRef.value?.isOpen, () => {
      if (popoverRef.value?.isOpen && (props.multiple || typeof selectedIndex.value === 'undefined'))
        findSelectableIndex(-1)
    })

    watch(selectedIndex, (index) => {
      if (typeof index !== 'undefined') itemsRef.value[index].$el.scrollIntoView({ block: 'nearest', inline: 'nearest' })
    })

    function findSelectableIndex(start: number | undefined, direction = 'down') {
      if (!availableOptions.value || availableOptions.value.length === 0) {
        selectedIndex.value = undefined

        return
      }

      if (typeof start === 'undefined') {
        start = direction === 'down' ? -1 : 1
      }

      if (direction === 'down') {
        let next = start + 1

        if (next > internalOptions.value.length - 1) next = 0
        while (internalOptions.value[next].disabled) {
          if (++next > internalOptions.value.length - 1) next = 0
        }
        selectedIndex.value = next
      } else {
        let next = start - 1

        if (next < 0) next = internalOptions.value.length - 1
        while (internalOptions.value[next].disabled) {
          if (--next < 0) next = internalOptions.value.length - 1
        }
        selectedIndex.value = next
      }
    }

    useEventListener(labelRef, 'keydown', handleKeydown)

    function handleKeydown(e: KeyboardEvent) {
      if (internalOptions.value.length === 0) return

      if (e.code === 'ArrowDown') {
        e.preventDefault()
        if (!popoverRef.value.isOpen) {
          popoverRef.value.open()

          return
        }
        findSelectableIndex(selectedIndex.value, 'down')
      } else if (e.code === 'ArrowUp') {
        e.preventDefault()
        if (!popoverRef.value.isOpen) return
        findSelectableIndex(selectedIndex.value, 'up')
      } else if (e.code === 'Enter' || e.code === 'Space') {
        e.preventDefault()
        e.stopPropagation()
        if (!popoverRef.value.isOpen) {
          popoverRef.value.open()

          return
        }
        if (typeof selectedIndex.value !== 'undefined') {
          handleOptionClick(internalOptions.value[selectedIndex.value].value)
          if (!props.multiple) popoverRef.value.close()
        }
      } else if (e.code === 'Escape') {
        e.preventDefault()
        e.stopPropagation()
        popoverRef.value.close()
      } else if (e.code === 'Tab') {
        popoverRef.value.close()
      }
    }

    function handleOptionClick(value: string | number) {
      const option = props.options?.find((i) => i.value === value)

      if (!option || option.disabled) return

      if (props.multiple) {
        if (Array.isArray(selected.value)) {
          // @ts-ignore
          const index = selected.value.indexOf(value)

          if (index !== -1) selected.value.splice(index, 1)
          else {
            // @ts-ignore
            selected.value.push(value)
            emit('update:modelValue', selected.value)
          }
        } else {
          // @ts-ignore
          selected.value = [value]
        }
      } else {
        selected.value = value
      }
    }

    function isEmpty(value: string | number | []) {
      if (typeof value === 'undefined' || value === null) return true
      if (value === '') return true
      if (Array.isArray(value) && value.length === 0) return true
      if (!Array.isArray(value) && typeof value === 'object' && Object.keys(value).length === 0) return true

      return false
    }

    function handleRemove(e: Event, value: string) {
      e.stopPropagation()

      // find value in selected and remove it
      // @ts-ignore
      const index = selected.value.indexOf(value)

      if (index !== -1) {
        // @ts-ignore
        selected.value.splice(index, 1)
        emit('update:modelValue', selected.value)
      }
    }

    function getLabel(value: string | number | []) {
      const option = props.options?.find((i) => i.value === value)

      if (option) return option.label

      return ''
    }

    return {
      ...interactive,
      ...useInputtable(props, { focus: interactive.focus, emit, withListeners: false }),
      elRef,
      labelRef,
      itemsRef,
      popoverRef,
      selected,
      selectedIndex,
      internalOptions,
      labelClasses,
      sizeClasses,
      style,
      isEmpty,
      getLabel,
      handleRemove,
    }
  },
})
</script>

<template>
  <label
    ref="labelRef"
    tabindex="0"
    class="group relative inline-block align-bottom text-left focus:outline-none"
    :class="[{ 'mb-3': isInsideForm }]"
  >
    <p
      v-if="label"
      class="font-medium text-gray-800 dark:text-gray-200 mb-1"
      :class="labelClasses"
      v-text="label"
    ></p>
    <div class="relative">
      <x-popover ref="popoverRef" block :disabled="disabled || loading" :dismiss-on-click="!multiple">
        <div
          class="w-full border border-gray-300 hover:border-gray-400 dark:border-gray-700 pr-8 transition-colors duration-150 ease-in-out rounded-md shadow-sm
          group-focus:border-[color:var(--x-select-border)]
          "
          :style="style"
          :class="[
            sizeClasses,
            disabled
              ? 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400 cursor-not-allowed'
              : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200',
            {
              // error
              'border-red-500 focus:border-red-500 dark:focus:border-red-500': errorInternal,
            },
          ]"
        >
          <template v-if="multiple && Array.isArray(selected) && selected.length > 0">
            <x-tag
              v-for="value in selected"
              :key="value"
              size="sm"
              class="mr-1"
              removable
              @remove="(e) => { handleRemove(e, value) }"
            >{{ getLabel(value) }}</x-tag>
          </template>
          <template v-else-if="!multiple && !isEmpty(selected)">
            {{ getLabel(selected) }}
          </template>

          <template v-else>
            <div
              v-if="placeholder"
              class="text-gray-400 dark:text-gray-500"
            >
              {{ placeholder }}
            </div>
            <div v-else>&nbsp;</div>
          </template>
        </div>

        <template #content>
          <x-popover-container class="py-1 max-h-72 overflow-scroll">
            <template v-if="internalOptions.length > 0">
              <x-menu-item
                v-for="(item, index) in internalOptions"
                :key="index"
                ref="itemsRef"
                :item="item"
                :size="size"
                :disabled="item.disabled"
                :selected="index === selectedIndex"
                color="primary"
                filled
              />
            </template>
            <div v-else class="px-2 text-center text-gray-400">
              No options
            </div>
          </x-popover-container>
        </template>
      </x-popover>

      <select
        ref="elRef"
        v-model="selected"
        class="hidden"
        :name="name"
        :disabled="disabled || loading"
        :multiple="multiple"
        :readonly="readonly"
        :value="modelValue"
        v-on="inputListeners"
      >
        <option
          v-for="(option, index) in options"
          :key="index"
          :value="option.value"
          :disabled="option.disabled"
        >
          {{ option.label }}
        </option>
      </select>

      <div class="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <x-spinner v-if="loading" :size="size" />
        <svg
          v-else
          class="stroke-2"
          :class="[
            disabled ? 'text-gray-600 dark:text-gray-500': 'text-gray-500 dark:text-gray-400',
            {
              'h-3 w-3': size === 'sm' || size === 'xs',
              'h-5 w-5': !size || !['xs', 'sm', 'lg', 'xl'].includes(size),
              'h-6 w-6': size === 'lg',
              'h-7 w-7': size === 'xl',
            }
          ]"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-linejoin="round"
          stroke-linecap="round"
          fill="none"
        >
          <path d="M8 9l4-4 4 4m0 6l-4 4-4-4" />
        </svg>
      </div>
    </div>

    <p v-if="errorInternal" class="text-sm text-red-500 mt-1" v-text="errorInternal"></p>
    <p v-else-if="helper" class="text-sm text-gray-500 mt-1" v-text="helper"></p>
  </label>
</template>
