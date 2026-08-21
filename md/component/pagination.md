# Pagination
Controls for moving through large result sets page by page. Use pagination with tables, lists, and search results to keep each view manageable.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| links | Boolean |  | Renders page buttons as links (`?page=` query). |
| modelValue | Number | 1 | Current page (v-model). |
| size | String Size | md | Control size. One of xs, sm, md, lg, xl. |
| totalPages | Number | 1 | Total number of pages. |
| variant | String PaginationVariant | simple | Layout style (simple, quick, or dots). |

### Slots
- _(none)_

### Events
- `update:modelValue`: Emitted when the current page changes (v-model).

### Demos
#### Usage
```vue
<script setup lang="ts">
import { ref } from 'vue'

const totalPages = 10
const page = ref(1)
</script>

<template>
  <div class="space-y-10">
    <x-pagination v-model="page" :total-pages="totalPages" variant="quick" />
    <x-pagination v-model="page" :total-pages="totalPages" />
    <x-pagination v-model="page" :total-pages="totalPages" variant="dots" />
    <div>
      <p class="font-bold mb-2">Pagination with links (?page) query string</p>
      <x-pagination v-model="page" :total-pages="totalPages" links />
    </div>
  </div>
</template>
```

HTML docs: https://indielayer.com/component/pagination
