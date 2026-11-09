# FormGroup
Groups related fields with a shared label and validation context. Use form groups for checkboxes, radios, or inputs that belong to one logical section.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
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
| skipFormRegistry | Boolean |  | Skips registering this field with a parent x-form. |
| tooltip | String |  | Optional tooltip text next to the label. |
| validateOnInput | Boolean | true | Runs validation on each input event when true. |
| vertical | Boolean | false | Stacks child controls vertically instead of in a row. |

### Slots
- `default`: Grouped inputs (radios, checkboxes, radio buttons, etc.).

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
import { useNotifications } from '@indielayer/ui'
import { ref } from 'vue'

const notifications = useNotifications()

const selected = ref(['a'])
const checked = ref()

const rules = {
  isRequired: (v: string) => {
    if (Array.isArray(v)) return !!v.length || 'Field is required'

    return !!v  || 'Field is required'
  },
}

function onSubmit(isValid: string) {
  if (isValid) notifications?.success('Valid! Sumitted.')
  else notifications?.error('Invalid! Form has errors')
}
</script>

<template>
  <x-form title="Form with form groups" @submit="onSubmit">
    <x-form-group
      v-model="selected"
      label="Group of checkboxes"
      helper="Helper text"
      tooltip="Tooltip text"
      :rules="[rules.isRequired]"
      vertical
    >
      <x-checkbox name="selectgroup" value="a" label="Lorem ipsum dolor" />
      <x-checkbox name="selectgroup" value="b" label="Second option" />
    </x-form-group>

    <x-form-group v-model="checked" label="Group of radio buttons" helper="Helper text" :rules="[rules.isRequired]">
      <x-radio name="radiogroup" value="a" label="Option A" />
      <x-radio name="radiogroup" value="b" label="Option B" />
    </x-form-group>

    <template #primary-action>
      <x-button color="primary" type="submit">Submit</x-button>
    </template>
  </x-form>
</template>
```

HTML docs: https://indielayer.com/component/formGroup
