# QR Code
Renders a QR code from a string or URL for scanning with mobile devices. Use it for share links, payments, and quick machine-readable payloads.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| backgroundColor | String | #fff | Background color behind the modules. |
| color | String | #000 | Foreground module color. |
| errorCorrectionLevel | String | M | Error correction level (L, M, Q, or H). Values: L, M, Q, H. |
| size | [String, Number] | 100 | Rendered size of the QR canvas in pixels. |
| value | String |  | Text or URL encoded in the QR code. |

### Slots
- _(none)_

### Events
- _(none)_

### Demos
#### Usage
```vue
<script setup lang="ts">
import { ref } from 'vue'

const value = ref('https://indielayer.com')
const selected = ref('M')
const options = [
  { value: 'L', label: 'Low' },
  { value: 'M', label: 'Medium' },
  { value: 'Q', label: 'Quartile' },
  { value: 'H', label: 'High' },
]
</script>

<template>
  <div class="grid grid-cols-2 gap-4 mb-2">
    <x-input v-model="value" label="QR Code Value"/>
    <x-select v-model="selected" native :options="options" label="Error correction"/>
  </div>
  <x-qr-code :value="value" size="140" :error-correction-level="selected"/>
</template>
```

HTML docs: https://indielayer.com/component/qrCode
