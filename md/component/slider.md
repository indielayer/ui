# Slider
Track with a draggable handle for picking a numeric value or range. Use sliders for volume, brightness, price filters, and similar continuous settings.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| color | String | primary | Theme or CSS color used for the control accents. |
| disabled | Boolean |  | Disables interaction and applies disabled styling. |
| error | String |  | External error message; overrides rule errors when set. |
| helper | String |  | Helper text shown below the field. |
| hideFooter | Boolean |  | Hides the footer area (helper / error). |
| id | String |  | Native id attribute for the input element. |
| label | String |  | Visible label text for the field. |
| loading | Boolean |  | Shows a loading indicator and blocks interaction. |
| loadingLabel | String |  | Accessible label announced while loading. |
| loadingStatus | String LoaderStatus | active | Loader visual status (for example active or indeterminate). |
| max | [Number, String] | 100 | Maximum value of the range. |
| min | [Number, String] | 0 | Minimum value of the range. |
| modelValue | [String, Number, Boolean, Object, Array] |  | Bound value (v-model). |
| name | String |  | Native name attribute for form submission. |
| readonly | Boolean |  | Makes the field read-only without disabling it. |
| required | Boolean |  | Marks the field as required for validation. |
| rules | Array | [] | Validation rule functions or rule descriptors. |
| skipFormRegistry | Boolean |  | Skips registering this field with a parent x-form. |
| step | [Number, String] | 1 | Increment between selectable values. |
| tooltip | String |  | Optional tooltip text next to the label. |
| validateOnInput | Boolean | true | Runs validation on each input event when true. |

### Slots
- `default`
- `prefix`: Content before the track (`value`).
- `suffix`: Content after the track (`value`).

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
const value = ref(30)
</script>

<template>
  <x-slider v-model="value" label="Slider 1">
    <template #prefix="ctx">
      <div class="w-12">{{ ctx.value }}%</div>
    </template>
  </x-slider>
  <x-slider v-model="value" label="Slider 2" helper="Slide me" class="mt-10"/>
</template>
```

HTML docs: https://indielayer.com/component/slider
