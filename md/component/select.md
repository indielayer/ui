# Select
Dropdown for choosing one or more options from a predefined list. Use Select for enums, filters, and form fields where free text is not needed.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| clearable | Boolean |  | Shows a clear control when a value is selected. |
| color | String | secondary | Theme or CSS color used for the control accents. |
| disabled | Boolean |  | Disables interaction and applies disabled styling. |
| error | String |  | External error message; overrides rule errors when set. |
| filterPlaceholder | String | Filter by... | Placeholder for the filter input when `filterable` is enabled. |
| filterable | Boolean |  | Shows a filter input inside the options list. |
| filterablePrefix | Boolean |  | Includes option prefixes when filtering. |
| filterableSuffix | Boolean |  | Includes option suffixes when filtering. |
| flat | Boolean |  | Removes elevation and border emphasis on the trigger. |
| helper | String |  | Helper text shown below the field. |
| hideFooter | Boolean |  | Hides the footer area (helper / error). |
| hideSelectedOptionSlots | Boolean |  | Hides prefix/suffix slots on the selected value display. |
| id | String |  | Native id attribute for the input element. |
| label | String |  | Visible label text for the field. |
| loading | Boolean |  | Shows a loading indicator and blocks interaction. |
| loadingLabel | String |  | Accessible label announced while loading. |
| loadingStatus | String LoaderStatus | active | Loader visual status (for example active or indeterminate). |
| modelValue | [String, Number, Boolean, Object, Array] |  | Bound value (v-model). |
| multiple | Boolean |  | Allows selecting more than one option. |
| multipleCheckbox | Boolean |  | Multiple selection with checkbox-style items. |
| name | String |  | Native name attribute for form submission. |
| native | Boolean |  | Renders a native HTML select instead of the custom popover. |
| options | Array SelectOption[] |  | Available options (`value`, `label`, optional prefix/suffix/disabled). |
| placeholder | String |  | Placeholder shown when no option is selected. |
| placement | String PopoverPlacement |  | Popover placement for the options menu. |
| readonly | Boolean |  | Makes the field read-only without disabling it. |
| required | Boolean |  | Marks the field as required for validation. |
| rules | Array | [] | Validation rule functions or rule descriptors. |
| size | String Size | md | Control size. One of xs, sm, md, lg, xl. |
| skipFormRegistry | Boolean |  | Skips registering this field with a parent x-form. |
| tooltip | String |  | Optional tooltip text next to the label. |
| truncate | Boolean |  | Truncates selected labels when space is limited. |
| validateOnInput | Boolean | true | Runs validation on each input event when true. |
| virtualList | Boolean |  | Virtualizes the options list for large datasets. |
| virtualListItemHeight | Number | 33 | Estimated row height (px) used by the virtual list. |
| virtualListOffsetBottom | Number |  | Extra bottom offset (px) for the virtual list viewport. |
| virtualListOffsetTop | Number |  | Extra top offset (px) for the virtual list viewport. |
| virtualListOverscan | Number | 10 | Extra rows rendered above/below the visible virtual list window. |

### Slots
- `content-footer`: Content below the options list.
- `content-header`: Content above the options list (default includes the filter).
- `icon`: Custom chevron/icon on the trigger.
- `input`: Custom trigger content (popover, selected value, disabled, label).
- `label`: Custom label content for an option (`item`).
- `prefix`: Prefix content for an option or the selected value (`item`).
- `suffix`: Suffix content for an option or the selected value (`item`).

### Events
- `blur`: Emitted when the field loses focus.
- `change`: Emitted when the value is committed (change).
- `close`: Emitted when the options popover closes.
- `focus`: Emitted when the field receives focus.
- `input`: Emitted on native input events.
- `open`: Emitted when the options popover opens.
- `update:modelValue`: Emitted when the bound value changes (v-model).

### Methods
- `blur`: Remove focus from the underlying control.
- `focus`: Focus the underlying control.
- `reset`: Reset the field value and validation state.
- `setError`: Set an external error message on the field.
- `validate`: Run validation rules and return whether the field is valid.

### Demos
#### Usage
```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { SelectOption } from '@indielayer/ui'

const selected = ref<string>()
const selected2 = ref<string>()
const options = ref<SelectOption[]>([
  { value: 'A', label: 'Option A' },
  { value: 'B', label: 'Option B' },
  { value: 'C', label: 'Option C' },
])

// function to generate
function genOptions(x: number) {
  const options: SelectOption[] = []

  for (let i = 0; i < x; i++) {
    options.push({ value: i.toString(), label: 'Option ' + i, prefix: 'bg-green-500', suffix: 'dude' + i.toString() })
  }

  return options
}

const options2 = ref<SelectOption[]>(genOptions(1000))
</script>

<template>
  <div class="grid md:grid-cols-3 gap-4">
    <x-select
      v-model="selected"
      label="Simple native select"
      placeholder="Placeholder"
      :options="options"
      helper="Helper text"
      tooltip="Tooltip here"
      native
    />
    <x-select
      v-model="selected2"
      label="Filterable - virtual list"
      placeholder="Placeholder"
      filterable
      filterable-prefix
      filterable-suffix
      clearable
      virtual-list
      :virtual-list-item-height="33"
      :options="options2"
    >
      <template #prefix="{ item }">
        <div class="w-2 h-2 shrink-0 rounded-full text-xs" :class="item.prefix"></div>
      </template>
      <template #suffix="{ item }">
        <span class="text-secondary-400 text-xs font-mono">#{{ item.suffix }}</span>
      </template>
    </x-select>
    <x-select
      v-model="selected"
      label="Custom input"
      :options="options"
      helper="Helper text"
      tooltip="Tooltip here"
    >
      <template #input="{ popover, label, disabled }">
        <button
          type="button"
          class="w-full text-left border rounded-md px-3 py-2"
          :disabled="disabled"
          @click="popover?.show()"
        >{{ label || 'Select an option' }}</button>
      </template>
    </x-select>
  </div>
</template>
```

#### Multiple
```vue
<script setup lang="ts">
import { ref } from 'vue'

const selectedMultiple = ref<string[]>(['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'NON EXISTING'])

const options = ref([
  { value: 'A', label: 'Option lorem ipsum lorem ipsum', color: 'bg-red-500' },
  { value: 'B', label: 'Option B ipsum', color: 'bg-orange-500' },
  { value: 'C', label: 'Option C lorem ipsum', color: 'bg-amber-500' },
  { value: 'D', label: 'D', color: 'bg-yellow-500' },
  { value: 'E', label: 'E ipsum', color: 'bg-lime-500' },
  { value: 'F', label: 'Option F', color: 'bg-green-500' },
  { value: 'G', label: 'Option lorem ipsum qoiwjdoqiwjdoqiwjdoqiwjdoi', color: 'bg-emerald-500' },
  { value: 'H', label: 'Option H', color: 'bg-teal-500' },
  { value: 'I', label: 'lorem ipsum dolo', color: 'bg-cyan-500' },
  { value: 'J', label: 'Option J', color: 'bg-sky-500' },
  { value: 'K', label: 'Option K', color: 'bg-blue-500' },
  { value: 'L', label: 'consectetur adipi', color: 'bg-indigo-500' },
  { value: 'M', label: 'Option M', color: 'bg-violet-500' },
])

const optionsWithColors = options.value.map((option) => {
  return {
    ...option,
    prefix: option.color,
  }
})
</script>

<template>
  <div class="grid md:grid-cols-2 gap-4">
    <x-select
      v-model="selectedMultiple"
      label="Multi select"
      placeholder="Multiple"
      :options="options"
      filterable
      multiple
    />
    <x-select
      v-model="selectedMultiple"
      label="Multi select - truncate"
      placeholder="Multiple"
      :options="options"
      multiple
      truncate
      clearable
    />
    <x-select
      v-model="selectedMultiple"
      label="Multi select - checkbox"
      placeholder="Multiple"
      :options="options"
      multiple-checkbox
      filterable
    />
    <x-select
      v-model="selectedMultiple"
      label="Multi select - checkbox - prefix items"
      placeholder="Multiple"
      :options="optionsWithColors"
      multiple-checkbox
      filterable
      clearable
    >
      <template #prefix="{ item }">
        <div class="w-2 h-2 rounded-full" :class="item.prefix"></div>
      </template>
      <template #tag-prefix="{ item }">
        <div class="w-2 h-2 shrink-0 rounded-full" :class="item.prefix"></div>
      </template>
    </x-select>
  </div>
</template>
```

#### Size
```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref<string>()
const options = ref([
  { value: 'A', label: 'Option A' },
  { value: 'B', label: 'Option B' },
])
</script>

<template>
  <div class="grid md:grid-cols-5 gap-4">
    <x-select v-model="selected" :options="options" placeholder="xs" size="xs" />
    <x-select v-model="selected" :options="options" placeholder="sm" size="sm" />
    <x-select v-model="selected" :options="options" placeholder="md"/>
    <x-select v-model="selected" :options="options" placeholder="lg" size="lg" />
    <x-select v-model="selected" :options="options" placeholder="xl" size="xl" />
  </div>
</template>
```

#### States
```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('A')
const options = ref([
  { value: 'A', label: 'Option A' },
  { value: 'B', label: 'Option B' },
])
</script>

<template>
  <div class="grid md:grid-cols-4 gap-4">
    <x-select v-model="selected" label="Disabled" disabled :options="options"/>
    <x-select v-model="selected" label="Read Only" readonly :options="options"/>
    <x-select v-model="selected" label="Loading" loading :options="options"/>
    <x-select v-model="selected" label="Error" error="Invalid input" :options="options"/>
  </div>
</template>
```

HTML docs: https://indielayer.com/component/select
