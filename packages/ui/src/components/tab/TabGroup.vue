<script lang="ts">
import { defineComponent, reactive, computed, provide, type PropType, ref, watch, onMounted } from 'vue'
import { injectTabKey } from '../../composables/keys'
import { useCSS } from '../../composables/css'
import { useColors } from '../../composables/colors'

import { useResizeObserver, useThrottleFn } from '@vueuse/core'

import XScroll from '../../components/scroll/Scroll.vue'

export default defineComponent({
  name: 'XTabGroup',

  components: {
    XScroll,
  },

  props: {
    ...useColors.props('primary'),
    modelValue: [String, Number],
    variant: {
      type: String as PropType<'line' | 'block'>,
      default: 'line',
    },
    ghost: Boolean,
    grow: Boolean,
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const scrollRef = ref()
    const wrapperRef = ref<HTMLElement>()
    const trackerRef = ref<HTMLElement>()
    const tabsRef = ref<HTMLElement>()
    const tabsContentRef = ref<HTMLElement>()

    const state = reactive({
      active: computed(() => props.modelValue),
      variant: computed(() => props.variant),
      ghost: computed(() => props.ghost),
      grow: computed(() => props.grow),
    })

    function activateTab(tab: string | number) {
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

    useResizeObserver(wrapperRef, () => { updateTracker(props.modelValue) })

    watch(() => props.modelValue, (value) => {
      updateTracker(value)
    })

    onMounted(() => {
      updateTracker(props.modelValue)
    })

    const css = useCSS('tabs')
    const colors = useColors()
    const gray = colors.getPalette('gray')
    const style = computed(() => {
      const color = colors.getPalette(props.color)

      return css.variables({
        text: color[600],
        bg: props.ghost ? color[50] : '#fff',
        dark: {
          text: color[400],
          bg: props.ghost ? color[900] : gray[700],
        },
      })
    })

    return {
      scrollRef,
      wrapperRef,
      trackerRef,
      tabsRef,
      tabsContentRef,
      style,
    }
  },
})
</script>

<template>
  <div>
    <div
      ref="wrapperRef"
      class="relative"
      :style="style"
    >
      <x-scroll
        ref="scrollRef"
        :scrollbar="false"
        horizontal
        mousewheel
        :class="{
          'rounded-md': variant === 'block',
          'bg-gray-50 dark:bg-gray-800 p-1': variant === 'block' && !ghost
        }"
      >
        <ul
          ref="tabsRef"
          class="flex relative min-w-full w-fit"
          :class="{
            'border-b border-gray-200 dark:border-gray-700': variant === 'line',
            'space-x-8': variant === 'line' && !grow,
            'z-[1]': variant === 'block'
          }"
        >
          <slot></slot>
        </ul>
        <div
          ref="trackerRef"
          class="absolute transition-all duration-150"
          :class="{
            'h-[2px] -mt-[2px] bg-[color:var(--x-tabs-text)] dark:bg-[color:var(--x-dark-tabs-text)]': variant === 'line',
            'rounded-md h-full top-0 bg-[color:var(--x-tabs-bg)] dark:bg-[color:var(--x-dark-tabs-bg)]': variant === 'block'
          }"
        ></div>
      </x-scroll>
    </div>
    <div ref="tabsContentRef"></div>
  </div>
</template>
