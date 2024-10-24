<script setup lang="ts">
import { ref } from 'vue'
import { useNotifications, type UploadFile } from '@indielayer/ui'

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

const action = 'https://run.mocky.io/v3/6904ae0b-3cfa-4ae1-bbf2-243a4dd32a3c'
</script>

<template>
  <div >
    <x-form @submit="onSubmit">
      <div class="grid md:grid-cols-2 gap-2">
        <x-upload
          v-model="imageFiles"

          :action="action"
          method="POST"
          :with-credentials="false"
          :rules="[rules.isValidUpload]"

          placeholder="Upload game title cover image"
          max-file-size="2000000"
          label="Cover Image"
          tooltip="Title cover image should be 16:9 aspect ratio and max 2MB"
          helper="Title cover image should be 16:9 aspect ratio and max 2MB"
          @upload="onUploadComplete"
          @change="onChangeImage"
        />
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
      <x-button type="submit">Submit</x-button>
    </x-form>
    <div v-if="previewImg">
      <h2>Preview Image</h2>
      <img :src="previewImg" alt="preview" class="max-w-lg max-h-96" />
    </div>
  </div>
</template>
