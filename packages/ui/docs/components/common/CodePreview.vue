<script setup lang="ts">
import { useNotifications } from '@indielayer/ui'
import { ref } from 'vue'

const props = defineProps({
  title: String,
  description: String,
  code: String,
  github: String,
  lang: {
    type: String,
    default: 'vue',
  },
  expanded: Boolean,
})

const notifications = useNotifications('notifica')

const codeRef = ref()
const expandedSync = ref(props.expanded)

function toggleCode() {
  codeRef.value.toggle()
  expandedSync.value = !expandedSync.value
}

function copy(text?: string) {
  if (!text) return

  const el = document.createElement('textarea')

  el.value = text
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
  notifications?.success('Copied to clipboard!')
}
</script>

<template>
  <div>
    <h2 :id="title?.toLowerCase()" class="flex border-b pb-2 items-center">
      <a class="anchor" :href="`#${title?.toLowerCase()}`">#</a>
      <div class="mr-2 cursor-pointer" @click="toggleCode">{{ title }}</div>
      <x-spacer/>
      <x-tooltip position="top">
        <x-button
          icon="edit"
          ghost
          size="sm"
          :href="`${github}/${title?.toLowerCase()}.vue`"
          target="blank"
        />
        <template #tooltip>
          Edit on <span class="text-gray-300">GitHub</span>
        </template>
      </x-tooltip>

      <x-tooltip position="top">
        <x-button icon="copy" ghost size="sm" @click="copy(code)"/>
        <template #tooltip>Copy</template>
      </x-tooltip>

      <x-tooltip position="top">
        <x-button icon="code" ghost size="sm" @click="toggleCode"/>
        <template #tooltip>{{ expandedSync ? 'Hide' : 'Show' }} code</template>
      </x-tooltip>
    </h2>
    <p>{{ description }}</p>
    <slot></slot>
    <x-accordion-item ref="codeRef" :expanded="expanded" :show-icon="false">
      <template #content>
        <div class="mt-4">
          <code-snippet :code="code" :lang="lang" :show-copy-button="false"/>
        </div>
      </template>
    </x-accordion-item>
  </div>
</template>
