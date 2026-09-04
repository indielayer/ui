# Input
Single-line text field for entering and editing short values. Use x-input in forms for names, emails, search, and other one-line data.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| block | Boolean |  | Stretches to the full width of the parent. |
| clearable | Boolean |  | Shows a clear button when the value is not empty. |
| color | String | primary | Theme or CSS color used for the control accents. |
| dir | String 'ltr'  \|  'rtl' | ltr | Text direction for the native input (`ltr` or `rtl`). |
| disabled | Boolean |  | Disables interaction and applies disabled styling. |
| enterkeyhint | String 'enter'  \|  'done'  \|  'go'  \|  'next'  \|  'previous'  \|  'search'  \|  'send' |  | Native `enterkeyhint` for the virtual keyboard action key. |
| error | String |  | External error message; overrides rule errors when set. |
| helper | String |  | Helper text shown below the field. |
| hideFooter | Boolean |  | Hides the footer area (helper / error). |
| icon | String |  | Shortcut for `iconLeft`. |
| iconLeft | String |  | Icon name shown before the input value. |
| iconRight | String |  | Icon name shown after the input value. |
| id | String |  | Native id attribute for the input element. |
| inputmode | String 'none'  \|  'text'  \|  'decimal'  \|  'numeric'  \|  'tel'  \|  'search'  \|  'email'  \|  'url' |  | Native `inputmode` hint for virtual keyboards. |
| label | String |  | Visible label text for the field. |
| loading | Boolean |  | Shows a loading indicator and blocks interaction. |
| loadingLabel | String |  | Accessible label announced while loading. |
| loadingStatus | String LoaderStatus | active | Loader visual status (for example active or indeterminate). |
| max | [Number, String] |  | Native `max` attribute (typically for number inputs). |
| maxlength | [Number, String] |  | Maximum character length for the input value. |
| min | [Number, String] |  | Native `min` attribute (typically for number inputs). |
| minlength | [Number, String] |  | Minimum character length for the input value. |
| modelValue | [String, Number, Boolean, Object, Array] |  | Bound value (v-model). |
| name | String |  | Native name attribute for form submission. |
| placeholder | String |  | Placeholder text shown when the value is empty. |
| readonly | Boolean |  | Makes the field read-only without disabling it. |
| required | Boolean |  | Marks the field as required for validation. |
| rules | Array | [] | Validation rule functions or rule descriptors. |
| showCounter | Boolean |  | Shows a character counter in the footer. |
| showPasswordToggle | Boolean | true | Shows a visibility toggle when `type` is `password`. |
| size | String Size | md | Control size. One of xs, sm, md, lg, xl. |
| skipFormRegistry | Boolean |  | Skips registering this field with a parent x-form. |
| step | [Number, String] |  | Native `step` attribute for numeric inputs. |
| tooltip | String |  | Optional tooltip text next to the label. |
| type | String | text | Native input type (text, password, email, number, etc.). |
| validateOnInput | Boolean | true | Runs validation on each input event when true. |

### Slots
- `default`
- `prefix`: Content before the input (left adornment).
- `suffix`: Content after the input (right adornment).

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
const name = ref('John')
const title = ref('')
const amount = ref('')
</script>

<template>
  <div class="grid gap-6">
    <x-input
      v-model="name"
      label="Name"
      name="name"
      placeholder="Placeholder"
      helper="Helper text here"
      tooltip="Tooltip here"
      clearable
    />

    <x-input
      v-model="title"
      label="Title with character counter"
      name="title"
      maxlength="50"
      show-counter
      helper="Character counter is displayed"
      placeholder="Enter a title (max 50 characters)"
    />

    <x-input
      v-model="amount"
      label="Amount"
      inputmode="decimal"
      enterkeyhint="done"
      helper="Virtual keyboard uses decimal inputmode"
      placeholder="0.00"
    />
  </div>
</template>
```

#### Size
```vue
<script setup lang="ts">
import { ref } from 'vue'
const other = ref('Sample text')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-2">
    <x-input v-model="other" size="xs"/>
    <x-input v-model="other" size="sm"/>
    <x-input v-model="other" size="md"/>
    <x-input v-model="other" size="lg"/>
    <x-input v-model="other" size="xl"/>
  </div>
</template>
```

#### States
```vue
<script setup lang="ts">
import { ref } from 'vue'
const name = ref('not a valid input')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <x-input disabled label="Disabled"/>
    <x-input value="readonly" readonly label="Read only"/>
    <x-input v-model="name" label="Error" error="Invalid input" />
  </div>
</template>
```

#### Variants
```vue
<script setup lang="ts">
import { ref } from 'vue'
const password = ref('secret')
const other = ref('I have an icon')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <x-input
      v-model="password"
      label="Password input"
      type="password"
      show-password-toggle
    />
    <x-input v-model="other" label="Input with icon" icon-left="smile"/>
    <x-input v-model="other" label="Icon on the right" icon-right="smile" />
    <x-input
      v-model="other"
      icon="smile"
      label="Icon and suffix slot"
      class="md:col-span-3"
      clearable
    >
      <template #suffix>
        <span class="text-secondary-400 text-xs">min</span>
      </template>
    </x-input>
  </div>
</template>
```

HTML docs: https://indielayer.com/component/input
