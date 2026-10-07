# Upload
File picker with drag-and-drop for selecting one or more files to upload. Use Upload when forms need images, documents, or other file input with accept filters.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| accept | String |  | Accepted file types (native `accept` attribute). |
| action | String |  | URL to upload files to; enables remote upload mode when set. |
| disabled | Boolean |  | Disables interaction and applies disabled styling. |
| error | String |  | External error message; overrides rule errors when set. |
| fileFormDataName | String | file | FormData field name for each uploaded file. |
| headers | Object as PropType<Record<string |  | Additional HTTP headers sent with the upload request. |
| helper | String |  | Helper text shown below the field. |
| hideFooter | Boolean |  | Hides the footer area (helper / error). |
| id | String |  | Native id attribute for the input element. |
| label | String |  | Visible label text for the field. |
| loading | Boolean |  | Shows a loading indicator and blocks interaction. |
| loadingLabel | String |  | Accessible label announced while loading. |
| loadingStatus | String LoaderStatus | active | Loader visual status (for example active or indeterminate). |
| maxFileSize | [Number, String] |  | Maximum file size in bytes. |
| maxFiles | [Number, String] |  | Maximum number of files allowed. |
| method | String 'POST'  \|  'PUT' | POST | HTTP method used when uploading to `action`. |
| modelValue | [String, Number, Boolean, Object, Array] |  | Bound value (v-model). |
| multiple | Boolean |  | Allows selecting more than one file. |
| name | String |  | Native name attribute for form submission. |
| placeholder | String |  | Text shown in the default drop zone. |
| readonly | Boolean |  | Makes the field read-only without disabling it. |
| required | Boolean |  | Marks the field as required for validation. |
| rules | Array | [] | Validation rule functions or rule descriptors. |
| skipFormRegistry | Boolean |  | Skips registering this field with a parent x-form. |
| tooltip | String |  | Optional tooltip text next to the label. |
| validateOnInput | Boolean | true | Runs validation on each input event when true. |
| variant | String UploadVariant | box | Visual variant of the upload control. |
| withCredentials | Boolean |  | Sends cookies/credentials with the upload request. |

### Slots
- `box`: Custom drop zone UI (`is-over` when dragging files).
- `default`
- `files`: Custom file list (`files` upload state array).
- `removeIcon`: Icon for the remove-file control.

### Events
- `blur`: Emitted when the field loses focus.
- `change`: Emitted when the value is committed (change).
- `focus`: Emitted when the field receives focus.
- `input`: Emitted on native input events.
- `remove`: Emitted when a file is removed from the list.
- `update:modelValue`: Emitted when the bound value changes (v-model).
- `upload`: Emitted when a file finishes uploading (remote mode).

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
import { useNotifications, XUpload, type UploadFile } from '@indielayer/ui'

const notifications = useNotifications()

const imageFiles = ref<UploadFile[]>([])
const jsonFile = ref<UploadFile[]>([])

const rules = {
  isRequired: (v: string) => {
    if (Array.isArray(v)) return !!v.length || 'Field is required'

    return !!v  || 'Field is required'
  },
  isValidUpload: (v: UploadFile[]) => {
    if (!v || !v.length) return 'Field is required'
    if (v.some((file) => file.error)) return 'File upload has errors.'

    return v.every((file) => file.completed) || 'File upload is not completed.'
  },
}

const previewImg = ref<string>()

function onChangeImage(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files as FileList

  if (!files || files.length === 0) return

  const file = files[0]

  // set preview image
  const reader = new FileReader()

  reader.onload = (e) => {
    previewImg.value = reader.result as string
  }

  reader.readAsDataURL(file)
}

function onUploadComplete(response: any) {
  console.log('onUploadComplete', response)
}

const jsonFileOutput = ref<string>()

function onChangeJSON(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files as FileList

  if (!files || files.length === 0) return

  const fileReader = new FileReader()

  fileReader.onloadend = (e) => {
    try {
      jsonFileOutput.value = fileReader.result?.toString() || ''
    } catch (error) {
      notifications?.error('Invalid file!')
    }
  }

  fileReader.readAsText(files[0])
}

function onSubmit(isValid: boolean) {
  if (!isValid) return

  notifications?.success('Valid! Submitted.')
}

const uploadRef = ref<InstanceType<typeof XUpload>>()

function reset() {
  uploadRef.value?.reset()
  previewImg.value = undefined
}

const action = 'https://run.mocky.io/v3/6904ae0b-3cfa-4ae1-bbf2-243a4dd32a3c'
</script>

<template>
  <div >
    <x-form @submit="onSubmit">
      <div class="grid md:grid-cols-2 gap-2 mb-4">
        <div>
          <x-upload
            ref="uploadRef"
            v-model="imageFiles"
            :action="action"
            method="POST"
            :with-credentials="false"
            :rules="[rules.isValidUpload]"
            placeholder="Upload game title cover image"
            accept="image/*"
            max-file-size="2000000"
            label="Cover Image"
            tooltip="Title cover image should be 16:9 aspect ratio and max 2MB"
            helper="Title cover image should be 16:9 aspect ratio and max 2MB"
            @upload="onUploadComplete"
            @change="onChangeImage"
          />
          <x-button size="sm" outlined ghost @click="reset">Reset input</x-button>
        </div>
        <x-upload
          v-model="jsonFile"
          placeholder="Upload your json file"
          label="JSON File"
          accept=".json"
          :rules="[rules.isRequired]"
          helper="JSON file"
          @change="onChangeJSON"
        />
      </div>
      <x-divider class="my-4"/>
      <x-button type="submit">Submit</x-button>
    </x-form>
    <div v-if="previewImg">
      <h2>Preview Image</h2>
      <img :src="previewImg" alt="preview" class="max-w-lg max-h-96" />
    </div>
  </div>
</template>
```

HTML docs: https://indielayer.com/component/upload
