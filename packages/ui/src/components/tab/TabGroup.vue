<script lang="ts">
export default { name: 'XTabGroup' }
</script>

<script setup lang="ts">
import { reactive, computed, provide, type PropType, ref, watch, onMounted, watchEffect } from 'vue'
import { useResizeObserver, useThrottleFn } from '@vueuse/core'
import { injectTabKey } from '../../composables/keys'
import { useCommon } from '../../composables/common'
import { useColors } from '../../composables/colors'
import { useTheme } from '../../composables/theme'

import XScroll from '../../components/scroll/Scroll.vue'

import theme from './TabGroup.theme'

const props = defineProps({
  ...useCommon.props(),
  ...useColors.props('primary'),
  modelValue: [String, Number],
  variant: {
    type: String as PropType<'line' | 'block'>,
    default: 'line',
  },
  align: {
    type: String as PropType<'left' | 'center' | 'right'>,
    default: 'left',
  },
  ghost: Boolean,
  grow: Boolean,
  exact: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const scrollRef = ref<typeof XScroll | null>(null)
const wrapperRef = ref<HTMLElement | null>(null)
const trackerRef = ref<HTMLElement | null>(null)
const tabsRef = ref<HTMLElement | null>(null)
const tabsContentRef = ref<HTMLElement | null>(null)

const active = ref()

watchEffect(() => {
  active.value = props.modelValue
})

const state = reactive({
  active: computed(() => active.value),
  variant: computed(() => props.variant),
  ghost: computed(() => props.ghost),
  grow: computed(() => props.grow),
  exact: computed(() => props.exact),
  size: computed(() => props.size),
  color: computed(() => props.color),
})

function activateTab(tab: string | number) {
  active.value = tab
  emit('update:modelValue', tab)
}

provide(injectTabKey, {
  tabsContentRef,
  activateTab,
  state,
})

const updateTracker = useThrottleFn((value: string | number | undefined) => {
  if (typeof value === 'undefined') return

  const tabEl = tabsRef.value?.querySelector(`[data-value="${value}"]`) as HTMLElement

  if (!tabEl || !trackerRef.value) return

  trackerRef.value.style.left = `${tabEl.offsetLeft}px`
  trackerRef.value.style.width = `${tabEl.offsetWidth}px`

  if (!tabsRef.value || !scrollRef.value) return

  // scrollIntoView only updates one at a time
  const center = tabEl.offsetLeft - (tabsRef.value.getBoundingClientRect().width - tabEl.getBoundingClientRect().width) / 2

  if (scrollRef.value.scrollEl) scrollRef.value.scrollEl.scrollTo({ left: center, behavior: 'smooth' })
}, 100)

useResizeObserver(wrapperRef, () => { updateTracker(active.value) })

watch(() => active.value, (value) => {
  updateTracker(value)
})

onMounted(() => {
  updateTracker(active.value)
})

const { styles, classes, className } = useTheme('tabs', theme, props)
</script>

<template>
  <div>
    <div
      ref="wrapperRef"
      class="relative"
      :style="styles"
      :class="[
        className,
        classes.wrapper,
      ]"
    >
      <x-scroll
        ref="scrollRef"
        :scrollbar="false"
        horizontal
        mousewheel
        :class="{
          'rounded-md': variant === 'block',
          'bg-slate-100 dark:bg-gray-800 p-1': variant === 'block' && !ghost
        }"
      >
        <ul
          ref="tabsRef"
          class="relative"
          :class="classes.list"
        >
          <slot></slot>
        </ul>
        <div
          ref="trackerRef"
          :class="classes.tracker"
        ></div>
      </x-scroll>
    </div>
    <div ref="tabsContentRef"></div>
  </div>
</template>
