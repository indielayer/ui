<script setup lang="ts">
import { useEventListener, useMouse } from '@vueuse/core'
import { computed, ref, watch, nextTick, onMounted } from 'vue'
import Fuse from 'fuse.js'
import SearchIndex from '../../search/index.json'
import type { XInput } from 'src'

type SearchItem = {
  name: string;
  description: string;
  url: string;
  category: 'guide' | 'component';
}

const fuse = new Fuse(SearchIndex as SearchItem[], {
  keys: [{
    name: 'name',
    weight: 2,
  }, {
    name: 'description',
    weight: 1,
  }],
  includeScore: true,
})

type FuseResult = {
  item: SearchItem;
  refIndex: number;
  score: number;
}

const isModalOpen = ref(false)
const searchInput = ref('')
const results = ref<FuseResult[]>([])
const searchList = ref<HTMLDivElement>()
const resultElements = ref<HTMLLIElement[]>([])
const selectedIndex = ref<number>(-1)

const inputEl = ref<InstanceType<typeof XInput> | null>(null)

const searchSections = computed(() => {
  const guides = results.value.filter((r) => r.item.category === 'guide')
  const components = results.value.filter((r) => r.item.category === 'component')

  return [
    { key: 'component', label: 'Components', items: components },
    { key: 'guide', label: 'Guides', items: guides },
  ].filter((s) => s.items.length > 0)
})

watch(isModalOpen, (newValue) => {
  setTimeout(() => {
    if (newValue) inputEl.value?.focus()
  }, 100)
})

function clearSearch() {
  selectedIndex.value = -1
  results.value = []
}

function openSearch() {
  clearSearch()
  searchInput.value = ''
  isModalOpen.value = true
}

function selectItem(item: HTMLLIElement, index?: number) {
  if (!item) return

  resultElements.value?.[selectedIndex.value]?.setAttribute('aria-selected', 'false')
  item.setAttribute('aria-selected', 'true')
  item.scrollIntoView({ block: 'nearest' })

  if (index === undefined) {
    index = resultElements.value.findIndex(({ id }) => id === item.id)
  }

  selectedIndex.value = index
}

function selectItemByIndex(index: number) {
  selectItem(resultElements.value?.[index], index)
}

function selectFirstItem() {
  selectItemByIndex(0)
}

function selectLastItem() {
  selectItemByIndex(resultElements.value.length - 1)
}

function selectNextItem() {
  const total = resultElements.value.length

  if (total <= 0) return

  const nextIndex = selectedIndex.value + 1

  if (nextIndex >= total) selectFirstItem()
  else selectItemByIndex(nextIndex)
}

function selectPreviousItem() {
  const total = resultElements.value.length

  if (total <= 0) return

  const previousIndex = selectedIndex.value - 1

  if (previousIndex >= 0) selectItemByIndex(previousIndex)
  else selectLastItem()
}

function keydownInput(e: KeyboardEvent) {
  if (e.key === 'ArrowDown') {
    e.preventDefault()
    selectNextItem()
  }

  if (e.key === 'ArrowUp') {
    e.preventDefault()
    selectPreviousItem()
  }

  if (e.key === 'Enter') {
    const item = resultElements.value?.[selectedIndex.value]

    if (item) {
      (item.firstElementChild as HTMLLinkElement)?.click()
    }
  }
}

const { x: mouseX, y: mouseY } = import.meta.env.SSR
  ? { x: ref(0), y: ref(0) }
  : useMouse({ type: 'page' })

function hoverResult(e: MouseEvent) {
  if (mouseX.value !== e.x || mouseY.value !== e.y) {
    selectItem(e.currentTarget as HTMLLIElement)
  }
}

function searchIndexes() {
  if (!searchInput.value.trim()) {
    results.value = []

    return
  }

  results.value = fuse.search(searchInput.value, { limit: 12 }) as FuseResult[]
}

watch(searchSections, async () => {
  resultElements.value = []
  await nextTick()

  const items = searchList.value?.querySelectorAll('[data-name="list-item"]')

  items?.forEach((el) => {
    el.setAttribute('aria-selected', 'false')
    resultElements.value.push(el as HTMLLIElement)
  })

  if (resultElements.value.length) setTimeout(() => selectFirstItem())
})

const metaKey = ref('')

onMounted(() => {
  metaKey.value = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform) ? '⌘' : 'Ctrl'

  useEventListener(document, 'keydown', (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      openSearch()
    }
  })
})
</script>

<template>
  <x-button
    icon="search"
    outlined
    size="xs"
    @click="openSearch"
  >
    Search
    <span class="text-secondary-400 ml-2 hidden md:inline">
      {{ metaKey }}K
    </span>
  </x-button>

  <x-modal v-model="isModalOpen" size="md" position="top">
    <template #header>
      <div class="py-4 px-6 border-b">
        <x-input
          ref="inputEl"
          v-model="searchInput"
          type="search"
          aria-controls="search-list"
          placeholder="Search docs and components"
          hide-footer
          icon-left="search"
          @input="searchIndexes"
          @keydown="keydownInput"
        />
      </div>
    </template>
    <div id="search-list" ref="searchList" class="max-h-96 overflow-y-auto px-2">
      <template v-for="section in searchSections" :key="section.key">
        <section v-if="section.items.length > 0" class="mb-2">
          <x-divider :label="section.label" class="my-2" />
          <ul role="listbox" :aria-labelledby="`${section.key}-label`">
            <li
              v-for="(result) in section.items"
              :id="result.item.url"
              :key="result.item.url"
              data-name="list-item"
              role="option"
              class="aria-selected:bg-secondary-100 dark:aria-selected:bg-secondary-800 rounded p-2 mb-1"
              @mouseenter="hoverResult"
            >
              <x-link
                :to="result.item.url"
                class="w-full flex flex-wrap"
                @click="isModalOpen = false"
              >
                <p class="text-base w-full mb-1 mt-0 font-bold">{{ result.item.name }}</p>
                <p class="text-sm m-0 text-gray-500 dark:text-gray-400 line-clamp-2">{{ result.item.description }}</p>
              </x-link>
            </li>
          </ul>
        </section>
      </template>
      <p v-if="searchInput && !results.length" class="text-center text-gray-500 py-8 text-sm">No results found.</p>
    </div>

    <template #actions>
      <footer class="w-full flex gap-2 items-center justify-center">
        <span class="bg-context-7 px-1 inline-flex items-center rounded-xs">&#8626;</span>
        <span class="text-xs">to select</span>
        <span class="bg-context-7 px-1 inline-flex items-center rounded-xs">&#11139;</span>
        <span class="text-xs">to navigate</span>
        <span class="bg-context-7 px-1 inline-flex items-center rounded-xs">&#9243;</span>
        <span class="text-xs">to close</span>
      </footer>
    </template>
  </x-modal>
</template>
