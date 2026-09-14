# Datepicker
Date and time picker styled as a wrapper around @vuepic/vue-datepicker. Use it for forms that need calendar or datetime selection with Indielayer look and feel.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| actionRow | Object Partial<any> | [] | Passed through to @vuepic/vue-datepicker. |
| allowedDates | Array string[]  \|  Date[] | null | Passed through to @vuepic/vue-datepicker. |
| altPosition | Function VueDatePickerProps['altPosition'] | null | Passed through to @vuepic/vue-datepicker. |
| alwaysClearable | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| ariaLabels | Object Partial<VueDatePickerProps['ariaLabels']> | [] | Passed through to @vuepic/vue-datepicker. |
| arrowNavigation | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| autoApply | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| autoPosition | Boolean boolean | true | Passed through to @vuepic/vue-datepicker. |
| autocomplete | String string | off | Passed through to @vuepic/vue-datepicker. |
| calendar | Function VueDatePickerProps['calendar'] | null | Passed through to @vuepic/vue-datepicker. |
| cancelText | String string | Cancel | Passed through to @vuepic/vue-datepicker. |
| clearable | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| config | Object Partial<VueDatePickerProps['config']> |  | Passed through to @vuepic/vue-datepicker. |
| customProps | Object as PropType<Record<string | null | Passed through to @vuepic/vue-datepicker. |
| dark | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| dayClass | Function (date: Date) = string> | null | Passed through to @vuepic/vue-datepicker. |
| dayNames | [Function, Array] | null | Passed through to @vuepic/vue-datepicker. |
| disableMonthYearSelect | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| disableYearSelect | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| disabled | Boolean |  | Disables interaction and applies disabled styling. |
| disabledDates | [Array, Function] | [] | Passed through to @vuepic/vue-datepicker. |
| disabledTimes | [Function, Array] |  | Passed through to @vuepic/vue-datepicker. |
| disabledWeekDays | Array string[]  \|  number[] | [] | Passed through to @vuepic/vue-datepicker. |
| enableMinutes | Boolean boolean | true | Passed through to @vuepic/vue-datepicker. |
| enableSeconds | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| enableTimePicker | Boolean boolean | true | Passed through to @vuepic/vue-datepicker. |
| error | String |  | External error message; overrides rule errors when set. |
| escClose | Boolean boolean | true | Passed through to @vuepic/vue-datepicker. |
| filters | Object Partial<VueDatePickerProps['filters']> | [] | Passed through to @vuepic/vue-datepicker. |
| flow | Array VueDatePickerProps['flow'] | [] | Passed through to @vuepic/vue-datepicker. |
| focusStartDate | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| format | [String, Function] | [] | Passed through to @vuepic/vue-datepicker. |
| formatLocale | Object Locale | null | Passed through to @vuepic/vue-datepicker. |
| helper | String |  | Helper text shown below the field. |
| hideFooter | Boolean |  | Hides the footer area (helper / error). |
| hideInputIcon | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| hideNavigation | Array VueDatePickerProps['hideNavigation'] | [] | Passed through to @vuepic/vue-datepicker. |
| hideOffsetDates | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| highlight | [Function, Object] | null | Passed through to @vuepic/vue-datepicker. |
| hoursGridIncrement | [String, Number] | 1 | Passed through to @vuepic/vue-datepicker. |
| hoursIncrement | [Number, String] | 1 | Passed through to @vuepic/vue-datepicker. |
| id | String |  | Native id attribute for the input element. |
| ignoreTimeValidation | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| inline | [Boolean, Object] | false | Passed through to @vuepic/vue-datepicker. |
| is24 | Boolean boolean | true | Passed through to @vuepic/vue-datepicker. |
| label | String |  | Visible label text for the field. |
| loading | Boolean |  | Shows a loading indicator and blocks interaction. |
| loadingLabel | String |  | Accessible label announced while loading. |
| loadingStatus | String LoaderStatus | active | Loader visual status (for example active or indeterminate). |
| locale | String string | en-Us | Passed through to @vuepic/vue-datepicker. |
| markers | Array VueDatePickerProps['markers'] | [] | Passed through to @vuepic/vue-datepicker. |
| maxDate | [Date, String] | null | Passed through to @vuepic/vue-datepicker. |
| maxTime | Object Partial<TimeModel> | null | Passed through to @vuepic/vue-datepicker. |
| minDate | [Date, String] | null | Passed through to @vuepic/vue-datepicker. |
| minTime | Object Partial<TimeModel> | null | Passed through to @vuepic/vue-datepicker. |
| minutesGridIncrement | [String, Number] | 5 | Passed through to @vuepic/vue-datepicker. |
| minutesIncrement | [Number, String] | 1 | Passed through to @vuepic/vue-datepicker. |
| modelAuto | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| modelType | String VueDatePickerProps['modelType'] | null | Passed through to @vuepic/vue-datepicker. |
| modelValue | [String, Date, Array, Object, Number] | null | Passed through to @vuepic/vue-datepicker. |
| monthChangeOnArrows | Boolean boolean | true | Passed through to @vuepic/vue-datepicker. |
| monthChangeOnScroll | [Boolean, String] | true | Passed through to @vuepic/vue-datepicker. |
| monthNameFormat | String 'long'  \|  'short' | short | Passed through to @vuepic/vue-datepicker. |
| monthPicker | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| multiCalendars | [Boolean, Number, String, Object] |  | Passed through to @vuepic/vue-datepicker. |
| multiDates | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| name | String |  | Native name attribute for form submission. |
| noDisabledRange | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| noHoursOverlay | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| noMinutesOverlay | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| noSecondsOverlay | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| noToday | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| nowButtonLabel | String string | Now | Passed through to @vuepic/vue-datepicker. |
| offset | [Number, String] | 10 | Passed through to @vuepic/vue-datepicker. |
| onInternalModelChange | [Function, Object] | null | Passed through to @vuepic/vue-datepicker. |
| partialFlow | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| placeholder | String string |  | Passed through to @vuepic/vue-datepicker. |
| position | String VueDatePickerProps['position'] | center | Passed through to @vuepic/vue-datepicker. |
| presetDates | Array VueDatePickerProps['presetDates'] | [] | Passed through to @vuepic/vue-datepicker. |
| preventMinMaxNavigation | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| previewFormat | [String, Function] | [] | Passed through to @vuepic/vue-datepicker. |
| quarterPicker | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| range | [Boolean, Object] | false | Passed through to @vuepic/vue-datepicker. |
| readonly | Boolean |  | Makes the field read-only without disabling it. |
| required | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| reverseYears | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| rules | Array | [] | Validation rule functions or rule descriptors. |
| secondsGridIncrement | [String, Number] | 5 | Passed through to @vuepic/vue-datepicker. |
| secondsIncrement | [Number, String] | 1 | Passed through to @vuepic/vue-datepicker. |
| selectText | String string | Select | Passed through to @vuepic/vue-datepicker. |
| showLastInRange | Boolean boolean | true | Passed through to @vuepic/vue-datepicker. |
| sixWeeks | [Boolean, String] | false | Passed through to @vuepic/vue-datepicker. |
| size | String Size | md | Control size. One of xs, sm, md, lg, xl. |
| skipFormRegistry | Boolean |  | Skips registering this field with a parent x-form. |
| spaceConfirm | Boolean boolean | true | Passed through to @vuepic/vue-datepicker. |
| startDate | [Date, String] | null | Passed through to @vuepic/vue-datepicker. |
| startTime | [Object, Array] | null | Passed through to @vuepic/vue-datepicker. |
| state | Boolean VueDatePickerProps['state'] | null | Passed through to @vuepic/vue-datepicker. |
| teleport | [String, Boolean, Object] | null | Passed through to @vuepic/vue-datepicker. |
| teleportCenter | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| textInput | [Boolean, Object] | false | Passed through to @vuepic/vue-datepicker. |
| timePicker | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| timePickerInline | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| timezone | [String, Object] | null | Passed through to @vuepic/vue-datepicker. |
| tooltip | String |  | Optional tooltip text next to the label. |
| transitions | [Boolean, Object] | true | Passed through to @vuepic/vue-datepicker. |
| ui | Object Partial<VueDatePickerProps['ui']> | [] | Passed through to @vuepic/vue-datepicker. |
| uid | String string | null | Passed through to @vuepic/vue-datepicker. |
| utc | [Boolean, String] | false | Passed through to @vuepic/vue-datepicker. |
| validateOnInput | Boolean | true | Runs validation on each input event when true. |
| vertical | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| weekNumName | String string | W | Passed through to @vuepic/vue-datepicker. |
| weekNumbers | [String, Function, Object] | null | Passed through to @vuepic/vue-datepicker. |
| weekPicker | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| weekStart | [Number, String] | 1 | Passed through to @vuepic/vue-datepicker. |
| yearFirst | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| yearPicker | Boolean boolean | false | Passed through to @vuepic/vue-datepicker. |
| yearRange | Array number[] | [] | Passed through to @vuepic/vue-datepicker. |

### Slots
- `dp-input`: Custom input trigger; receives value, onEnter, and onTab from vue-datepicker.

### Events
- `blur`: Emitted when the field loses focus.
- `change`: Emitted when the value is committed (change).
- `focus`: Emitted when the field receives focus.
- `input`: Emitted on native input events.
- `update:modelValue`: Emitted when the bound value changes (v-model).

### Methods
- `blur`: Remove focus from the datepicker input.
- `focus`: Focus the datepicker input.
- `validate`: Run validation on the underlying input.

### Demos
#### Usage
```vue
<script setup lang="ts">
import { ref } from 'vue'

const date = ref()
const startDate = new Date()
const endDate = new Date(new Date().setDate(startDate.getDate() + 7))

date.value = [startDate, endDate]
</script>

<template>
  <x-datepicker
    v-model="date"
    label="Date"
    tooltip="Use it to pick a date"
    clearable
    text-input
    multi-calendars
    time-picker-inline
    range
  />
</template>
```

HTML docs: https://indielayer.com/component/datepicker
