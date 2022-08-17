<script lang="ts">
export default { name: 'XSelect' }
</script>

<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue'
import { useEventListener } from '@vueuse/core'
import { useCommon } from '../../composables/common'
import { useInputtable } from '../../composables/inputtable'
import { useInteractive } from '../../composables/interactive'
import { useTheme } from '../../composables/theme'
import { checkIcon, chevronDownIcon } from '../../common/icons'

import XTag from '../../components/tag/Tag.vue'
import XIcon from '../../components/icon/Icon.vue'
import XMenuItem from '../../components/menu/MenuItem.vue'
import XSpinner from '../../components/spinner/Spinner.vue'
import XPopover from '../../components/popover/Popover.vue'
import XPopoverContainer from '../../components/popover/PopoverContainer.vue'
import XInputError from '../helpers/InputError'

import theme from './Select.theme'

export type SelectOption = {
  value: number | string,
  disabled: boolean,
  label: string
}

const  props = defineProps({
  ...useCommon.props(),
  ...useInteractive.props(),
  ...useInputtable.props(),
  placeholder: String,
  options: Array as PropType<Array<SelectOption>>,
  multiple: Boolean,
  label: String,
  helper: String,
  flat: Boolean,
})

const emit = defineEmits(useInputtable.emits())

const elRef = ref<HTMLElement | null>(null)
const labelRef = ref<HTMLElement | null>(null)
const itemsRef = ref<typeof XMenuItem[] | null>(null)
const popoverRef = ref<typeof XPopover | null>(null)
const selectedIndex = ref<number | undefined>()

const selected = computed<any | any[]>({
  get() {
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

const availableOptions = computed(() => props.options?.filter((option) => !option.disabled))

watch(() => popoverRef.value?.isOpen, () => {
  if (popoverRef.value?.isOpen && (props.multiple || typeof selectedIndex.value === 'undefined'))
    findSelectableIndex(-1)
})

watch(selectedIndex, (index) => {
  if (typeof index !== 'undefined' && itemsRef.value) itemsRef.value[index].$el.scrollIntoView({ block: 'nearest', inline: 'nearest' })
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
    if (!popoverRef.value?.isOpen) {
      popoverRef.value?.open()

      return
    }
    findSelectableIndex(selectedIndex.value, 'down')
  } else if (e.code === 'ArrowUp') {
    e.preventDefault()
    if (!popoverRef.value?.isOpen) return
    findSelectableIndex(selectedIndex.value, 'up')
  } else if (e.code === 'Enter' || e.code === 'Space') {
    e.preventDefault()
    e.stopPropagation()
    if (!popoverRef.value?.isOpen) {
      popoverRef.value?.open()

      return
    }
    if (typeof selectedIndex.value !== 'undefined') {
      handleOptionClick(internalOptions.value[selectedIndex.value].value)
      if (!props.multiple) popoverRef.value?.close()
    }
  } else if (e.code === 'Escape') {
    e.preventDefault()
    e.stopPropagation()
    popoverRef.value?.close()
  } else if (e.code === 'Tab') {
    popoverRef.value?.close()
  }
}

function handleOptionClick(value: string | number) {
  const option = props.options?.find((i) => i.value === value)

  if (!option || option.disabled) return

  if (props.multiple) {
    if (Array.isArray(selected.value)) {
      const index = selected.value.indexOf(value)

      if (index !== -1) selected.value.splice(index, 1)
      else {
        selected.value.push(value)
        emit('update:modelValue', selected.value)
      }
    } else {
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
  const index = selected.value.indexOf(value)

  if (index !== -1) {
    selected.value.splice(index, 1)
    emit('update:modelValue', selected.value)
  }
}

function getLabel(value: string | number | []) {
  const option = props.options?.find((i) => i.value === value)

  if (option) return option.label

  return ''
}

const { focus, blur } = useInteractive(elRef)

const {
  errorInternal,
  inputListeners,
  reset,
  validate,
  setError,
  isInsideForm,
} = useInputtable(props, { focus, emit, withListeners: false })

const { styles, classes, className } = useTheme('select', theme, props, { errorInternal })

defineExpose({ focus, blur, reset, validate, setError })
</script>

<template>
  <label
    ref="labelRef"
    tabindex="0"
    class="group relative"
    :style="styles"
    :class="[
      className,
      classes.wrapper,
      { 'mb-3': isInsideForm }
    ]"
  >
    <p
      v-if="label"
      :class="classes.label"
      v-text="label"
    ></p>
    <div class="relative">
      <x-popover
        ref="popoverRef"
        block
        :disabled="disabled || loading"
        :dismiss-on-click="!multiple"
        align="left"
      >
        <div
          :class="[
            classes.box,
            {
              // error
              'border-red-500 dark:border-red-400 group-focus:outline-red-500': errorInternal,
              'group-focus:outline-[color:var(--x-select-border)]': !disabled && !errorInternal
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
          <x-popover-container :class="classes.content">
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

      <div :class="classes.iconWrapper">
        <x-spinner v-if="loading" :size="size" />
        <slot v-else name="icon">
          <x-icon
            :icon="chevronDownIcon"
            :class="[
              classes.icon,
              disabled ? 'text-gray-600 dark:text-gray-500': 'text-gray-500 dark:text-gray-400'
            ]"
          />
        </slot>

      </div>
    </div>

    <x-input-error :error="errorInternal" :helper="helper"/>
  </label>
</template>
