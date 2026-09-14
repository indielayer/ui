# Input Group
Input groups combine multiple inline fields (Input, Textarea, Select, Datepicker, Button) into one control with a shared label and footer.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| block | Boolean |  | Stretches the group to the full width of the parent. |
| disabled | Boolean |  | Disables interaction and applies disabled styling. |
| error | String |  | External error message; overrides rule errors when set. |
| helper | String |  | Helper text shown below the field. |
| hideFooter | Boolean |  | Hides the footer area (helper / error). |
| id | String |  | Native id attribute for the input element. |
| label | String |  | Visible label text for the field. |
| loading | Boolean |  | Shows a loading indicator and blocks interaction. |
| loadingLabel | String |  | Accessible label announced while loading. |
| loadingStatus | String LoaderStatus | active | Loader visual status (for example active or indeterminate). |
| modelValue | [String, Number, Boolean, Object, Array] |  | Bound value (v-model). |
| name | String |  | Native name attribute for form submission. |
| readonly | Boolean |  | Makes the field read-only without disabling it. |
| required | Boolean |  | Marks the field as required for validation. |
| rules | Array | [] | Validation rule functions or rule descriptors. |
| size | String Size | md | Control size. One of xs, sm, md, lg, xl. |
| skipFormRegistry | Boolean |  | Skips registering this field with a parent x-form. |
| tooltip | String |  | Optional tooltip text next to the label. |
| validateOnInput | Boolean | true | Runs validation on each input event when true. |

### Slots
- `default`: Grouped controls (inputs, buttons, or other adornments).

### Events
- `blur`: Emitted when the field loses focus.
- `change`: Emitted when the value is committed (change).
- `focus`: Emitted when the field receives focus.
- `input`: Emitted on native input events.
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

const country = ref('+1')
const phone = ref('')
</script>

<template>
  <div class="grid gap-6">
    <x-input-group label="Phone number" helper="Country code and local number">
      <x-input v-model="country" placeholder="+1" class="!w-24" />
      <x-input v-model="phone" placeholder="555-0000" />
    </x-input-group>

    <x-input-group label="Search" helper="Helper text here">
      <x-input v-model="phone" placeholder="Search…" />
      <x-button color="primary">Go</x-button>
    </x-input-group>
  </div>
</template>
```

#### Mixed
```vue
<script setup lang="ts">
import { ref } from 'vue'

const unit = ref('km')
const distance = ref('')

const unitOptions = [
  { value: 'km', label: 'km' },
  { value: 'mi', label: 'mi' },
]
</script>

<template>
  <x-input-group label="Distance">
    <x-select v-model="unit" :options="unitOptions" class="!w-28" />
    <x-input v-model="distance" placeholder="0" type="number" />
  </x-input-group>
</template>
```

#### Validation
```vue
<script setup lang="ts">
import { ref } from 'vue'

const start = ref('')
const end = ref('')

const rules = {
  required: (values: unknown) => {
    if (!Array.isArray(values)) return 'Both dates are required'

    if (values.length >= 2 && values.every((v) => !!v)) return true

    return 'Both dates are required'
  },
}
</script>

<template>
  <x-form @submit="() => {}">
    <div class="flex">
      <x-input-group
        label="Date range"
        helper="Select date and time"
        :rules="[rules.required]"
      >
        <x-datepicker
          v-model="start"
          teleport="body"
          placeholder="Date"
          :enable-time-picker="false"
        />
        <x-input v-model="end" type="time" placeholder="Time" />
      </x-input-group>
    </div>

    <x-button type="submit" color="primary">Submit</x-button>
  </x-form>
</template>
```

HTML docs: https://indielayer.com/component/inputGroup
