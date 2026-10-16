# Modal
Dialog overlay that focuses attention on a task or message above the current page. Use modals for confirmations, forms, and details that need temporary focus.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| backdrop | Boolean | true | Shows a dimmed backdrop behind the dialog. |
| blurry | Boolean |  | Applies a blur filter to the backdrop. |
| description | String |  | Body description shown above the default slot. |
| fluid | Boolean |  | Stretches the dialog to fill available width within its size. |
| formAutoValidate | Boolean | true | Auto-validate the inner form on submit when `isForm` is set. |
| formDescription | String |  | Description passed to the inner form when `isForm` is set. |
| formDisabled | Boolean |  | Disables the inner form when `isForm` is set. |
| formErrors | [Array, Object] | [] | External form errors passed to the inner form when `isForm` is set. |
| formTitle | String |  | Title passed to the inner form when `isForm` is set. |
| hasActions | Boolean | true | Renders the default actions footer region when no footer slot is used. |
| hasHeader | Boolean | true | Renders the default header region when no header slot is used. |
| icon | String |  | Icon name shown before the label and title in the header. |
| label | String |  | Small label above the title in the header. |
| loading | Boolean |  | Loading state for the modal (theme/visual). |
| loadingText | String |  | Text shown while loading. |
| modelValue | Boolean |  | Open state (v-model). |
| persistent | Boolean |  | Prevents closing on Escape or backdrop click. |
| position | String ModalPosition | center | Vertical placement of the dialog (top, center, bottom). |
| showClose | Boolean |  | Shows a close button in the corner. |
| size | String ModalSize | lg | Dialog width preset (xs, sm, md, lg, xl, full). |
| title | String |  | Header title text. |

### Slots
- `actions`: Custom actions row inside the default footer.
- `cancel-action`: Cancel / dismiss control in the actions row.
- `default`: Main modal body content.
- `footer`: Replaces the default actions footer.
- `header`: Replaces the default header region.
- `header-content`: Custom header content inside the default header layout.
- `icon`: Custom header icon; overrides the `icon` prop.
- `image`: Optional media above the header.
- `primary-action`: Primary action control in the actions row.
- `secondary-action`: Secondary action control in the actions row.
- `tertiary-action`: Tertiary action control in the actions row.

### Events
- `submit`: Emitted when the inner form submits. Payload is the validation result.
- `update:modelValue`: Emitted when open state changes (v-model).

### Methods
- `close`: Close the modal.
- `open`: Open the modal.

### Demos
#### Usage
```vue
<script setup lang="ts">
import { ref } from 'vue'
const show = ref(false)
const show1 = ref(false)
const show2 = ref(false)
const show3 = ref(false)
const show4 = ref(false)
</script>

<template>
  <x-modal
    v-model="show"
    title="Header"
    show-close
    backdrop
    size="sm"
  >
    <template #image>
      <x-image src="https://images.unsplash.com/photo-1543352634-99a5d50ae78e?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1742&q=80" alt=""/>
    </template>

    <div>
      Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure praesentium non id dolores vitae. Nam ratione veritatis ab cumque voluptas porro illum, voluptate perferendis ducimus dolorem optio magni assumenda dolore! Doloremque facere aliquid facilis distinctio accusamus, dolorum eligendi consequuntur molestias sapiente non rem vero sed eos minus itaque sunt officiis iste ea repellendus possimus earum maiores? Quo laudantium fuga odit tenetur sint fugit deleniti dolores placeat, accusamus magni consectetur unde totam sunt labore dolor rem consequatur quaerat! Iure temporibus voluptatem cumque, dolore maiores rerum neque vero, iusto veritatis repellat eligendi amet! Molestiae cumque officiis eius harum iste, fuga corporis molestias.
    </div>

    <template #actions>
      <div class="text-right space-x-4">
        <x-button tabindex="-1" @click="show = false">Cancel</x-button>
        <x-button color="success">Confirm</x-button>
      </div>
    </template>
  </x-modal>

  <x-modal
    v-model="show1"
    backdrop
    :has-actions="false"
    :has-header="false"
    show-close
    persistent
  >
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure praesentium non id dolores vitae. Nam ratione veritatis ab cumque voluptas porro illum, voluptate perferendis ducimus dolorem optio magni assumenda dolore! Doloremque facere aliquid facilis distinctio accusamus, dolorum eligendi consequuntur molestias sapiente non rem vero sed eos minus itaque sunt officiis iste ea repellendus possimus earum maiores? Quo laudantium fuga odit tenetur sint fugit deleniti dolores placeat, accusamus magni consectetur unde totam sunt labore dolor rem consequatur quaerat! Iure temporibus voluptatem cumque, dolore maiores rerum neque vero, iusto veritatis repellat eligendi amet! Molestiae cumque officiis eius harum iste, fuga corporis molestias.
  </x-modal>

  <x-modal v-model="show2" backdrop title="Title">

    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure praesentium non id dolores vitae. Nam ratione veritatis ab cumque voluptas porro illum, voluptate perferendis ducimus dolorem optio magni assumenda dolore! Doloremque facere aliquid facilis distinctio accusamus, dolorum eligendi consequuntur molestias sapiente non rem vero sed eos minus itaque sunt officiis iste ea repellendus possimus earum maiores? Quo laudantium fuga odit tenetur sint fugit deleniti dolores placeat, accusamus magni consectetur unde totam sunt labore dolor rem consequatur quaerat! Iure temporibus voluptatem cumque, dolore maiores rerum neque vero, iusto veritatis repellat eligendi amet! Molestiae cumque officiis eius harum iste, fuga corporis molestias.

    <template #actions>
      <x-button @click="show2 = false">Cancel</x-button>
      <x-button color="success">Confirm</x-button>
    </template>
  </x-modal>

  <x-modal v-model="show3" show-close :has-actions="false" title="Modal Title">
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure praesentium non id dolores vitae. Nam ratione veritatis ab cumque voluptas porro illum, voluptate perferendis ducimus dolorem optio magni assumenda dolore! Doloremque facere aliquid facilis distinctio accusamus, dolorum eligendi consequuntur molestias sapiente non rem vero sed eos minus itaque sunt officiis iste ea repellendus possimus earum maiores? Quo laudantium fuga odit tenetur sint fugit deleniti dolores placeat, accusamus magni consectetur unde totam sunt labore dolor rem consequatur quaerat! Iure temporibus voluptatem cumque, dolore maiores rerum neque vero, iusto veritatis repellat eligendi amet! Molestiae cumque officiis eius harum iste, fuga corporis molestias.
  </x-modal>

  <x-modal
    v-model="show4"
    title="Blurry backdrop"
    show-close
    backdrop
    blurry
    size="sm"
  >
    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Iure praesentium non id dolores vitae. Nam ratione veritatis ab cumque voluptas porro illum, voluptate perferendis ducimus dolorem optio magni assumenda dolore!

    <template #actions>
      <x-button @click="show4 = false">Cancel</x-button>
      <x-button color="success" @click="show4 = false">Confirm</x-button>
    </template>
  </x-modal>

  <x-button class="mr-2" @click="show = true">complete</x-button>
  <x-button class="mr-2" @click="show1 = true">persistent</x-button>
  <x-button class="mr-2" @click="show2 = true">title & footer</x-button>
  <x-button class="mr-2" @click="show3 = true">title & content</x-button>
  <x-button class="mr-2" @click="show4 = true">blurry</x-button>
</template>
```

#### Composed
```vue
<script setup lang="ts">
import { ref } from 'vue'
import { useNotifications } from '@indielayer/ui'

const show = ref(false)

const notifications = useNotifications()

const email = ref('')
const password = ref('')
const description = ref('')
const datetime = ref('')

const selected = ref()
const options = [
  { value: 'us', label: 'USA' },
  { value: 'u', label: 'United Kingdom' },
]

const rules = {
  isEmail: (v: string) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(v) || 'E-mail must be valid',
  isRequired: (v: string) => !!v  || 'Field is required',
}

function onSubmit(isValid: boolean) {
  if (isValid) notifications?.success('Valid! Sumitted.')
  else notifications?.error('Invalid! Form has errors')
}
</script>

<template>
  <x-modal
    v-model="show"
    show-close
    backdrop
    is-form
    size="full"
    title="Modal title"
    label="Modal label"
    description="Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sapiente, fugit."
    @submit="onSubmit"
  >
    <x-card class="p-4">
      <x-input
        v-model="email"
        :rules="[rules.isRequired, rules.isEmail]"
        name="email"
        label="Email"
        placeholder="Enter your email"
      />
      <x-input
        v-model="password"
        type="password"
        :rules="[rules.isRequired]"
        name="password"
        label="Password"
        placeholder="Enter your password"
        helper="Must be between 8 and 10 characters"
      />
      <x-textarea
        v-model="description"
        name="description"
        label="Description"
        placeholder="Description"
        hide-footer
      />
      <x-select
        v-model="selected"
        filterable
        :options="options"
        label="Country"
        :rules="[rules.isRequired]"
      />

      <x-datepicker v-model="datetime" label="Start date" :rules="[rules.isRequired]"/>
    </x-card>

    <!-- <template #tertiary-action>
      <x-button color="gray" size="lg">Tertiary</x-button>
    </template> -->
    <template #secondary-action>
      <x-button ghost tabindex="-1" @click="show = false">Cancel</x-button>
    </template>
    <template #primary-action>
      <x-button color="primary" type="submit">Confirm</x-button>
    </template>
  </x-modal>

  <x-button class="mr-2" @click="show = true">Modal as a XForm</x-button>
</template>
```

#### Confirm
```vue
<script setup lang="ts">
import { ref, watch } from 'vue'
import { useNotifications } from '@indielayer/ui'

const show = ref(false)
const confirmation = ref('')
const itemName = 'Image1.jpg'
const confirmWord = 'delete'

const notifications = useNotifications()

const rules = {
  matchesConfirm: (v: string) => v === confirmWord || `Please type '${confirmWord}' to confirm.`,
}

watch(show, (open) => {
  if (!open) confirmation.value = ''
})

function onSubmit(isValid: boolean) {
  if (!isValid) return

  notifications?.success(`Deleted '${itemName}'`)
  show.value = false
}
</script>

<template>
  <x-modal
    v-model="show"
    title="Confirm Deletion"
    icon="trash"
    show-close
    backdrop
    blurry
    is-form
    size="sm"
    @submit="onSubmit"
  >
    <div class="space-y-4">
      <p>Are you sure you want to delete '{{ itemName }}'?</p>

      <x-input
        v-model="confirmation"
        name="confirmation"
        placeholder="delete"
        helper="Please type 'delete' to confirm."
        :rules="[rules.matchesConfirm]"
      />
    </div>

    <template #secondary-action>
      <x-button ghost tabindex="-1" @click="show = false">Cancel</x-button>
    </template>
    <template #primary-action>
      <x-button color="error" type="submit">Delete</x-button>
    </template>
  </x-modal>

  <x-button color="error" outlined @click="show = true">Delete item</x-button>
</template>
```

#### Icon
```vue
<script setup lang="ts">
import { ref } from 'vue'

const show = ref(false)
const showSlot = ref(false)

// Same path used by XEmpty's default icon (archive box).
const archiveIcon = '<path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />'
</script>

<template>
  <x-modal
    v-model="show"
    title="No results"
    label="Search"
    :icon="archiveIcon"
    show-close
    backdrop
    size="sm"
  >
    Nothing matched these filters. Try widening your search or clearing filters.

    <template #secondary-action>
      <x-button ghost @click="show = false">Close</x-button>
    </template>
    <template #primary-action>
      <x-button color="primary" @click="show = false">Clear filters</x-button>
    </template>
  </x-modal>

  <x-modal
    v-model="showSlot"
    title="Confirm Deletion"
    show-close
    backdrop
    size="sm"
  >
    <template #icon>
      <x-icon
        icon="trash"
        size="sm"
        class="text-error-500"
      />
    </template>

    Use the icon slot when you need a custom color or markup inside the wrapper.

    <template #secondary-action>
      <x-button ghost @click="showSlot = false">Cancel</x-button>
    </template>
    <template #primary-action>
      <x-button color="error" @click="showSlot = false">Delete</x-button>
    </template>
  </x-modal>

  <x-button class="mr-2" @click="show = true">icon prop</x-button>
  <x-button class="mr-2" @click="showSlot = true">icon slot</x-button>
</template>
```

HTML docs: https://indielayer.com/component/modal
