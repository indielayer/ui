<script lang="ts">
const selectProps = {
  ...useCommon.props(),
  ...useInteractive.props(),
  ...useInputtable.props(),
  placeholder: String,
  options: Array as PropType<SelectOption[]>,
  multiple: Boolean,
  label: String,
  helper: String,
  flat: Boolean,
  native: Boolean,
}

export type SelectOption = {
  value: number | string;
  disabled: boolean;
  label: string;
}

export type SelectProps = ExtractPublicPropTypes<typeof selectProps>

type InternalClasses = 'wrapper' | 'box' | 'content' | 'iconWrapper' | 'icon'
type InternalExtraData = { errorInternal: Ref<boolean>; }
export interface SelectTheme extends ThemeComponent<SelectProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XSelect',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import { computed, ref, watch, type PropType, type ExtractPublicPropTypes, type Ref, nextTick } from 'vue'
import { useEventListener } from '@vueuse/core'
import { useCommon } from '../../composables/useCommon'
import { useInputtable } from '../../composables/useInputtable'
import { useInteractive } from '../../composables/useInteractive'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { checkIcon, chevronDownIcon } from '../../common/icons'

import XLabel from '../label/Label.vue'
import XTag from '../tag/Tag.vue'
import XIcon from '../icon/Icon.vue'
import XMenuItem from '../menu/MenuItem.vue'
import XSpinner from '../spinner/Spinner.vue'
import XPopover from '../popover/Popover.vue'
import XPopoverContainer from '../popover/PopoverContainer.vue'
import XInputFooter from '../inputFooter/InputFooter.vue'

const  props = defineProps(selectProps)

const emit = defineEmits(useInputtable.emits())

const elRef = ref<HTMLElement | null>(null)
const labelRef = ref<InstanceType<typeof XLabel> | null>(null)
const itemsRef = ref<InstanceType<typeof XMenuItem>[] | null>(null)
const popoverRef = ref<InstanceType<typeof XPopover> | null>(null)
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

const isOpen = computed(() => popoverRef.value?.isOpen)

watch(isOpen, (isOpenValue) => {
  if (isOpenValue) {
    findSelectedIndex()
    setTimeout(() => {
      scrollToIndex(selectedIndex.value || 0)
    }, 50)

    if (props.multiple || typeof selectedIndex.value === 'undefined') {
      findSelectableIndex(-1)
    }
  }
})

function findSelectedIndex() {
  if (props.multiple) {
    if (Array.isArray(selected.value) && selected.value.length > 0) {
      const index = internalOptions.value.findIndex((option) => option.value === selected.value[0])

      if (index !== -1) selectedIndex.value = index
    }
  } else {
    const index = internalOptions.value.findIndex((option) => option.value === selected.value)

    if (index !== -1) selectedIndex.value = index
  }
}

function scrollToIndex(index: number) {
  if (itemsRef.value) itemsRef.value[index]?.$el.scrollIntoView({ block: 'nearest', inline: 'nearest' })
}

watch(selectedIndex, (index) => {
  if (typeof index !== 'undefined' && itemsRef.value) scrollToIndex(index)
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

  if (!props.native) {
    nextTick(() => {
      elRef.value?.dispatchEvent(new Event('input'))
      elRef.value?.dispatchEvent(new Event('change'))
      labelRef.value?.$el.focus()
    })
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
  isFocused,
  isInsideForm,
  isFirstValidation,
} = useInputtable(props, { focus, emit, withListeners: true })

let keyNavigationListener: null | (() => void) = null

watch([isFocused, isOpen], ([isFocusedValue, isOpenValue]) => {
  if ((isFocusedValue || isOpenValue)) {
    if (!keyNavigationListener) keyNavigationListener = useEventListener(document, 'keydown', handleKeyNavigation)
  } else {
    if (keyNavigationListener) {
      keyNavigationListener()
      keyNavigationListener = null
    }
  }
}, {
  immediate: true,
})

function handleKeyNavigation(e: KeyboardEvent) {
  if (internalOptions.value.length === 0) return

  if (e.code === 'ArrowDown') {
    e.preventDefault()
    if (!isOpen.value) {
      popoverRef.value?.show()

      return
    }
    findSelectableIndex(selectedIndex.value, 'down')
  } else if (e.code === 'ArrowUp') {
    e.preventDefault()
    if (!isOpen.value) {
      popoverRef.value?.show()

      return
    }
    findSelectableIndex(selectedIndex.value, 'up')
  } else if (e.code === 'Enter' || e.code === 'Space') {
    e.preventDefault()
    e.stopPropagation()
    if (!isOpen.value) {
      popoverRef.value?.show()

      return
    }
    if (typeof selectedIndex.value !== 'undefined') {
      handleOptionClick(internalOptions.value[selectedIndex.value].value)
      if (!props.multiple) popoverRef.value?.hide()
    }
  } else if (e.code === 'Tab') {
    if (isOpen.value) {
      e.preventDefault()
      popoverRef.value?.hide()

      if (!props.native) {
        nextTick(() => {
          labelRef.value?.$el.focus()
        })
      }
    }
  }
}

const { styles, classes, className } = useTheme('Select', {}, props, { errorInternal })

defineExpose({ focus, blur, reset, validate, setError })
</script>

<template>
  <x-label
    ref="labelRef"
    tabindex="0"
    class="group"
    :style="styles"
    :disabled="disabled"
    :required="required"
    :is-inside-form="isInsideForm"
    :label="label"
    :class="[
      className,
      classes.wrapper,
    ]"
    v-on="{
      focus: inputListeners.focus,
      blur: inputListeners.blur,
    }"
  >
    <div class="relative">
      <div v-if="native && !multiple" :class="classes.box" @click="elRef?.click()">
        <template v-if="multiple && Array.isArray(selected) && selected.length > 0">
          <div class="flex gap-1 flex-wrap">
            <x-tag
              v-for="value in selected"
              :key="value"
              size="sm"
              removable
              @remove="(e: Event) => { handleRemove(e, value) }"
            >{{ getLabel(value) }}</x-tag>
          </div>
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
      <x-popover
        v-else
        ref="popoverRef"
        block
        :disabled="disabled || loading || readonly"
        :dismiss-on-click="!multiple"
        align="left"
      >
        <div
          :class="[classes.box]"
        >
          <template v-if="multiple && Array.isArray(selected) && selected.length > 0">
            <div class="flex gap-1 flex-wrap">
              <x-tag
                v-for="value in selected"
                :key="value"
                size="sm"
                removable
                @remove="(e: Event) => { handleRemove(e, value) }"
              >{{ getLabel(value) }}</x-tag>
            </div>
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
                @click="() => !multiple && popoverRef?.hide()"
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
        tabindex="-1"
        :class="native && !multiple ? 'absolute inset-0 w-full h-full cursor-pointer opacity-0' : 'hidden'"
        :name="name"
        :disabled="disabled || loading"
        :multiple="multiple"
        :readonly="readonly"
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
            :class="[classes.icon]"
          />
        </slot>

      </div>
    </div>

    <x-input-footer v-if="!hideFooter" :error="errorInternal" :helper="helper"/>
  </x-label>
</template>
