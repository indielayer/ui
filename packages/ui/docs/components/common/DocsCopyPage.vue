<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import { useNotifications, type MenuArrayItem } from '@indielayer/ui'

const route = useRoute()
const notifications = useNotifications()
const mounted = ref(false)
const menuOpen = ref(false)
const copying = ref(false)

onMounted(() => {
  mounted.value = true
})

const SITE_URL = 'https://indielayer.com'

const componentSlug = computed(() => {
  const path = route.path.replace(/\/$/, '')

  if (!path.startsWith('/component/')) return null

  return path.replace('/component/', '')
})

const markdownUrl = computed(() => {
  if (!componentSlug.value) return null

  const origin = typeof window !== 'undefined' ? window.location.origin : SITE_URL

  return `${origin}/md/component/${componentSlug.value}.md`
})

const canonicalMarkdownUrl = computed(() => {
  if (!componentSlug.value) return null

  return `${SITE_URL}/md/component/${componentSlug.value}.md`
})

function aiPrompt(url: string) {
  return `Read ${url} so I can ask questions about it.`
}

const chatGptUrl = computed(() => {
  if (!canonicalMarkdownUrl.value) return '#'

  return `https://chatgpt.com/?hints=search&q=${encodeURIComponent(aiPrompt(canonicalMarkdownUrl.value))}`
})

const claudeUrl = computed(() => {
  if (!canonicalMarkdownUrl.value) return '#'

  return `https://claude.ai/new?q=${encodeURIComponent(aiPrompt(canonicalMarkdownUrl.value))}`
})

async function copyText(text: string, message: string) {
  try {
    await navigator.clipboard.writeText(text)
  } catch {
    const el = document.createElement('textarea')

    el.value = text
    document.body.appendChild(el)
    el.select()
    document.execCommand('copy')
    document.body.removeChild(el)
  }

  notifications?.success(message)
}

async function fetchMarkdown() {
  if (!markdownUrl.value) throw new Error('No markdown URL')

  const res = await fetch(markdownUrl.value)

  if (!res.ok) throw new Error(`Failed to fetch markdown (${res.status})`)

  return res.text()
}

async function copyPage() {
  if (!markdownUrl.value || copying.value) return

  copying.value = true
  menuOpen.value = false

  try {
    const markdown = await fetchMarkdown()

    await copyText(markdown, 'Copied page as Markdown')
  } catch {
    notifications?.error('Could not copy page markdown')
  } finally {
    copying.value = false
  }
}

async function copyMarkdownLink() {
  if (!canonicalMarkdownUrl.value) return

  await copyText(canonicalMarkdownUrl.value, 'Copied Markdown link')
}

async function copyLlmsTxt() {
  await copyText(`${SITE_URL}/llms.txt`, 'Copied llms.txt URL')
}

function closeMenu() {
  menuOpen.value = false
}

const menuItems = computed<MenuArrayItem[]>(() => {
  if (!markdownUrl.value || !canonicalMarkdownUrl.value) return []

  return [
    {
      label: 'Copy Markdown link',
      icon: 'link',
      onClick: () => { void copyMarkdownLink() },
    },
    {
      label: 'View as Markdown',
      icon: 'code',
      iconRight: 'external-link',
      href: markdownUrl.value,
      target: '_blank',
      attrs: { rel: 'noopener noreferrer' },
    },
    {
      label: 'Open in ChatGPT',
      icon: 'sparkles',
      iconRight: 'external-link',
      href: chatGptUrl.value,
      target: '_blank',
      attrs: { rel: 'noopener noreferrer' },
    },
    {
      label: 'Open in Claude',
      icon: 'sparkles',
      iconRight: 'external-link',
      href: claudeUrl.value,
      target: '_blank',
      attrs: { rel: 'noopener noreferrer' },
    },
    { divider: true },
    {
      label: 'Copy llms.txt URL',
      icon: 'link',
      onClick: () => { void copyLlmsTxt() },
    },
    {
      label: 'View llms.txt',
      icon: 'book',
      iconRight: 'external-link',
      href: `${SITE_URL}/llms.txt`,
      target: '_blank',
      attrs: { rel: 'noopener noreferrer' },
    },
  ]
})
</script>

<template>
  <div v-if="mounted && markdownUrl" class="docs-copy-page inline-flex shrink-0">
    <x-button-group size="xs" outlined>
      <x-button
        icon-left="copy"
        :loading="copying"
        @click="copyPage"
      >
        Copy page
      </x-button>
      <x-popover
        v-model:shown="menuOpen"
        placement="bottom-end"
        :distance="6"
      >
        <x-button
          icon="chevron-down"
          aria-label="More copy options"
        />
        <template #content>
          <x-popover-container class="w-64 p-1.5">
            <x-menu
              size="sm"
              :items="menuItems"
              @item-click="closeMenu"
            />
          </x-popover-container>
        </template>
      </x-popover>
    </x-button-group>
  </div>
  <div
    v-else-if="!mounted && markdownUrl"
    class="inline-flex h-8 w-[7.5rem] shrink-0 rounded-md border border-transparent"
    aria-hidden="true"
  ></div>
</template>
