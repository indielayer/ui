# Radio
Radios allow the user to select one option from a set. Use classic radios for standard options, or x-radio-button for a button-shaped variant. Place several x-radio-button options inside x-form-group for a joined segmented control.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| color | String | primary | Theme or CSS color used for the control accents. |
| disabled | Boolean |  | Disables interaction and applies disabled styling. |
| error | String |  | External error message; overrides rule errors when set. |
| glow | Boolean |  | Soft colored glow behind the control. |
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
| value | [String, Number] |  | Value emitted when this option is selected (v-model / form-group). |

### Slots
- `default`: Optional content shown below the label.

### Events
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
const selected = ref('a')
</script>

<template>
  <div class="grid grid-cols-1 md:grid-cols-4 gap-4">
    <x-radio v-model="selected" name="inputName" value="a" label="Option A" />
    <x-radio v-model="selected" name="inputName" value="b" label="Option B" />
    <x-radio v-model="selected" name="inputName" value="c" label="Option C" />
    <x-radio v-model="selected" name="inputName" value="d" label="Option D" />
  </div>
</template>
```

#### Payment Method
```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('a')
</script>

<template>
  <div class="max-w-md space-y-1">
    <x-radio
      v-model="selected"
      value="a"
      label="Credit card"
      class="border p-3 rounded w-full"
      :class="{ 'bg-emerald-50 dark:bg-gray-800 border-emerald-400 dark:border-emerald-800': selected === 'a' }"
    >
      <div class="text-gray-400 font-light text-sm">VISA · · · · 2592</div>
    </x-radio>
    <x-radio
      v-model="selected"
      value="b"
      label="Bank account"
      class="border p-3 rounded w-full"
      :class="{ 'bg-emerald-50 dark:bg-gray-800 border-emerald-400 dark:border-emerald-800': selected === 'b' }"
    >
      <div class="text-gray-400 font-light text-sm">Santander · · · · 1580</div>
    </x-radio>
  </div>
</template>
```

#### Radio Button Form Group
```vue
<script setup lang="ts">
import { ref } from 'vue'

const plan = ref('pro')
</script>

<template>
  <x-form-group v-model="plan" label="Billing plan">
    <x-radio-button
      size="sm"
      value="starter"
      label="Starter"
      color="primary"
    />
    <x-radio-button
      size="sm"
      value="pro"
      label="Pro"
      color="primary"
    />
    <x-radio-button
      size="sm"
      value="team"
      label="Team"
      color="primary"
    />
  </x-form-group>
</template>
```

#### Radio Button
```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('monthly')
</script>

<template>
  <div class="inline-flex gap-2">
    <x-radio-button
      v-model="selected"
      value="monthly"
      label="Monthly"
      color="primary"
      light
      outlined
    />
    <x-radio-button
      v-model="selected"
      value="yearly"
      label="Yearly"
      color="primary"
      light
      outlined
    />
  </div>
</template>
```

#### Size
```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('a')
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <x-radio v-model="selected" size="xs" value="a" label="Option A" />
    <x-radio v-model="selected" size="sm" value="b" label="Option B" />
    <x-radio v-model="selected" size="md" value="c" label="Option C" />
    <x-radio v-model="selected" size="lg" value="d" label="Option D" />
    <x-radio v-model="selected" size="xl" value="e" label="Option E" />
  </div>
</template>
```

#### States
```vue
<script setup lang="ts">
import { ref } from 'vue'

const selected = ref('a')
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <x-radio v-model="selected" disabled value="a" label="Disabled" />
    <x-radio v-model="selected" loading value="b" label="Loading" />
    <x-radio v-model="selected" error="Invalid input" value="a" label="Error" />
  </div>
</template>
```

HTML docs: https://indielayer.com/component/radio
