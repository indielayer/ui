<script lang="ts">
const vueDatepickerProps = {
  multiCalendars: { type: [Boolean, Number, String, Object] as PropType<VueDatePickerProps['multiCalendars']>, default: undefined },
  modelValue: { type: [String, Date, Array, Object, Number] as PropType<ModelValue>, default: null },
  modelType: { type: String as PropType<VueDatePickerProps['modelType']>, default: null },
  position: { type: String as PropType<VueDatePickerProps['position']>, default: 'center' },
  dark: { type: Boolean as PropType<boolean>, default: false },
  format: {
    type: [String, Function] as PropType<VueDatePickerProps['format']>,
    default: () => null,
  },
  autoPosition: { type: Boolean as PropType<boolean>, default: true },
  altPosition: { type: Function as PropType<VueDatePickerProps['altPosition']>, default: null },
  transitions: { type: [Boolean, Object] as PropType<boolean | Partial<VueDatePickerProps['transitions']>>, default: true },
  formatLocale: { type: Object as PropType<Locale>, default: null },
  utc: { type: [Boolean, String] as PropType<boolean | 'preserve'>, default: false },
  ariaLabels: { type: Object as PropType<Partial<VueDatePickerProps['ariaLabels']>>, default: () => ({}) },
  offset: { type: [Number, String] as PropType<number | string>, default: 10 },
  hideNavigation: { type: Array as PropType<VueDatePickerProps['hideNavigation']>, default: () => [] },
  timezone: { type: [String, Object] as PropType<VueDatePickerProps['timezone']>, default: null },
  emitTimezone: { type: String as PropType<string>, default: null },
  vertical: { type: Boolean as PropType<boolean>, default: false },
  disableMonthYearSelect: { type: Boolean as PropType<boolean>, default: false },
  disableYearSelect: { type: Boolean as PropType<boolean>, default: false },
  menuClassName: { type: String as PropType<string>, default: null },
  dayClass: { type: Function as PropType<(date: Date) => string>, default: null },
  yearRange: { type: Array as PropType<number[]>, default: () => [1900, 2100] },
  calendarCellClassName: { type: String as PropType<string>, default: null },
  enableTimePicker: { type: Boolean as PropType<boolean>, default: true },
  autoApply: { type: Boolean as PropType<boolean>, default: false },
  disabledDates: { type: [Array, Function] as PropType<VueDatePickerProps['disabledDates']>, default: () => [] },
  monthNameFormat: { type: String as PropType<'long' | 'short'>, default: 'short' },
  startDate: { type: [Date, String] as PropType<string | Date>, default: null },
  startTime: { type: [Object, Array] as PropType<VueDatePickerProps['startTime']>, default: null },
  hideOffsetDates: { type: Boolean as PropType<boolean>, default: false },
  autoRange: { type: [Number, String] as PropType<number | string>, default: null },
  noToday: { type: Boolean as PropType<boolean>, default: false },
  disabledWeekDays: { type: Array as PropType<string[] | number[]>, default: () => [] },
  allowedDates: { type: Array as PropType<string[] | Date[]>, default: null },
  nowButtonLabel: { type: String as PropType<string>, default: 'Now' },
  markers: { type: Array as PropType<VueDatePickerProps['markers']>, default: () => [] },
  escClose: { type: Boolean as PropType<boolean>, default: true },
  spaceConfirm: { type: Boolean as PropType<boolean>, default: true },
  monthChangeOnArrows: { type: Boolean as PropType<boolean>, default: true },
  presetDates: { type: Array as PropType<VueDatePickerProps['presetDates']>, default: () => [] },
  flow: { type: Array as PropType<VueDatePickerProps['flow']>, default: () => [] },
  partialFlow: { type: Boolean as PropType<boolean>, default: false },
  preventMinMaxNavigation: { type: Boolean as PropType<boolean>, default: false },
  minRange: { type: [Number, String] as PropType<number | string>, default: null },
  maxRange: { type: [Number, String] as PropType<number | string>, default: null },
  multiDatesLimit: { type: [Number, String] as PropType<number | string>, default: null },
  reverseYears: { type: Boolean as PropType<boolean>, default: false },
  weekPicker: { type: Boolean as PropType<boolean>, default: false },
  filters: { type: Object as PropType<Partial<VueDatePickerProps['filters']>>, default: () => ({}) },
  arrowNavigation: { type: Boolean as PropType<boolean>, default: false },
  disableTimeRangeValidation: { type: Boolean as PropType<boolean>, default: false },
  highlight: {
    type: [Function, Object] as PropType<VueDatePickerProps['highlight']>,
    default: null,
  },
  teleport: { type: [String, Boolean, Object] as PropType<string | boolean | HTMLElement>, default: null },
  teleportCenter: { type: Boolean as PropType<boolean>, default: false },
  locale: { type: String as PropType<string>, default: 'en-Us' },
  weekNumName: { type: String as PropType<string>, default: 'W' },
  weekStart: { type: [Number, String] as PropType<VueDatePickerProps['weekStart']>, default: 1 },
  weekNumbers: {
    type: [String, Function, Object] as PropType<VueDatePickerProps['weekNumbers']>,
    default: null,
  },
  calendarClassName: { type: String as PropType<string>, default: null },
  monthChangeOnScroll: { type: [Boolean, String] as PropType<boolean | 'inverse'>, default: true },
  dayNames: {
    type: [Function, Array] as PropType<((lang: string, weekStart: number) => string[]) | string[]>,
    default: null,
  },
  monthPicker: { type: Boolean as PropType<boolean>, default: false },
  customProps: { type: Object as PropType<Record<string, unknown>>, default: null },
  yearPicker: { type: Boolean as PropType<boolean>, default: false },
  modelAuto: { type: Boolean as PropType<boolean>, default: false },
  selectText: { type: String as PropType<string>, default: 'Select' },
  cancelText: { type: String as PropType<string>, default: 'Cancel' },
  previewFormat: {
    type: [String, Function] as PropType<VueDatePickerProps['previewFormat']>,
    default: () => '',
  },
  multiDates: { type: Boolean as PropType<boolean>, default: false },
  partialRange: { type: Boolean as PropType<boolean>, default: true },
  ignoreTimeValidation: { type: Boolean as PropType<boolean>, default: false },
  minDate: { type: [Date, String] as PropType<Date | string>, default: null },
  maxDate: { type: [Date, String] as PropType<Date | string>, default: null },
  minTime: { type: Object as PropType<Partial<TimeModel>>, default: null },
  maxTime: { type: Object as PropType<Partial<TimeModel>>, default: null },
  placeholder: { type: String as PropType<string>, default: '' },
  hideInputIcon: { type: Boolean as PropType<boolean>, default: false },
  clearable: { type: Boolean as PropType<boolean>, default: false },
  state: { type: Boolean as PropType<VueDatePickerProps['state']>, default: null },
  required: { type: Boolean as PropType<boolean>, default: false },
  autocomplete: { type: String as PropType<string>, default: 'off' },
  inputClassName: { type: String as PropType<string>, default: null },
  fixedStart: { type: Boolean as PropType<boolean>, default: false },
  fixedEnd: { type: Boolean as PropType<boolean>, default: false },
  timePicker: { type: Boolean as PropType<boolean>, default: false },
  enableSeconds: { type: Boolean as PropType<boolean>, default: false },
  is24: { type: Boolean as PropType<boolean>, default: true },
  noHoursOverlay: { type: Boolean as PropType<boolean>, default: false },
  noMinutesOverlay: { type: Boolean as PropType<boolean>, default: false },
  noSecondsOverlay: { type: Boolean as PropType<boolean>, default: false },
  hoursGridIncrement: { type: [String, Number] as PropType<string | number>, default: 1 },
  minutesGridIncrement: { type: [String, Number] as PropType<string | number>, default: 5 },
  secondsGridIncrement: { type: [String, Number] as PropType<string | number>, default: 5 },
  hoursIncrement: { type: [Number, String] as PropType<number | string>, default: 1 },
  minutesIncrement: { type: [Number, String] as PropType<number | string>, default: 1 },
  secondsIncrement: { type: [Number, String] as PropType<number | string>, default: 1 },
  range: { type: [Boolean, Object] as PropType<VueDatePickerProps['range']>, default: false },
  uid: { type: String as PropType<string>, default: null },
  inline: { type: [Boolean, Object] as PropType<VueDatePickerProps['inline']>, default: false },
  textInput: { type: [Boolean, Object] as PropType<VueDatePickerProps['textInput']>, default: false },
  noDisabledRange: { type: Boolean as PropType<boolean>, default: false },
  sixWeeks: { type: [Boolean, String] as PropType<VueDatePickerProps['sixWeeks']>, default: false },
  actionRow: { type: Object as PropType<Partial<any>>, default: () => ({}) },
  focusStartDate: { type: Boolean as PropType<boolean>, default: false },
  disabledTimes: { type: [Function, Array] as PropType<VueDatePickerProps['disabledTimes']>, default: undefined },
  showLastInRange: { type: Boolean as PropType<boolean>, default: true },
  timePickerInline: { type: Boolean as PropType<boolean>, default: false },
  calendar: { type: Function as PropType<VueDatePickerProps['calendar']>, default: null },
  config: { type: Object as PropType<Partial<VueDatePickerProps['config']>>, default: undefined },
  quarterPicker: { type: Boolean as PropType<boolean>, default: false },
  yearFirst: { type: Boolean as PropType<boolean>, default: false },
}

const datepickerProps = {
  ...useCommon.props(),
  ...useInteractive.props(),
  ...useInputtable.props(),
  ...vueDatepickerProps,
}

export type DatepickerProps = ExtractPublicPropTypes<typeof datepickerProps>

type InternalClasses = 'wrapper'
export interface DatepickerTheme extends ThemeComponent<DatepickerProps, InternalClasses> {}

export default {
  name: 'XDatepicker',
}
</script>

<script setup lang="ts">
import { ref, type ExtractPublicPropTypes, type PropType } from 'vue'
import { useMutationObserver } from '@vueuse/core'
import { useCommon } from '../../composables/useCommon'
import { useInputtable } from '../../composables/useInputtable'
import { useInteractive } from '../../composables/useInteractive'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import XInput from '../input/Input.vue'
import type { Locale } from 'date-fns'
import VueDatepicker, { type ModelValue, type TimeModel, type VueDatePickerProps } from '@vuepic/vue-datepicker'
import '@vuepic/vue-datepicker/dist/main.css'

const props = defineProps(datepickerProps)

const emit = defineEmits(useInputtable.emits())

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

const htmlNode = document?.querySelector('html')
const dark = ref(htmlNode?.classList.contains('dark') ?? false)

useMutationObserver(htmlNode, (mutations) => {
  if (mutations[0] && mutations[0].attributeName === 'class') {
    dark.value = htmlNode?.classList.contains('dark') ?? false
  }
}, {
  attributes: true,
})

defineExpose({ focus, blur, validate })

const { styles, classes, className } = useTheme('Datepicker', {}, props)
</script>

<template>
  <div
    :style="styles"
    :class="[
      className,
      classes.wrapper,
    ]"
  >
    <vue-datepicker
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
      :emit-timezone="emitTimezone"
      :vertical="vertical"
      :disable-month-year-select="disableMonthYearSelect"
      :disable-year-select="disableYearSelect"
      :menu-class-name="menuClassName"
      :day-class="dayClass"
      :year-range="yearRange"
      :calendar-cell-class-name="calendarCellClassName"
      :enable-time-picker="enableTimePicker"
      :auto-apply="autoApply"
      :disabled-dates="disabledDates"
      :month-name-format="monthNameFormat"
      :start-date="startDate"
      :start-time="startTime"
      :hide-offset-dates="hideOffsetDates"
      :auto-range="autoRange"
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
      :min-range="minRange"
      :max-range="maxRange"
      :multi-dates-limit="multiDatesLimit"
      :reverse-years="reverseYears"
      :week-picker="weekPicker"
      :filters="filters"
      :arrow-navigation="arrowNavigation"
      :disable-time-range-validation="disableTimeRangeValidation"
      :highlight="highlight"
      :teleport="teleport"
      :teleport-center="teleportCenter"
      :locale="locale"
      :week-num-name="weekNumName"
      :week-start="weekStart"
      :week-numbers="weekNumbers"
      :calendar-class-name="calendarClassName"
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
      :partial-range="partialRange"
      :ignore-time-validation="ignoreTimeValidation"
      :min-date="minDate"
      :max-date="maxDate"
      :placeholder="placeholder"
      :hide-input-icon="hideInputIcon"
      :clearable="clearable"
      :state="state"
      :required="required"
      :autocomplete="autocomplete"
      :input-class-name="inputClassName"
      :fixed-start="fixedStart"
      :fixed-end="fixedEnd"
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
          readonly
          :model-value="value"
          :label="label"
          :size="size"
          :disabled="disabled"
          :helper="helper"
          icon-right="calendar"
          :loading="loading"
          :name="name"
          :rules="rules"
          :tooltip="tooltip"
          :placeholder="placeholder"
          :required="required"
          :hide-footer="hideFooter"
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

<style lang="postcss">
/* stylelint-disable selector-class-pattern */
.dp__menu {
  --tw-shadow: 0 10px 15px -3px rgb(0 0 0 / 10%), 0 4px 6px -4px rgb(0 0 0 / 10%);
  --tw-shadow-colored: 0 10px 15px -3px var(--tw-shadow-color), 0 4px 6px -4px var(--tw-shadow-color);

  box-shadow: var(--tw-ring-offset-shadow, 0 0 #0000), var(--tw-ring-shadow, 0 0 #0000), var(--tw-shadow);
}

.dp__clear_icon {
  top: 2.75rem !important;
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
</style>
