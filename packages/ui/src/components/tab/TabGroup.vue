<script lang="ts">
const validators = {
  ...useCommon.validators(),
  variant: ['line', 'block'] as const,
  align: ['left', 'center', 'right'] as const,
}
const tabGroupProps = {
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
  fullWidth: {
    type: Boolean,
    default: true,
  },
}

export type TabGroupInjection = {
  tabsContentRef: Ref<HTMLElement | null>;
  activateTab: (tab: string | number) => void;
  state: {
    active: string | number | undefined;
    variant: TabGroupVariant;
    ghost: boolean;
    grow: boolean;
    exact: boolean;
    size: Size;
    color: string;
  };
}
export type TabGroupVariant = typeof validators.variant[number]
export type TabGroupAlign = typeof validators.align[number]
export type TabGroupProps = ExtractPublicPropTypes<typeof tabGroupProps>

type InternalClasses = 'wrapper' | 'list' | 'tracker' | 'scroller'
export interface TabGroupTheme extends ThemeComponent<TabGroupProps, InternalClasses> {}

export default {
  name: 'XTabGroup',
  validators,
}
</script>

<script setup lang="ts">
import { reactive, computed, provide, type PropType, ref, watch, onMounted, watchEffect, type ExtractPublicPropTypes, type Ref, nextTick } from 'vue'
import { useMutationObserver, useResizeObserver, useThrottleFn } from '@vueuse/core'
import { injectTabKey } from '../../composables/keys'
import { useCommon, type Size } from '../../composables/useCommon'
import { useColors } from '../../composables/useColors'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

import XScroll from '../../components/scroll/Scroll.vue'

const props = defineProps(tabGroupProps)

const emit = defineEmits(['update:modelValue'])

const scrollRef = ref<InstanceType<typeof XScroll> | null>(null)
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

function activateTab(tab: string | number | null) {
  active.value = tab
  emit('update:modelValue', tab)
}

provide(injectTabKey, {
  tabsContentRef,
  activateTab,
  state,
})

const updateTracker = useThrottleFn(async (value: string | number | undefined) => {
  if (typeof value === 'undefined') return

  await nextTick()

  const tabEl = tabsRef.value?.querySelector(`[data-value="${value}"]`) as HTMLElement

  if (!tabEl || !trackerRef.value) return

  trackerRef.value.style.left = `${tabEl.offsetLeft}px`
  trackerRef.value.style.width = `${tabEl.offsetWidth}px`

  if (!tabsRef.value || !scrollRef.value) return

  // scrollIntoView only updates one at a time
  const center = tabEl.offsetLeft - (tabsRef.value.getBoundingClientRect().width - tabEl.getBoundingClientRect().width) / 2

  if (scrollRef.value.scrollEl) scrollRef.value.scrollEl.scrollTo({ left: center, behavior: 'smooth' })
}, 100, true)

const showTracker = ref(true)

function check() {
  if (!tabsRef.value?.querySelector('.router-link-active')) {
    activateTab(null)
    showTracker.value = false
  } else {
    showTracker.value = true
  }
}

watch(() => active.value, (value) => {
  updateTracker(value)
})

onMounted(() => {
  if (tabsRef.value?.querySelector('.x-link')) {
    useMutationObserver(tabsRef.value, check, {
      attributes: true, subtree: true,
      attributeFilter: ['class'],
    })
  }
  updateTracker(active.value)
})

useResizeObserver(tabsRef, () => { updateTracker(active.value) })

const { styles, classes, className } = useTheme('TabGroup', {}, props)
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
        :class="classes.scroller"
      >
        <div
          ref="tabsRef"
          class="relative"
          :class="classes.list"
        >
          <slot></slot>
        </div>
        <div
          v-show="showTracker"
          ref="trackerRef"
          :class="classes.tracker"
        ></div>
      </x-scroll>
    </div>
    <div ref="tabsContentRef"></div>
  </div>
</template>
