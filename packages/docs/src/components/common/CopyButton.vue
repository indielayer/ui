<script setup lang="ts">
import { useNotifications } from '@indielayer/ui'
import { onUnmounted, ref } from 'vue'

const props = defineProps({
  text: String,
})

const notifications = useNotifications('notifica')

const icon = ref('copy')
const animation = ref('')

let timeout: number | undefined

onUnmounted(() => {
  clearTimeout(timeout)
})

function copyText() {
  clearTimeout(timeout)
  animation.value = 'animate-ping'
  copy(props.text || '')
  notifications.success('Copied to clipboard!')
  timeout = setTimeout(() => {
    animation.value = ''
  }, 1000)
}

function copy(text: string) {
  const el = document.createElement('textarea')

  el.value = text
  document.body.appendChild(el)
  el.select()
  document.execCommand('copy')
  document.body.removeChild(el)
}
</script>

<template>
  <x-button
    :icon-left="icon"
    :class="animation"
    color="primary"
    size="sm"
    ghost
    @click="copyText"
  />
</template>
