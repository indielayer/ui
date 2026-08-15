<script lang="ts">
const VDP_DESC = 'Passed through to @vuepic/vue-datepicker.'

const vueDatepickerProps = {
  multiCalendars: {
    type: [Boolean, Number, String, Object] as PropType<VueDatePickerProps['multiCalendars']>, default: undefined,
    description: VDP_DESC,
  },
  modelValue: {
    type: [String, Date, Array, Object, Number] as PropType<ModelValue>, default: null,
    description: VDP_DESC,
  },
  modelType: {
    type: String as PropType<VueDatePickerProps['modelType']>, default: null,
    description: VDP_DESC,
  },
  position: {
    type: String as PropType<VueDatePickerProps['position']>, default: 'center',
    description: VDP_DESC,
  },
  dark: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  format: {
    type: [String, Function] as PropType<VueDatePickerProps['format']>,
    default: () => null,
    description: VDP_DESC,
  },
  autoPosition: {
    type: Boolean as PropType<boolean>, default: true,
    description: VDP_DESC,
  },
  altPosition: {
    type: Function as PropType<VueDatePickerProps['altPosition']>, default: null,
    description: VDP_DESC,
  },
  transitions: {
    type: [Boolean, Object] as PropType<boolean | Partial<VueDatePickerProps['transitions']>>, default: true,
    description: VDP_DESC,
  },
  formatLocale: {
    type: Object as PropType<Locale>, default: null,
    description: VDP_DESC,
  },
  utc: {
    type: [Boolean, String] as PropType<boolean | 'preserve'>, default: false,
    description: VDP_DESC,
  },
  ariaLabels: {
    type: Object as PropType<Partial<VueDatePickerProps['ariaLabels']>>, default: () => ({}),
    description: VDP_DESC,
  },
  offset: {
    type: [Number, String] as PropType<number | string>, default: 10,
    description: VDP_DESC,
  },
  hideNavigation: {
    type: Array as PropType<VueDatePickerProps['hideNavigation']>, default: () => [],
    description: VDP_DESC,
  },
  timezone: {
    type: [String, Object] as PropType<VueDatePickerProps['timezone']>, default: null,
    description: VDP_DESC,
  },
  vertical: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  disableMonthYearSelect: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  disableYearSelect: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  dayClass: {
    type: Function as PropType<(date: Date) => string>, default: null,
    description: VDP_DESC,
  },
  yearRange: {
    type: Array as PropType<number[]>, default: () => [1900, 2100],
    description: VDP_DESC,
  },
  enableTimePicker: {
    type: Boolean as PropType<boolean>, default: true,
    description: VDP_DESC,
  },
  autoApply: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  disabledDates: {
    type: [Array, Function] as PropType<VueDatePickerProps['disabledDates']>, default: () => [],
    description: VDP_DESC,
  },
  monthNameFormat: {
    type: String as PropType<'long' | 'short'>, default: 'short',
    description: VDP_DESC,
  },
  startDate: {
    type: [Date, String] as PropType<string | Date>, default: null,
    description: VDP_DESC,
  },
  startTime: {
    type: [Object, Array] as PropType<VueDatePickerProps['startTime']>, default: null,
    description: VDP_DESC,
  },
  hideOffsetDates: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  noToday: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  disabledWeekDays: {
    type: Array as PropType<string[] | number[]>, default: () => [],
    description: VDP_DESC,
  },
  allowedDates: {
    type: Array as PropType<string[] | Date[]>, default: null,
    description: VDP_DESC,
  },
  nowButtonLabel: {
    type: String as PropType<string>, default: 'Now',
    description: VDP_DESC,
  },
  markers: {
    type: Array as PropType<VueDatePickerProps['markers']>, default: () => [],
    description: VDP_DESC,
  },
  escClose: {
    type: Boolean as PropType<boolean>, default: true,
    description: VDP_DESC,
  },
  spaceConfirm: {
    type: Boolean as PropType<boolean>, default: true,
    description: VDP_DESC,
  },
  monthChangeOnArrows: {
    type: Boolean as PropType<boolean>, default: true,
    description: VDP_DESC,
  },
  presetDates: {
    type: Array as PropType<VueDatePickerProps['presetDates']>, default: () => [],
    description: VDP_DESC,
  },
  flow: {
    type: Array as PropType<VueDatePickerProps['flow']>, default: () => [],
    description: VDP_DESC,
  },
  partialFlow: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  preventMinMaxNavigation: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  reverseYears: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  weekPicker: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  filters: {
    type: Object as PropType<Partial<VueDatePickerProps['filters']>>, default: () => ({}),
    description: VDP_DESC,
  },
  arrowNavigation: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  highlight: {
    type: [Function, Object] as PropType<VueDatePickerProps['highlight']>,
    default: null,
    description: VDP_DESC,
  },
  teleport: {
    type: [String, Boolean, Object] as PropType<string | boolean | HTMLElement>, default: null,
    description: VDP_DESC,
  },
  teleportCenter: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  locale: {
    type: String as PropType<string>, default: 'en-Us',
    description: VDP_DESC,
  },
  weekNumName: {
    type: String as PropType<string>, default: 'W',
    description: VDP_DESC,
  },
  weekStart: {
    type: [Number, String] as PropType<VueDatePickerProps['weekStart']>, default: 1,
    description: VDP_DESC,
  },
  weekNumbers: {
    type: [String, Function, Object] as PropType<VueDatePickerProps['weekNumbers']>,
    default: null,
    description: VDP_DESC,
  },
  monthChangeOnScroll: {
    type: [Boolean, String] as PropType<boolean | 'inverse'>, default: true,
    description: VDP_DESC,
  },
  dayNames: {
    type: [Function, Array] as PropType<((lang: string, weekStart: number) => string[]) | string[]>,
    default: null,
    description: VDP_DESC,
  },
  monthPicker: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  customProps: {
    type: Object as PropType<Record<string, unknown>>, default: null,
    description: VDP_DESC,
  },
  yearPicker: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  modelAuto: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  selectText: {
    type: String as PropType<string>, default: 'Select',
    description: VDP_DESC,
  },
  cancelText: {
    type: String as PropType<string>, default: 'Cancel',
    description: VDP_DESC,
  },
  previewFormat: {
    type: [String, Function] as PropType<VueDatePickerProps['previewFormat']>,
    default: () => '',
    description: VDP_DESC,
  },
  multiDates: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  ignoreTimeValidation: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  minDate: {
    type: [Date, String] as PropType<Date | string>, default: null,
    description: VDP_DESC,
  },
  maxDate: {
    type: [Date, String] as PropType<Date | string>, default: null,
    description: VDP_DESC,
  },
  minTime: {
    type: Object as PropType<Partial<TimeModel>>, default: null,
    description: VDP_DESC,
  },
  maxTime: {
    type: Object as PropType<Partial<TimeModel>>, default: null,
    description: VDP_DESC,
  },
  placeholder: {
    type: String as PropType<string>, default: '',
    description: VDP_DESC,
  },
  hideInputIcon: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  clearable: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  alwaysClearable: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  state: {
    type: Boolean as PropType<VueDatePickerProps['state']>, default: null,
    description: VDP_DESC,
  },
  required: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  autocomplete: {
    type: String as PropType<string>, default: 'off',
    description: VDP_DESC,
  },
  timePicker: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  enableSeconds: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  is24: {
    type: Boolean as PropType<boolean>, default: true,
    description: VDP_DESC,
  },
  noHoursOverlay: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  noMinutesOverlay: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  noSecondsOverlay: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  hoursGridIncrement: {
    type: [String, Number] as PropType<string | number>, default: 1,
    description: VDP_DESC,
  },
  minutesGridIncrement: {
    type: [String, Number] as PropType<string | number>, default: 5,
    description: VDP_DESC,
  },
  secondsGridIncrement: {
    type: [String, Number] as PropType<string | number>, default: 5,
    description: VDP_DESC,
  },
  hoursIncrement: {
    type: [Number, String] as PropType<number | string>, default: 1,
    description: VDP_DESC,
  },
  minutesIncrement: {
    type: [Number, String] as PropType<number | string>, default: 1,
    description: VDP_DESC,
  },
  secondsIncrement: {
    type: [Number, String] as PropType<number | string>, default: 1,
    description: VDP_DESC,
  },
  range: {
    type: [Boolean, Object] as PropType<VueDatePickerProps['range']>, default: false,
    description: VDP_DESC,
  },
  uid: {
    type: String as PropType<string>, default: null,
    description: VDP_DESC,
  },
  inline: {
    type: [Boolean, Object] as PropType<VueDatePickerProps['inline']>, default: false,
    description: VDP_DESC,
  },
  textInput: {
    type: [Boolean, Object] as PropType<VueDatePickerProps['textInput']>, default: false,
    description: VDP_DESC,
  },
  noDisabledRange: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  sixWeeks: {
    type: [Boolean, String] as PropType<VueDatePickerProps['sixWeeks']>, default: false,
    description: VDP_DESC,
  },
  actionRow: {
    type: Object as PropType<Partial<any>>, default: () => ({}),
    description: VDP_DESC,
  },
  focusStartDate: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  disabledTimes: {
    type: [Function, Array] as PropType<VueDatePickerProps['disabledTimes']>, default: undefined,
    description: VDP_DESC,
  },
  showLastInRange: {
    type: Boolean as PropType<boolean>, default: true,
    description: VDP_DESC,
  },
  timePickerInline: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  calendar: {
    type: Function as PropType<VueDatePickerProps['calendar']>, default: null,
    description: VDP_DESC,
  },
  config: {
    type: Object as PropType<Partial<VueDatePickerProps['config']>>, default: undefined,
    description: VDP_DESC,
  },
  quarterPicker: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  yearFirst: {
    type: Boolean as PropType<boolean>, default: false,
    description: VDP_DESC,
  },
  onInternalModelChange: {
    type: [Function, Object] as PropType<(...args: any[]) => void>, default: null,
    description: VDP_DESC,
  },
  enableMinutes: {
    type: Boolean as PropType<boolean>, default: true,
    description: VDP_DESC,
  },
  ui: {
    type: Object as PropType<Partial<VueDatePickerProps['ui']>>, default: () => ({}),
    description: VDP_DESC,
  },
}

const datepickerProps = {
  ...useCommon.props(),
  ...useInteractive.props(),
  ...useInputtable.props(),
  ...vueDatepickerProps,
}

export type DatepickerProps = ExtractPublicPropTypes<typeof datepickerProps>

type InternalClasses = 'wrapper'
type InternalExtraData = { isInsideInputGroup: boolean; }
export interface DatepickerTheme extends ThemeComponent<DatepickerProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XDatepicker',
  docs: {
    slots: {
      'dp-input': 'Custom input trigger; receives value, onEnter, and onTab from vue-datepicker.',
    },
    emits: {
      ...useInputtable.emitDocs(),
    },
    methods: {
      focus: 'Focus the datepicker input.',
      blur: 'Remove focus from the datepicker input.',
      validate: 'Run validation on the underlying input.',
    },
  },
}
</script>

<script setup lang="ts">
import { ref, inject, computed, type ExtractPublicPropTypes, type PropType } from 'vue'
import { useMutationObserver } from '@vueuse/core'
import { useCommon } from '../../composables/useCommon'
import { useInputtable } from '../../composables/useInputtable'
import { useInteractive } from '../../composables/useInteractive'
import { useTheme, type StyleValue, type ThemeComponent } from '../../composables/useTheme'
import type { Size } from '../../composables/useCommon'
import { injectInputGroupKey } from '../../composables/keys'
import XInput from '../input/Input.vue'
import type { Locale } from 'date-fns'
import VueDatepicker, { type ModelValue, type TimeModel, type VueDatePickerProps } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

let datepickerThemeSeq = 0

/** Flatten theme StyleValue into CSS declarations for a teleported menu stylesheet. */
function styleValueToCssText(value: StyleValue | StyleValue[]): string {
  const decls: string[] = []

  const visit = (v: unknown) => {
    if (v === null || v === undefined || v === false) return
    if (typeof v === 'string') {
      const trimmed = v.trim()

      if (trimmed) decls.push(trimmed.endsWith(';') ? trimmed.slice(0, -1) : trimmed)

      return
    }
    if (Array.isArray(v)) {
      v.forEach(visit)

      return
    }
    if (typeof v === 'object') {
      for (const [key, val] of Object.entries(v as Record<string, unknown>)) {
        if (val === null || val === undefined || val === false) continue
        decls.push(`${key}: ${val}`)
      }
    }
  }

  visit(value)

  return decls.join(';\n')
}

const props = defineProps(datepickerProps)

const inputGroup = inject(injectInputGroupKey, {
  registerChild: () => {},
  unregisterChild: () => {},
  registerInput: () => {},
  unregisterInput: () => {},
  getPosition: () => 'only',
  childOrder: computed(() => []),
  isInsideInputGroup: false,
  groupProps: {},
})

const emit = defineEmits(useInputtable.emits())

const isInsideInputGroup = computed(() => inputGroup.isInsideInputGroup)
const computedSize = computed((): Size => inputGroup.groupProps?.size ?? props.size)
const isDisabled = computed(() => props.disabled || props.loading || !!inputGroup.groupProps?.disabled)
const computedLabel = computed(() => (inputGroup.isInsideInputGroup ? undefined : props.label))

const inputRef = ref<InstanceType<typeof XInput> | null>(null)

function onSelect(value: Date | Date[]) {
  emit('update:modelValue', value)

  setTimeout(validate)
}

function blur() {
  inputRef.value?.blur()
}

function focus() {
  inputRef.value?.focus()
}

function validate() {
  inputRef.value?.validate()
}

const htmlNode = typeof document !== 'undefined' ? document.querySelector('html') : null
const dark = ref(htmlNode?.classList.contains('dark') ?? false)

useMutationObserver(htmlNode, (mutations) => {
  if (mutations[0] && mutations[0].attributeName === 'class') {
    dark.value = htmlNode?.classList.contains('dark') ?? false
  }
}, {
  attributes: true,
})

const { hideFooterInternal } = useInputtable(props, { focus, emit })

defineExpose({ focus, blur, validate })

const { styles, classes, className } = useTheme('Datepicker', {}, props, { isInsideInputGroup })

// Teleported menus leave the wrapper, so theme CSS vars must travel with the menu.
const menuThemeClass = `x-datepicker-menu-${++datepickerThemeSeq}`

const mergedUi = computed(() => {
  const userUi = props.ui ?? {}
  const userMenu = userUi.menu
  const menu = [
    ...(Array.isArray(userMenu) ? userMenu : userMenu ? [userMenu] : []),
    menuThemeClass,
  ]

  return { ...userUi, menu }
})

const menuThemeCss = computed(() => {
  const declarations = styleValueToCssText(styles.value)

  return declarations ? `.${menuThemeClass}{\n${declarations}\n}` : ''
})
</script>

<template>
  <div
    :style="[styles, { '--dp-clear-btn-top': computedLabel ? '2.75rem' : '1.2rem' }]"
    :class="[
      className,
      classes.wrapper,
      isInsideInputGroup ? 'flex-1 min-w-0' : '',
    ]"
  >
    <component :is="'style'">{{ menuThemeCss }}</component>
    <vue-datepicker
      :ui="mergedUi"
      :model-value="modelValue"
      :multi-calendars="multiCalendars"
      :model-type="modelType"
      :position="position"
      :dark="dark"
      :format="format"
      :auto-position="autoPosition"
      :alt-position="altPosition"
      :transitions="transitions"
      :format-locale="formatLocale"
      :utc="utc"
      :aria-labels="ariaLabels"
      :offset="offset"
      :hide-navigation="hideNavigation"
      :timezone="timezone"
      :vertical="vertical"
      :disable-month-year-select="disableMonthYearSelect"
      :disable-year-select="disableYearSelect"
      :day-class="dayClass"
      :year-range="yearRange"
      :enable-time-picker="enableTimePicker"
      :auto-apply="autoApply"
      :disabled-dates="disabledDates"
      :month-name-format="monthNameFormat"
      :start-date="startDate"
      :start-time="startTime"
      :hide-offset-dates="hideOffsetDates"
      :no-today="noToday"
      :disabled-week-days="disabledWeekDays"
      :allowed-dates="allowedDates"
      :now-button-label="nowButtonLabel"
      :markers="markers"
      :esc-close="escClose"
      :space-confirm="spaceConfirm"
      :month-change-on-arrows="monthChangeOnArrows"
      :preset-dates="presetDates"
      :flow="flow"
      :partial-flow="partialFlow"
      :prevent-min-max-navigation="preventMinMaxNavigation"
      :reverse-years="reverseYears"
      :week-picker="weekPicker"
      :filters="filters"
      :arrow-navigation="arrowNavigation"
      :highlight="highlight"
      :teleport="teleport"
      :teleport-center="teleportCenter"
      :locale="locale"
      :week-num-name="weekNumName"
      :week-start="weekStart"
      :week-numbers="weekNumbers"
      :month-change-on-scroll="monthChangeOnScroll"
      :day-names="dayNames"
      :month-picker="monthPicker"
      :custom-props="customProps"
      :year-picker="yearPicker"
      :model-auto="modelAuto"
      :select-text="selectText"
      :cancel-text="cancelText"
      :preview-format="previewFormat"
      :multi-dates="multiDates"
      :ignore-time-validation="ignoreTimeValidation"
      :min-date="minDate"
      :max-date="maxDate"
      :placeholder="placeholder"
      :hide-input-icon="hideInputIcon"
      :clearable="clearable"
      :state="state"
      :required="required"
      :autocomplete="autocomplete"
      :time-picker="timePicker"
      :enable-seconds="enableSeconds"
      :no-hours-overlay="noHoursOverlay"
      :no-minutes-overlay="noMinutesOverlay"
      :no-seconds-overlay="noSecondsOverlay"
      :hours-grid-increment="hoursGridIncrement"
      :minutes-grid-increment="minutesGridIncrement"
      :seconds-grid-increment="secondsGridIncrement"
      :hours-increment="hoursIncrement"
      :minutes-increment="minutesIncrement"
      :seconds-increment="secondsIncrement"
      :range="range"
      :uid="uid"
      :inline="inline"
      :text-input="textInput"
      :no-disabled-range="noDisabledRange"
      :six-weeks="sixWeeks"
      :action-row="actionRow"
      :focus-start-date="focusStartDate"
      :disabled-times="disabledTimes"
      :show-last-in-range="showLastInRange"
      :time-picker-inline="timePickerInline"
      :calendar="calendar"
      :config="config"
      :quarter-picker="quarterPicker"
      :year-first="yearFirst"
      :is-24="is24"
      @update:model-value="onSelect"
    >
      <template #dp-input="{ value, onEnter, onTab }">
        <x-input
          ref="inputRef"
          :readonly="textInput === false || readonly"
          :model-value="value"
          :label="computedLabel"
          :size="computedSize"
          :disabled="isDisabled"
          :helper="helper"
          :is-inside-input-group="isInsideInputGroup"
          icon-right="calendar"
          :loading="loading"
          data-1p-ignore
          :name="name"
          :rules="rules"
          :tooltip="tooltip"
          :placeholder="placeholder"
          :required="required"
          :hide-footer="hideFooterInternal"
          @keydown.prevent.enter="onEnter"
          @keydown.tab="onTab"
        />
      </template>

      <template v-for="(_, name) in $slots" #[name]="slotProps = {}">
        <slot v-bind="slotProps" :name="name"></slot>
      </template>
    </vue-datepicker>
  </div>
</template>

<style>
.dp__menu {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -4px rgb(0 0 0 / 10%);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);

  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.dp--clear-btn {
  top: var(--dp-clear-btn-top, 2.75rem) !important;
}

.dp--clear-btn svg {
  height: 1rem;
  width: 1rem;
}

.dp__theme_dark {
  --dp-background-color: var(--x-datepicker-dark-bg, #212121) !important;
  --dp-text-color: var(--x-datepicker-dark-text, #fff) !important;
  --dp-hover-color: var(--x-datepicker-dark-range, #484848) !important;
  --dp-hover-text-color: #fff;
  --dp-hover-icon-color: var(--x-datepicker-dark-icon, #959595) !important;
  --dp-primary-color: var(--x-datepicker-dark-primary, #1976d2) !important;
  --dp-primary-disabled-color: #61a8ea;
  --dp-primary-text-color: #fff;
  --dp-secondary-color: var(--x-datepicker-dark-disabled, #a9a9a9) !important;
  --dp-border-color: var(--x-datepicker-dark-border, #2d2d2d) !important;
  --dp-menu-border-color: var(--x-datepicker-dark-border, #2d2d2d) !important;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #737373;
  --dp-disabled-color-text: var(--x-datepicker-dark-disabled, #d0d0d0) !important;
  --dp-scroll-bar-background: #212121;
  --dp-scroll-bar-color: var(--x-datepicker-dark-range, #484848) !important;
  --dp-success-color: #00701a;
  --dp-success-color-disabled: #428f59;
  --dp-icon-color: var(--x-datepicker-dark-icon, #959595) !important;
  --dp-danger-color: #e53935;
  --dp-marker-color: #e53935;
  --dp-tooltip-color: #3e3e3e;
  --dp-highlight-color: rgb(0 92 178 / 20%);
  --dp-range-between-dates-background-color: var(--x-datepicker-dark-range, #484848) !important;
  --dp-range-between-dates-text-color: var(--x-datepicker-dark-text, #fff) !important;
  --dp-range-between-border-color: var(--x-datepicker-dark-text, #fff) !important;
}

.dp__theme_light {
  --dp-background-color: var(--x-datepicker-bg, #fff) !important;
  --dp-text-color: var(--x-datepicker-text, #212121) !important;
  --dp-hover-color: var(--x-datepicker-range, #f3f3f3) !important;
  --dp-hover-text-color: #212121;
  --dp-hover-icon-color: var(--x-datepicker-icon, #959595) !important;
  --dp-primary-color: var(--x-datepicker-primary, #1976d2) !important;
  --dp-primary-disabled-color: #6bacea;
  --dp-primary-text-color: #f8f5f5;
  --dp-secondary-color: var(--x-datepicker-disabled, #c0c4cc) !important;
  --dp-border-color: var(--x-datepicker-border, #ddd) !important;
  --dp-menu-border-color: var(--x-datepicker-border, #ddd) !important;
  --dp-border-color-hover: #aaaeb7;
  --dp-disabled-color: #f6f6f6;
  --dp-scroll-bar-background: var(--x-datepicker-range, #f3f3f3) !important;
  --dp-scroll-bar-color: var(--x-datepicker-icon, #959595) !important;
  --dp-success-color: #76d275;
  --dp-success-color-disabled: #a3d9b1;
  --dp-icon-color: var(--x-datepicker-icon, #959595) !important;
  --dp-danger-color: #ff6f60;
  --dp-marker-color: #ff6f60;
  --dp-tooltip-color: #fafafa;
  --dp-disabled-color-text: var(--x-datepicker-disabled, #8e8e8e) !important;
  --dp-highlight-color: rgb(25 118 210 / 10%);
  --dp-range-between-dates-background-color: var(--x-datepicker-range, #f3f3f3) !important;
  --dp-range-between-dates-text-color: var(--x-datepicker-text, #212121) !important;
  --dp-range-between-border-color: var(--x-datepicker-range, #f3f3f3) !important;
}

.dark .dp__cell_inner {
  border: 0 !important;
}

.dp__selection_preview {
  padding: 4px;
  font-weight: 500;
  word-spacing: 4px;
  letter-spacing: 0.5px;
}

.dp__action_row {
  border-top: 1px solid var(--dp-border-color, #eee);
  margin-top: 10px;
}
</style>
