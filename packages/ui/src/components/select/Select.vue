<script lang="ts">
const selectProps = {
  ...useColors.props('secondary'),
  ...useCommon.props(),
  ...useInteractive.props(),
  ...useInputtable.props(),
  placeholder: String,
  options: Array as PropType<SelectOption[]>,
  multiple: Boolean,
  multipleCheckbox: Boolean,
  truncate: Boolean,
  flat: Boolean,
  native: Boolean,
  filterable: Boolean,
  clearable: Boolean,
  filterPlaceholder: {
    type: String,
    default: 'Filter by...',
  },
  virtualList: Boolean,
  virtualListOffsetTop: Number,
  virtualListOffsetBottom: Number,
  virtualListItemHeight: {
    type: Number,
    default: 33,
  },
  virtualListOverscan: {
    type: Number,
    default: 5,
  },
  placement: String as PropType<PopoverPlacement>,
}

export type SelectOption = {
  value: number | string;
  label: string;
  prefix?: string;
  suffix?: string;
  disabled?: boolean;
  keepOpenOnClick?: boolean;
  onClick?: () => void | undefined;
}

export type SelectProps = ExtractPublicPropTypes<typeof selectProps>

type InternalClasses = 'wrapper' | 'box' | 'truncateCounter' | 'content' | 'search' | 'contentBody' | 'iconWrapper' | 'clearButton' | 'icon'
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
import { computed, ref, watch, type PropType, type ExtractPublicPropTypes, type Ref, nextTick, unref, onUnmounted } from 'vue'
import { useEventListener, useResizeObserver, useThrottleFn } from '@vueuse/core'
import { useColors } from '../../composables/useColors'
import { useCommon } from '../../composables/useCommon'
import { useInputtable } from '../../composables/useInputtable'
import { useInteractive } from '../../composables/useInteractive'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useVirtualList } from '../../composables/useVirtualList'
import { checkIcon, selectIcon, closeIcon } from '../../common/icons'

import XLabel from '../label/Label.vue'
import XTag from '../tag/Tag.vue'
import XIcon from '../icon/Icon.vue'
import XMenuItem from '../menu/MenuItem.vue'
import XSpinner from '../spinner/Spinner.vue'
import XPopover, { type PopoverPlacement } from '../popover/Popover.vue'
import XPopoverContainer from '../popover/PopoverContainer.vue'
import XInputFooter from '../inputFooter/InputFooter.vue'
import XInput from '../input/Input.vue'

const props = defineProps(selectProps)

const emit = defineEmits([...useInputtable.emits(), 'close'])

const internalMultiple = computed(() => props.multiple || props.multipleCheckbox)

const elRef = ref<HTMLElement | null>(null)
const labelRef = ref<InstanceType<typeof XLabel> | null>(null)
const itemsRef = ref<InstanceType<typeof XMenuItem>[] | null>(null)
const popoverRef = ref<InstanceType<typeof XPopover> | null>(null)
const hiddenTagsCounterRef = ref<HTMLElement | null>(null)
const selectedIndex = ref<number | undefined>()

const filter = defineModel('filter', { default : '' })
const filterRef = ref<InstanceType<typeof XInput> | null>(null)

const isDisabled = computed(() => props.disabled || props.loading || props.readonly)
const isClearIconVisible = computed(() => !props.loading && !props.readonly && !props.disabled && props.clearable && !isEmpty(selected.value))

const selected = computed<any | any[]>({
  get() {
    if (internalMultiple.value) {
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

  return props.options
    .filter((option) => filter.value === '' || option.label.toLowerCase().includes(filter.value.toLowerCase()))
    .map((option) => {
      let isActive = false

      if (internalMultiple.value && Array.isArray(selected.value)) {
        isActive = selected.value.includes(option.value)
      } else {
        isActive = option.value === selected.value
      }

      return {
        value: option.value,
        label: option.label,
        active: isActive,
        prefix: option.prefix,
        suffix: option.suffix,
        disabled: option.disabled,
        iconRight: !props.multipleCheckbox && isActive ? checkIcon : undefined,
        keepOpenOnClick: option.keepOpenOnClick,
        onClick: () => handleOptionClick(option.value),
      }
    })
})

const availableOptions = computed(() => internalOptions.value.filter((option) => !option.disabled))

const { list, scrollTo: scrollToVirtualList, containerProps, wrapperProps } = useVirtualList(
  internalOptions,
  {
    disabled: !props.virtualList,
    itemHeight: props.virtualListItemHeight,
    topOffset: props.virtualListOffsetTop || 0,
    bottomOffset: props.virtualListOffsetBottom || 0,
    overscan: props.virtualListOverscan,
  },
)

const isOpen = computed(() => popoverRef.value?.isOpen)

watch(filter, (val) => {
  if (val) {
    selectedIndex.value = undefined
    findSelectableIndex(-1)
  }
})

watch(isOpen, (isOpenValue) => {
  if (isOpenValue) {
    findSelectedIndex()

    if (internalMultiple.value || typeof selectedIndex.value === 'undefined') {
      findSelectableIndex(-1)
    }

    setTimeout(() => {
      requestAnimationFrame(() => {
        scrollToIndex(selectedIndex.value || 0)

        if (props.filterable) filterRef.value?.focus()
      })
    }, 50)

  } else {
    if (props.filterable) filter.value = ''
    emit('close')
  }
})

function findSelectedIndex() {
  if (internalMultiple.value) {
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
  if (props.virtualList) scrollToVirtualList(index)
  else if (itemsRef.value) itemsRef.value[index]?.$el.scrollIntoView({ block: 'nearest', inline: 'nearest' })
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

  if (option.onClick) {
    option.onClick()
  } else {
    if (internalMultiple.value) {
      if (Array.isArray(selected.value)) {
        const index = selected.value.indexOf(value)

        if (index !== -1) selected.value.splice(index, 1)
        else {
          selected.value.push(value)
        }
      } else {
        selected.value = [value]
      }

      emit('update:modelValue', selected.value)

      if (props.filterable)
        setTimeout(() => {
          filterRef.value?.focus()
        })
    } else {
      selected.value = value
    }

    if (!props.native) {
      nextTick(() => {
        validate()
        labelRef.value?.$el.focus()
      })
    }
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

  if (isDisabled.value) return

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
  hideFooterInternal,
  inputListeners,
  reset,
  validate,
  setError,
  isFocused,
  isInsideForm,
} = useInputtable(props, { focus, emit, withListeners: true })

const labelListeners = computed(() => {
  const { focus, blur } = unref(inputListeners)

  return {
    focus,
    blur,
  }
})

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

onUnmounted(() => {
  if (keyNavigationListener) keyNavigationListener()
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
  } else if (e.code === 'Enter' || (e.code === 'Space')) {
    if (e.code === 'Space' && props.filterable) return

    e.preventDefault()
    e.stopPropagation()
    if (!isOpen.value) {
      popoverRef.value?.show()

      return
    }
    if (typeof selectedIndex.value !== 'undefined' && internalOptions.value[selectedIndex.value]) {
      const selectedItemInternalOptions = internalOptions.value[selectedIndex.value]

      handleOptionClick(selectedItemInternalOptions.value)

      if (!selectedItemInternalOptions.keepOpenOnClick && (!internalMultiple.value || props.multipleCheckbox)) popoverRef.value?.hide()
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

const tagsRef = ref<HTMLElement | null>(null)
const multipleHiddenRef = ref<InstanceType<typeof XPopover> | null>(null)
const showCountTag = ref(false)
const hiddenTags = ref(0)

const handleTruncate = useThrottleFn(() => {
  if (internalMultiple.value && props.truncate) {
    nextTick(() => {
      const maxTags = calcMaxTags()

      if (maxTags < selected.value.length) {
        showCountTag.value = true
        hiddenTags.value = selected.value.length - maxTags
      } else {
        showCountTag.value = false
        hiddenTags.value = 0
      }
    })
  }
}, 100, true)

useResizeObserver(tagsRef, () => { handleTruncate() })

// Calculate max tags that can be displayed, and display: none the rest
function calcMaxTags() {
  if (!tagsRef.value) return 0

  const tags = tagsRef.value.querySelectorAll('.x-tag')
  const tagsArray = Array.from(tags)

  let totalWidth = 0
  let tagsCount = 0

  const maxWidth = tagsRef.value.offsetWidth - 30

  for (let i = 0; i < tagsArray.length; i++) {
    const tag = tagsArray[i] as HTMLElement

    tag.style.display = 'flex'

    totalWidth += tag.offsetWidth

    if (i > 0) {
      if (totalWidth < maxWidth) tagsCount++
      else tag.style.display = 'none'
    }
  }

  return tagsCount
}

watch(selected, (val) => {
  handleTruncate()
}, { immediate: true, deep: true })

const { styles, classes, className } = useTheme('Select', {}, props, { errorInternal })

defineExpose({ focus, blur, reset, validate, setError, filterRef })
</script>

<template>
  <x-label
    ref="labelRef"
    tabindex="0"
    class="group"
    :style="styles"
    :disabled="isDisabled"
    :required="required"
    :is-inside-form="isInsideForm"
    :label="label"
    :class="[
      className,
      classes.wrapper,
    ]"
    :tooltip="tooltip"
    v-on="labelListeners"
  >
    <div class="relative">
      <div v-if="native && !internalMultiple" :class="classes.box" @click="elRef?.click()">
        <template v-if="!isEmpty(selected)">
          {{ getLabel(selected) }}
        </template>
        <template v-else>
          <div v-if="placeholder" class="text-secondary-400 dark:text-secondary-500">
            {{ placeholder }}
          </div>
          <div v-else>&nbsp;</div>
        </template>
      </div>
      <template v-else>
        <x-popover
          ref="popoverRef"
          :disabled="isDisabled"
          :placement="placement"
        >
          <slot
            name="input"
            :popover="popoverRef"
            :selected="selected"
            :disabled="isDisabled"
            :label="getLabel(selected)"
          >
            <div :class="[classes.box]">
              <template v-if="internalMultiple && Array.isArray(selected) && selected.length > 0">
                <div
                  ref="tagsRef"
                  class="flex gap-1 relative"
                  :class="{
                    'flex-wrap': !truncate,
                    'overflow-hidden': truncate,
                  }"
                >
                  <x-tag
                    v-for="(value, valueIndex) in selected"
                    :key="value"
                    size="xs"
                    removable
                    :outlined="!(isDisabled || options?.find((i) => i.value === value)?.disabled)"
                    :disabled="isDisabled || options?.find((i) => i.value === value)?.disabled"
                    :style="{ 'max-width': valueIndex === 0 && hiddenTagsCounterRef ? `calc(100% - ${hiddenTagsCounterRef.offsetWidth + 6 + 'px'})` : undefined }"
                    @remove="(e: Event) => { handleRemove(e, value) }"
                  >
                    <template #prefix>
                      <slot name="tag-prefix" :item="options?.find((i) => i.value === value)"></slot>
                    </template>
                    {{ getLabel(value) }}
                  </x-tag>

                  <div
                    v-if="showCountTag"
                    ref="hiddenTagsCounterRef"
                    :class="classes.truncateCounter"
                    @click.stop="multipleHiddenRef?.toggle()"
                  >+{{ hiddenTags }}</div>
                </div>
              </template>
              <template v-else-if="!internalMultiple && !isEmpty(selected)">
                {{ getLabel(selected) }}
              </template>

              <template v-else>
                <div
                  v-if="placeholder"
                  class="text-secondary-400 dark:text-secondary-500"
                >
                  {{ placeholder }}
                </div>
                <div v-else>&nbsp;</div>
              </template>
            </div>
          </slot>

          <template #content>
            <x-popover-container
              :class="classes.content"
            >
              <slot name="content-header">
                <div v-if="filterable" :class="classes.search">
                  <x-input
                    ref="filterRef"
                    v-model="filter"
                    :placeholder="filterPlaceholder"
                    skip-form-registry
                    data-1p-ignore
                    size="sm"
                  />
                </div>
              </slot>
              <div v-bind="containerProps" :class="classes.contentBody">
                <div v-bind="wrapperProps" class="space-y-0.5">
                  <x-menu-item
                    v-for="item in list"
                    :key="item.index"
                    ref="itemsRef"
                    :item="item.data"
                    :size="size"
                    :disabled="item.data.disabled"
                    :selected="item.index === selectedIndex"
                    :checkbox="multipleCheckbox && !item.data.keepOpenOnClick"
                    :color="color"
                    filled
                    @click="() => !item.data.keepOpenOnClick && (!internalMultiple || multipleCheckbox) && popoverRef?.hide()"
                  >
                    <template v-if="$slots.prefix || item.data.prefix" #prefix><slot name="prefix" :item="item.data">{{ item.data.prefix }}</slot></template>
                    <slot name="label" :item="item.data"></slot>
                    <template v-if="$slots.suffix || item.data.suffix" #suffix><slot name="suffix" :item="item.data">{{ item.data.suffix }}</slot></template>
                  </x-menu-item>
                </div>
                <div v-if="list.length === 0" class="p-2 text-center text-secondary-400">
                  No options
                </div>
              </div>
              <slot name="content-footer"></slot>
            </x-popover-container>
          </template>
        </x-popover>
        <x-popover
          v-if="internalMultiple && truncate && showCountTag"
          ref="multipleHiddenRef"
          :popper-show-triggers="[]"
          :popper-hide-triggers="[]"
          class="inline-block !absolute right-0"
          placement="auto-start"
        >
          <template #content>
            <x-popover-container class="p-2 flex gap-2 flex-wrap">
              <x-tag
                v-for="value in selected?.slice(selected.length - hiddenTags)"
                :key="value"
                size="xs"
                removable
                :outlined="!(isDisabled || options?.find((i) => i.value === value)?.disabled)"
                :disabled="isDisabled || options?.find((i) => i.value === value)?.disabled"
                @remove="(e: Event) => { handleRemove(e, value) }"
              >
                <template #prefix>
                  <slot name="tag-prefix" :item="options?.find((i) => i.value === value)"></slot>
                </template>
                {{ getLabel(value) }}
              </x-tag>
            </x-popover-container>
          </template>
        </x-popover>
      </template>

      <select
        :id="id"
        ref="elRef"
        v-model="selected"
        tabindex="-1"
        :class="native && !internalMultiple ? 'absolute inset-0 w-full h-full cursor-pointer opacity-0' : 'hidden'"
        :name="name"
        :disabled="disabled || loading"
        :multiple="internalMultiple"
        :readonly="readonly"
        v-on="inputListeners"
      >
        <template v-if="native">
          <option
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
            :disabled="option.disabled"
          >
            {{ option.label }}
          </option>
        </template>
      </select>

      <button
        v-if="isClearIconVisible"
        type="button"
        aria-label="Clean value"
        :class="classes.clearButton"
        @click="reset"
      >
        <x-icon
          :icon="closeIcon"
          :class="[classes.icon, 'cursor-pointer']"
        />
      </button>

      <div v-if="!$slots.input" :class="classes.iconWrapper">
        <x-spinner v-if="loading" :size="size" />
        <slot v-else name="icon">
          <x-icon
            :icon="selectIcon"
            :class="classes.icon"
          />
        </slot>
      </div>
    </div>
    <x-input-footer v-if="!hideFooterInternal" :error="errorInternal" :helper="helper"/>
  </x-label>
</template>
