<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

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
  ghost: optionalBooleanProp(),
  grow: optionalBooleanProp(),
  exact: Boolean,
  fullWidth: {
    type: Boolean,
    default: true,
  },
}

export type TabGroupInjection = {
  tabsContentRef: Ref<HTMLElement | null>;
  activateTab: (tab: string | number | null) => void;
  registerTab: (tab: string | number) => void;
  unregisterTab: (tab: string | number) => void;
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
import { injectTabGroupKey } from '../../composables/keys'
import { useCommon, type Size } from '../../composables/useCommon'
import { useColors } from '../../composables/useColors'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useResolvedComponentProps } from '../../composables/resolveComponentDefaults'

import XScroll from '../../components/scroll/Scroll.vue'

const props = defineProps(tabGroupProps)
const resolvedProps = useResolvedComponentProps('TabGroup', props)

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
  ghost: computed(() => resolvedProps.value.ghost ?? false),
  grow: computed(() => resolvedProps.value.grow ?? false),
  exact: computed(() => props.exact),
  size: computed(() => props.size),
  color: computed(() => props.color),
})

const showTracker = ref(true)
const registeredTabs: (string | number)[] = []

function activateTab(tab: string | number | null) {
  active.value = tab
  emit('update:modelValue', tab)
}

function registerTab(tab: string | number) {
  if (!registeredTabs.includes(tab)) registeredTabs.push(tab)
}

function unregisterTab(tab: string | number) {
  const index = registeredTabs.indexOf(tab)

  if (index === -1) return

  registeredTabs.splice(index, 1)

  if (active.value !== tab) return

  const fallback = registeredTabs[Math.min(index, registeredTabs.length - 1)]

  if (typeof fallback !== 'undefined') {
    activateTab(fallback)
  } else {
    activateTab(null)
    showTracker.value = false
  }
}

provide(injectTabGroupKey, {
  tabsContentRef,
  activateTab,
  registerTab,
  unregisterTab,
  state,
})

const updateTracker = useThrottleFn(async (value: string | number | undefined) => {
  if (typeof value === 'undefined' || value === null) {
    showTracker.value = false

    return
  }

  await nextTick()

  const tabEl = tabsRef.value?.querySelector(`[data-value="${value}"]`) as HTMLElement

  if (!tabEl || !trackerRef.value) {
    showTracker.value = false

    return
  }

  showTracker.value = true
  trackerRef.value.style.left = `${tabEl.offsetLeft}px`
  trackerRef.value.style.width = `${tabEl.offsetWidth}px`

  if (!tabsRef.value || !scrollRef.value?.scrollEl) return

  const scrollEl = scrollRef.value.scrollEl
  // Measure overflow from the in-flow tabs list only (tracker is absolute and clipped).
  const maxScroll = Math.max(0, tabsRef.value.scrollWidth - scrollEl.clientWidth)
  const viewLeft = scrollEl.scrollLeft
  const viewRight = viewLeft + scrollEl.clientWidth
  const tabLeft = tabEl.offsetLeft
  const tabRight = tabLeft + tabEl.offsetWidth
  const tabFullyVisible = tabLeft >= viewLeft && tabRight <= viewRight

  if (maxScroll <= 0) {
    if (scrollEl.scrollLeft !== 0) scrollEl.scrollTo({ left: 0 })
    scrollEl.dispatchEvent(new CustomEvent('scroll'))

    return
  }

  if (tabFullyVisible) {
    scrollEl.dispatchEvent(new CustomEvent('scroll'))

    return
  }

  let nextLeft = viewLeft

  if (tabLeft < viewLeft) nextLeft = tabLeft
  else if (tabRight > viewRight) nextLeft = tabRight - scrollEl.clientWidth

  nextLeft = Math.max(0, Math.min(nextLeft, maxScroll))

  if (nextLeft !== viewLeft) scrollEl.scrollTo({ left: nextLeft, behavior: 'smooth' })
  else scrollEl.dispatchEvent(new CustomEvent('scroll'))
}, 100, true)

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
        <div class="relative overflow-x-clip">
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
            class="pointer-events-none"
            :class="classes.tracker"
          ></div>
        </div>
      </x-scroll>
    </div>
    <div ref="tabsContentRef"></div>
  </div>
</template>
