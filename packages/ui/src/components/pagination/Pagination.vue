<script lang="ts">
import { computed, defineComponent, ref, watch, type PropType } from 'vue'
import { useCSS } from '@/composables/css'
import { useCommon } from '@/composables/common'
import { useColors } from '@/composables/colors'

import XIcon from '@/components/icon/Icon.vue'
import XButton from '@/components/button/Button.vue'
import XPaginationItem from './PaginationItem.vue'

export default defineComponent({
  name: 'XPagination',

  components: {
    XIcon,
    XButton,
    XPaginationItem,
  },

  validators: {
    ...useCommon.validators(),
  },

  props: {
    ...useCommon.props(),
    links: Boolean,
    totalPages: {
      type: Number,
      default: 1,
    },
    modelValue: {
      type: Number,
      default: 1,
    },
    variant: {
      type: String as PropType<'simple' | 'quick' | 'dots'>,
      default: 'simple',
    },
  },

  emits: ['update:modelValue'],

  setup(props, { emit }) {
    const pages = computed(() => {
      if (props.totalPages === 3) return [2]
      if (props.totalPages > 2) {
        if (props.modelValue === 1 || props.modelValue === 2) return [2, 3]
        if (props.modelValue === props.totalPages || props.modelValue === props.totalPages - 1) return [props.totalPages - 2, props.totalPages - 1]

        return [props.modelValue - 1, props.modelValue, props.modelValue + 1]
      }

      return []
    })

    const dotsClass = computed(() => {
      if (props.size === 'xs') return 'h-2 w-2'
      else if (props.size === 'sm') return 'h-3 w-3'
      else if (props.size === 'lg') return 'h-4 w-4'
      else if (props.size === 'xl') return 'h-5 w-5'

      return 'h-3 w-3'
    })

    const css = useCSS('pagination')
    const colors = useColors()
    const color = colors.getPalette('primary')
    const style = css.get('bg', color[500])

    const quickInput = ref<string>(props.modelValue + '')

    function onQuickInput() {
      const number = parseInt(quickInput.value)

      if (number >= 0 && number <= props.totalPages) {
        emit('update:modelValue', number)
      } else {
        quickInput.value = props.modelValue + ''
      }
    }

    watch(() => props.modelValue, (value) => {
      quickInput.value = props.modelValue + ''
    })

    function prevPage() {
      if (props.modelValue > 1) emit('update:modelValue', props.modelValue - 1)
    }

    function nextPage() {
      if (props.modelValue < props.totalPages) emit('update:modelValue', props.modelValue + 1)
    }

    const dotsIcon = '<path d="M5 12h.01M12 12h.01M19 12h.01M6 12a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0zm7 0a1 1 0 11-2 0 1 1 0 012 0z" />'
    const prevIcon = '<path d="M15 19l-7-7 7-7" />'
    const nextIcon = '<path d="M9 5l7 7-7 7" />'

    const quickButtonSize = computed(() => {
      if (props.size === 'xs') return 'xs'
      else if (props.size === 'sm') return 'sm'
      else if (props.size === 'lg') return 'md'
      else if (props.size === 'xl') return 'lg'

      return 'sm'
    })

    return {
      pages,
      dotsIcon,
      dotsClass,
      prevIcon,
      nextIcon,
      quickInput,
      quickButtonSize,
      style,
      onQuickInput,
      prevPage,
      nextPage,
    }
  },
})
</script>

<template>
  <ul v-if="variant === 'quick'" class="flex items-center">
    <x-button
      :icon="prevIcon"
      :size="quickButtonSize"
      :disabled="modelValue <= 1"
      @click="prevPage"
    />
    <div class="mx-9 flex items-center">
      <span class="text-gray-600 mr-2">Page</span>
      <x-input v-model="quickInput" :size="size" class="w-[2.75rem] text-center" @keydown.enter="onQuickInput" />
      <span class="text-gray-600 ml-2">of {{ totalPages }}</span>
    </div>
    <x-button
      :icon="nextIcon"
      :size="quickButtonSize"
      :disabled="modelValue >= totalPages"
      @click="nextPage"
    />
  </ul>
  <ul v-else-if="variant === 'simple'" class="flex items-center space-x-2">
    <x-pagination-item
      :value="1"
      :links="links"
      :size="size"
      :selected="modelValue === 1"
      @input="(value: Event) => $emit('update:modelValue', value)"
    />
    <x-icon v-if="totalPages > 3 && modelValue > 3" class="mx-1" :icon="dotsIcon" :size="size"/>
    <x-pagination-item
      v-for="i in pages"
      :key="i"
      :value="i"
      :links="links"
      :size="size"
      :selected="modelValue === i"
      @input="(value: Event) => $emit('update:modelValue', value)"
    />
    <x-icon v-if="totalPages > 3 && modelValue < totalPages - 2" class="mx-1" :icon="dotsIcon" :size="size"/>
    <x-pagination-item
      v-if="totalPages > 1"
      :value="totalPages"
      :links="links"
      :size="size"
      :selected="modelValue === totalPages"
      @input="(value: Event) => $emit('update:modelValue', value)"
    />
  </ul>
  <ul v-else-if="variant === 'dots'" class="flex space-x-6" :style="style">
    <li
      v-for="i in totalPages"
      :key="i"
      class="rounded-full cursor-pointer"
      :class="[dotsClass, i === modelValue ? 'bg-[color:var(--x-pagination-bg)]': 'bg-gray-100 hover:bg-gray-200']"
      @click="$emit('update:modelValue', i)"
    ></li>
  </ul>
</template>
