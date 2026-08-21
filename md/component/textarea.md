# Textarea
Multi-line text field for longer content such as comments and descriptions. Use Textarea when a single-line input is not enough.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| adjustToText | Boolean |  | Auto-grows the height to fit the content. |
| block | Boolean |  | Stretches to the full width of the parent. |
| clearable | Boolean |  | Shows a clear button when the value is not empty. |
| dir | String | ltr | Text direction for the textarea (`ltr` or `rtl`). |
| disabled | Boolean |  | Disables interaction and applies disabled styling. |
| error | String |  | External error message; overrides rule errors when set. |
| helper | String |  | Helper text shown below the field. |
| hideFooter | Boolean |  | Hides the footer area (helper / error). |
| id | String |  | Native id attribute for the input element. |
| label | String |  | Visible label text for the field. |
| loading | Boolean |  | Shows a loading indicator and blocks interaction. |
| loadingLabel | String |  | Accessible label announced while loading. |
| loadingStatus | String LoaderStatus | active | Loader visual status (for example active or indeterminate). |
| max | [Number, String] |  | Native `max` attribute when applicable. |
| maxlength | [Number, String] |  | Maximum character length for the value. |
| min | [Number, String] |  | Native `min` attribute when applicable. |
| minlength | [Number, String] |  | Minimum character length for the value. |
| modelValue | [String, Number, Boolean, Object, Array] |  | Bound value (v-model). |
| name | String |  | Native name attribute for form submission. |
| placeholder | String |  | Placeholder text shown when the value is empty. |
| preventEnter | Boolean |  | Prevents the Enter key from inserting a newline. |
| readonly | Boolean |  | Makes the field read-only without disabling it. |
| required | Boolean |  | Marks the field as required for validation. |
| resizable | Boolean |  | Allows the user to resize the textarea. |
| rows | [Number, String] | 2 | Visible number of text lines. |
| rules | Array | [] | Validation rule functions or rule descriptors. |
| showCounter | Boolean |  | Shows a character counter in the footer. |
| size | String Size | md | Control size. One of xs, sm, md, lg, xl. |
| skipFormRegistry | Boolean |  | Skips registering this field with a parent x-form. |
| tooltip | String |  | Optional tooltip text next to the label. |
| validateOnInput | Boolean | true | Runs validation on each input event when true. |

### Slots
- `default`
- `prefix`: Content before the textarea (left adornment).
- `suffix`: Content after the textarea (right adornment).

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

const multiline = ref('')
const comment = ref('')
</script>

<template>
  <div class="grid gap-6">
    <div class="grid grid-cols-2 gap-4">
      <x-textarea
        v-model="multiline"
        label="Normal textarea"
        helper="Helper text"
        resizable
        placeholder="Placeholder"
        tooltip="Tooltip here"
        clearable
      />
      <x-textarea v-model="multiline" label="Multiline adjust" adjust-to-text clearable />
    </div>

    <x-textarea
      v-model="comment"
      label="Comment with character counter"
      maxlength="200"
      show-counter
      helper="Maximum 200 characters"
      placeholder="Enter your comment"
      rows="4"
    />
  </div>
</template>
```

#### States
```vue
<script setup lang="ts">
import { ref } from 'vue'
const name = ref('invalid input')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <x-textarea disabled label="Disabled"/>
    <x-textarea readonly label="Read only"/>
    <x-textarea v-model="name" label="Error" error="Invalid input" />
  </div>
</template>
```

#### Variants
```vue
<script setup lang="ts">
import { ref } from 'vue'
const sizes = ref('Text size')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <x-textarea v-model="sizes" label="xs" size="xs" />
    <x-textarea v-model="sizes" label="sm" size="sm" />
    <x-textarea v-model="sizes" label="md" />
    <x-textarea v-model="sizes" label="lg" size="lg" />
    <x-textarea v-model="sizes" label="xl" size="xl" />
  </div>
</template>
```

HTML docs: https://indielayer.com/component/textarea
