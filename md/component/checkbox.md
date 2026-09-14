# Checkbox
Multi-select controls for choosing one or more options independently. Use checkboxes for settings and lists where more than one choice can be active.
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
| indeterminate | Boolean |  | Shows an indeterminate (mixed) check state. |
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
| value | [String, Number] |  | Value used when the checkbox is inside an x-form-group (array selection). |

### Slots
- `default`: Label content when the `label` prop is not set.
- `icon`: Custom checked-state icon.

### Events
- `update:modelValue`: Emitted when the bound value changes (v-model).

### Methods
- `blur`: Remove focus from the underlying control.
- `focus`: Focus the underlying control.
- `reset`: Reset the field value and validation state.
- `setError`: Set an external error message on the field.
- `toggle`: Toggle the checked state (no-op when disabled, loading, or readonly).
- `validate`: Run validation rules and return whether the field is valid.

### Demos
#### Usage
```vue
<script setup lang="ts">
import { ref } from 'vue'
const checked = ref(true)
</script>

<template>
  <x-checkbox v-model="checked" label="Checkbox label" color="primary" />
</template>
```

#### Size
```vue
<template>
  <div class="space-x-4">
    <x-checkbox size="xs">xs</x-checkbox>
    <x-checkbox size="sm">sm</x-checkbox>
    <x-checkbox>md</x-checkbox>
    <x-checkbox size="lg">lg</x-checkbox>
    <x-checkbox size="xl">xl</x-checkbox>
  </div>
</template>
```

#### States
```vue
<template>
  <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
    <x-checkbox disabled label="Disabled" />
    <x-checkbox helper="Helper text">Helper</x-checkbox>
    <x-checkbox loading>Loading</x-checkbox>
    <x-checkbox indeterminate>Indeterminate</x-checkbox>
    <x-checkbox error="Invalid input">Error</x-checkbox>
  </div>
</template>
```

#### Variants
```vue
<template>
  <div class="space-x-4">
    <x-checkbox glow color="emerald" label="Glow" />
    <x-checkbox glow color="rose" label="Do you agree?" />
    <x-checkbox glow color="amber" label="Maybe not?" />
    <x-checkbox glow color="sky" label="All the T&C? Really?" />
  </div>
</template>
```

HTML docs: https://indielayer.com/component/checkbox
