<script lang="ts">
const validators = {
  ...useCommon.validators(),
  variant: ['box'] as const,
}
const uploadProps = {
  ...useInteractive.props(),
  ...useInputtable.props(),
  placeholder: String,
  accept: String,
  multiple: Boolean,
  maxFiles: [Number, String],
  maxFileSize: [Number, String],
  variant: {
    type: String as PropType<UploadVariant>,
    default: 'box',
  },

  // URL to submit data to.
  action: String,
  // Additional HTTP headers
  headers: Object as PropType<Record<string, string>>,
  method: {
    type: String as PropType<'POST' | 'PUT'>,
    default: 'POST',
  },
  withCredentials: Boolean,
  fileFormDataName: {
    type: String,
    default: 'file',
  },
}

export type UploadFile = {
  file: File;
  completed: boolean;
  response?: any;
  progress: number;
  error: string;
}

export type UploadVariant = typeof validators.variant[number]
export type UploadProps = ExtractPublicPropTypes<typeof uploadProps>

type InternalClasses = 'wrapper' | 'input'
export interface UploadTheme extends ThemeComponent<UploadProps, InternalClasses> {}

export default {
  name: 'XUpload',
  validators,
}
</script>

<script setup lang="ts">
import { computed, onBeforeUnmount, ref, watch, type ExtractPublicPropTypes, type PropType } from 'vue'
import { useDropZone } from '@vueuse/core'
import { useCommon } from '../../composables/useCommon'
import { useInteractive } from '../../composables/useInteractive'
import { useInputtable } from '../../composables/useInputtable'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { uploadIcon, closeIcon, fileIcon } from '../../common/icons'

import XLabel from '../label/Label.vue'
import XInputFooter from '../inputFooter/InputFooter.vue'
import XProgress from '../progress/Progress.vue'
import XIcon from '../icon/Icon.vue'

const props = defineProps(uploadProps)

const emit = defineEmits([...useInputtable.emits(), 'upload', 'remove'])

const elRef = ref<HTMLInputElement | null>(null)

const isUploadMode = computed(() => !!props.action)

// works as internal model, but exposed for form validations
const modelValue = ref<UploadFile[]>([])

watch(modelValue, (val) => {
  emit('update:modelValue', val)
}, { deep: true, immediate: true })

const { focus, blur } = useInteractive(elRef)

function isInputValid(files: File[] | FileList | null) {
  if (!files) return false

  if ((!props.multiple && files.length > 1) || (props.maxFiles && files.length > Number(props.maxFiles))) {
    errorInternal.value = 'Too many files'

    return false
  }

  if (props.maxFileSize) {
    for (let i = 0; i < files.length; i++) {
      if (files[i].size > Number(props.maxFileSize)) {
        errorInternal.value = 'File size is too large'

        return false
      }
    }
  }

  if (props.accept) {
    const accept = props.accept.split(',').map((type) => type.trim())

    for (let i = 0; i < files.length; i++) {
      const file = files[i]

      if (!accept.some((type) => file.type === type || file.name.endsWith(type))) {
        errorInternal.value = 'Invalid file type'

        return false
      }
    }
  }

  return true
}

function onChange(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files

  const isValid = isInputValid(files)

  if (!isValid) return

  emit('change', event)
}

function onInput(event: Event) {
  const target = event.target as HTMLInputElement
  const files = target.files

  const isValid = isInputValid(files)

  if (!isValid) return

  handleFiles(files)

  if (props.validateOnInput && !isFirstValidation.value) validate(modelValue.value)

  emit('input', event)
}

const dropZoneRef = ref<HTMLElement | null>(null)

function onDrop(files: File[] | null) {
  const isValid = isInputValid(files)

  if (!isValid) return

  handleFiles(files)
}

const { isOverDropZone } = useDropZone(dropZoneRef, {
  onDrop,
  multiple: props.multiple,
  preventDefaultForUnhandled: false,
})

function handleFiles(files: File[] | FileList | null) {
  modelValue.value = files ? Array.from(files).map((file) => ({
    file,
    completed: isUploadMode.value ? false : true,
    progress: isUploadMode.value ? 0 : 100,
    error: '',
  })) : []

  if (isUploadMode.value) upload()
}

function removeFile(file: File) {
  const index = modelValue.value.findIndex((f) => f.file === file)

  if (index === -1) return

  emit('remove', modelValue.value[index])

  modelValue.value.splice(index, 1)
}

function isImage(file: File) {
  const imageExtensions = ['jpg', 'jpeg', 'png', 'gif', 'webp', 'svg']

  return file.type.startsWith('image') || imageExtensions.some((ext) => file.name.endsWith(ext))
}

const blobUrls: string[] = []

function getImagePreview(file: File) {
  const url = URL.createObjectURL(file)

  blobUrls.push(url)

  return url
}

onBeforeUnmount(() => {
  blobUrls.forEach((url) => URL.revokeObjectURL(url))
})

function calculateFileSize(size: number) {
  if (size < 1024) return `${size} B`
  if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`
  if (size < 1024 * 1024 * 1024) return `${(size / 1024 / 1024).toFixed(2)} MB`

  return `${(size / 1024 / 1024 / 1024).toFixed(2)} GB`
}

async function uploadFileRequest(uploadFile: UploadFile) {
  return new Promise((resolve, reject) => {
    if (!props.action) reject(new Error('No action provided'))
    else {
      const xhr = new XMLHttpRequest()
      const formData = new FormData()

      formData.append(props.fileFormDataName, uploadFile.file)

      xhr.open(props.method, props.action, true)

      // Set headers
      if (props.headers && typeof props.headers === 'object') {
        Object.keys(props.headers).forEach((key) => {
          xhr.setRequestHeader(key, props.headers![key])
        })
      }

      // Progress event for tracking upload
      xhr.upload.addEventListener('progress', (event) => {
        if (event.lengthComputable) {
          const percentComplete = (event.loaded / event.total) * 100

          uploadFile.progress = percentComplete
        }
      })

      // Event listener when upload is complete
      xhr.addEventListener('load', () => {
        if (xhr.status >= 200 && xhr.status < 300) {
          uploadFile.completed = true
          try {
            uploadFile.response = JSON.parse(xhr.responseText)
          } catch (error) {
            uploadFile.response = xhr.responseText
          }

          resolve(xhr.responseText)
        } else {
          const errorMsg = `Upload failed. Status: ${xhr.status}`

          uploadFile.error = errorMsg
          reject(new Error(errorMsg))
        }
      })

      xhr.addEventListener('error', () => {
        uploadFile.error = 'An error occurred during the upload.'
        reject(new Error('An error occurred during the upload.'))
      })

      xhr.send(formData)
    }
  })
}

async function upload() {
  if (!props.action && !modelValue.value) return

  const promises = []

  for (let i = 0; i < modelValue.value.length; i++) {
    promises.push(uploadFileRequest(modelValue.value[i]))
  }

  await Promise.all(promises)

  validate(modelValue.value)
}

function reset() {
  errorInternal.value = ''
  isFirstValidation.value = true
  modelValue.value = []

  if (elRef.value) elRef.value.value = ''
}

const {
  errorInternal,
  hideFooterInternal,
  isInsideForm,
  inputListeners,
  isFirstValidation,
  validate,
  setError,
} = useInputtable(props, { focus, emit })

const { styles, classes, className } = useTheme('Upload', {}, props)

defineExpose({ focus, blur, reset, validate, setError })
</script>

<template>
  <div
    :class="[
      className,
      classes.wrapper,
    ]"
  >
    <x-label
      :style="styles"
      :disabled="disabled"
      :required="required"
      :is-inside-form="isInsideForm"
      :label="label"
      :tooltip="tooltip"
    >
      <input
        :id="id"
        ref="elRef"
        type="file"
        :class="[
          'sr-only',
          classes.input,
        ]"
        :disabled="disabled"
        :name="name"
        :accept="accept"
        :multiple="multiple"
        :readonly="readonly"
        v-on="{
          ...inputListeners,
          input: onInput,
          change: onChange,
        }"
      />
      <slot name="box" :is-over="isOverDropZone">
        <div
          ref="dropZoneRef"
          class="border border-dashed rounded-md flex items-center justify-center gap-2 p-4 cursor-pointer transition-colors duration-500 hover:border-primary-500 dark:hover:border-primary-400"
          :class="{
            'border-primary-500 dark:border-primary-400': isOverDropZone,
          }"
        >
          <x-icon :icon="uploadIcon" />
          <span class="text-secondary-500 dark:text-secondary-400">{{ placeholder }}</span>
          <span class="text-xs text-secondary-400 dark:text-secondary-500">or drag and drop</span>
        </div>
      </slot>

      <x-input-footer v-if="!hideFooterInternal" :error="errorInternal" :helper="helper"/>
    </x-label>
    <slot name="files" :files="modelValue">
      <div v-for="(uploadFile, i) in modelValue" :key="i" class="border rounded-md p-2 bg-secondary-100 my-2">
        <div class="flex items-center">
          <div
            class="rounded-md w-9 h-9 flex items-center justify-center mr-2 border"
            :class="{
              'p-2 bg-white': !isImage(uploadFile.file),
            }"
          >
            <img
              v-if="isImage(uploadFile.file)"
              :src="getImagePreview(uploadFile.file)"
              class="w-full h-full object-cover rounded-md"
            />
            <x-icon v-else :icon="fileIcon"/>
          </div>
          <div class="truncate flex-1 pr-2">
            <div class="font-medium truncate">{{ uploadFile.file.name }}</div>
            <div class="text-xs text-secondary-500">{{ calculateFileSize(uploadFile.file.size) }}</div>
          </div>
          <button type="button" class="shrink-0" @click="removeFile(uploadFile.file)">
            <slot name="removeIcon"><x-icon :icon="closeIcon"/></slot>
          </button>
        </div>
        <x-progress v-if="isUploadMode" :percentage="uploadFile.progress" class="mt-1" :color="uploadFile.error ? 'warning' : 'success'"/>
        <x-input-footer v-if="uploadFile.error" :error="uploadFile.error"/>
      </div>
    </slot>
  </div>
</template>
