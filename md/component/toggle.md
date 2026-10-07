# Toggle
Binary switch for on/off settings and mutually exclusive states. Use toggles when the choice should feel instant and reversible.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| color | String | primary | Theme or CSS color used for the control accents. |
| disabled | Boolean |  | Disables interaction and applies disabled styling. |
| error | String |  | External error message; overrides rule errors when set. |
| glow | Boolean |  | Soft colored glow when the toggle is on. |
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
- _(none)_

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

const checked = ref(true)
</script>

<template>
  <div class="grid grid-cols-2 gap-4">
    <x-toggle v-model="checked" label="Primary" />
    <x-toggle v-model="checked" color="sky" label="Sky" />
  </div>
</template>
```

#### States
```vue
<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(true)
</script>

<template>
  <div class="grid grid-cols-4 gap-4">
    <x-toggle disabled label="Disabled" />
    <x-toggle v-model="checked" loading label="Loading" color="blue"/>
    <x-toggle error="Invalid input" label="Error"/>
  </div>
</template>
```

#### Variants
```vue
<script setup lang="ts">
import { ref } from 'vue'

const checked = ref(false)
</script>

<template>
  <div class="flex items-center space-x-4">
    <x-toggle v-model="checked" size="xs" label="xs"/>
    <x-toggle v-model="checked" size="sm" label="sm"/>
    <x-toggle v-model="checked" label="md"/>
    <x-toggle v-model="checked" size="lg" label="lg"/>
    <x-toggle v-model="checked" size="xl" label="xl"/>
  </div>
</template>
```

HTML docs: https://indielayer.com/component/toggle
