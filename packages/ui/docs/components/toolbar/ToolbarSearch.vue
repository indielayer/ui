<script setup lang="ts">
import { useEventListener, useMouse } from '@vueuse/core'
import { computed, ref, watch, nextTick, onMounted } from 'vue'
import Fuse from 'fuse.js'
import ComponentsSearchIndex from '../../search/components.json'
import type { XInput } from 'src'

const fuse = new Fuse(ComponentsSearchIndex, {
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
  item: {
    name: string;
    description: string;
    url: string;
  };
  refIndex: number;
  score: number;
}

const isModalOpen = ref(false)
const searchInput = ref('')
const ui = ref<FuseResult[]>([])
const searchList = ref<HTMLDivElement>()
const results = ref<HTMLLIElement[]>([])
const selectedIndex = ref<number>(-1)

const inputEl = ref<InstanceType<typeof XInput> | null>(null)

watch(isModalOpen, (newValue, oldValue) => {
  setTimeout(() => {
    if (newValue) inputEl.value?.focus()
  }, 100)
})

const searchSections = computed(() => [
  { key:'ui', label: 'UI', items: ui.value },
])

function clearSearch() {
  selectedIndex.value = -1
  ui.value = []
}

function openSearch() {
  clearSearch()

  searchInput.value = ''
  isModalOpen.value = true
}

function selectItem(item: HTMLLIElement, index?: number) {
  if (!item) {
    return
  }

  results.value?.[selectedIndex.value]?.setAttribute('aria-selected', 'false')

  item.setAttribute('aria-selected', 'true')
  item.scrollIntoView({ 'block':'nearest' })

  if (!index) {
    index = results.value.findIndex(({ id }) => id === item.id)
  }

  selectedIndex.value = index
}

function selectItemByIndex(index: number) {
  selectItem(results.value?.[index], index)
}

function selectFirstItem() {
  selectItemByIndex(0)
}

function selectLastItem() {
  selectItemByIndex(results.value.length - 1)
}

function selectNextItem() {
  const totalResults = results.value.length

  if (totalResults <= 0) {
    return
  }

  const nextIndex = selectedIndex.value + 1

  if (nextIndex >= totalResults) {
    selectFirstItem()
  } else {
    selectItemByIndex(nextIndex)
  }
}

function selectPreviousItem() {
  const totalResults = results.value.length

  if (totalResults <= 0) {
    return
  }

  const previousIndex = selectedIndex.value - 1

  if (previousIndex >= 0) {
    selectItemByIndex(previousIndex)
  } else {
    selectLastItem()
  }
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
    const item = results.value?.[selectedIndex.value]

    if (item) {
      (item.firstElementChild as HTMLLinkElement)?.click()
    }
  }
}

const { x: mouseX, y: mouseY } = useMouse({ type: 'page' })

function hoverResult(e: MouseEvent) {
  if (mouseX.value !== e.x || mouseY.value !== e.y) {
    selectItem(e.target as HTMLLIElement)
  }
}

function searchIndexes() {
  ui.value = fuse.search(searchInput.value, {
    limit: 10,
  }) as FuseResult[]
}

watch(searchSections, async () => {
  results.value = []

  await nextTick()

  const items = searchList.value?.querySelectorAll('[data-name="list-item"]')

  items?.forEach((el) => {
    el.setAttribute('aria-selected', 'false')
    results.value.push(el as HTMLLIElement)
  })

  setTimeout(() => selectFirstItem())
})

const metaKey = ref('')

onMounted(() => {
  metaKey.value = /(Mac|iPhone|iPod|iPad)/i.test(navigator.platform)
    ? '⌘'
    : 'Ctrl'
})

if (document) {
  useEventListener(document, 'keydown', (e: KeyboardEvent) => {
    if (e.key === 'k' && (e.ctrlKey || e.metaKey)) {
      e.preventDefault()
      openSearch()
    }
  })
}
</script>

<template>
  <x-button
    icon="search"
    outlined
    size="xs"
    @click="openSearch"
  >
    Search
    <span class="text-secondary-400 ml-2">
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
          placeholder="Search components"
          hide-footer
          icon-left="search"
          @input="searchIndexes"
          @keydown="keydownInput"
        />
      </div>
    </template>
    <div id="search-list" ref="searchList">
      <template v-for="section in searchSections" :key="section.key">
        <section v-if="section.items.length > 0">
          <!-- <x-divider :id="`${section.key}-label`" class="my-2" :label="section.label" /> -->
          <ul role="listbox" :aria-labelledby="`${section.key}-label`">
            <li
              v-for="(result) in section.items"
              :id="result.item.url"
              :key="result.item.url"
              data-name="list-item"
              role="option"
              class="aria-selected:bg-secondary-100 dark:aria-selected:bg-secondary-800 rounded p-2 mb-2"
              @mouseenter="hoverResult"
            >
              <x-link
                :to="result.item.url"
                class="w-full flex flex-wrap"
                @click="isModalOpen = false"
              >
                <p class="text-base w-full mb-1 mt-0 font-bold">{{ result.item.name }}</p>
                <p class="text-sm m-0">{{ result.item.description }}</p>
              </x-link>
            </li>
          </ul>
        </section>
      </template>
    </div>

    <template #actions>
      <footer class="w-full flex gap-2 items-center justify-center">
        <span class="bg-context-7 px-1 inline-flex items-center rounded-sm">&#8626;</span>
        <span class="text-xs">to select</span>
        <span class="bg-context-7 px-1 inline-flex items-center rounded-sm">&#11139;</span>
        <span class="text-xs">to navigate</span>
        <span class="bg-context-7 px-1 inline-flex items-center rounded-sm">&#9243;</span>
        <span class="text-xs">to close</span>
      </footer>
    </template>
  </x-modal>
</template>
