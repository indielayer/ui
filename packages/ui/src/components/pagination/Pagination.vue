<script lang="ts">
import { useCommon } from '../../composables/common'

export default {
  name: 'XPagination',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import { computed, ref, watch, type PropType } from 'vue'
import { useTheme } from '../../composables/theme'
import { dotsIcon, prevIcon, nextIcon } from '../../common/icons'

import XIcon from '../../components/icon/Icon.vue'
import XInput from '../../components/input/Input.vue'
import XButton from '../button/Button.vue'
import XPaginationItem from './PaginationItem.vue'

import theme from './Pagination.theme'

const props = defineProps({
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
})

const emit = defineEmits(['update:modelValue'])

const pages = computed(() => {
  if (props.totalPages === 3) return [2]
  if (props.totalPages > 2) {
    if (props.modelValue === 1 || props.modelValue === 2) return [2, 3]
    if (props.modelValue === props.totalPages || props.modelValue === props.totalPages - 1) return [props.totalPages - 2, props.totalPages - 1]

    return [props.modelValue - 1, props.modelValue, props.modelValue + 1]
  }

  return []
})

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

const quickButtonSize = computed(() => {
  if (props.size === 'xs') return 'xs'
  else if (props.size === 'sm') return 'sm'
  else if (props.size === 'lg') return 'md'
  else if (props.size === 'xl') return 'lg'

  return 'sm'
})

const { styles, classes, className } = useTheme('pagination', theme, props)
</script>

<template>
  <ul
    :style="styles"
    :class="[
      className,
      classes.wrapper,
    ]"
  >
    <template v-if="variant === 'quick'">
      <x-button
        :icon-left="prevIcon"
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
        :icon-left="nextIcon"
        :size="quickButtonSize"
        :disabled="modelValue >= totalPages"
        @click="nextPage"
      />
    </template>
    <template v-else-if="variant === 'simple'">
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
    </template>
    <template v-else-if="variant === 'dots'">
      <li
        v-for="i in totalPages"
        :key="i"
        class="rounded-full cursor-pointer"
        :class="[
          classes.dots,
          i === modelValue ? 'bg-[color:var(--x-pagination-bg)]': 'bg-gray-100 hover:bg-gray-200'
        ]"
        @click="$emit('update:modelValue', i)"
      ></li>
    </template>
  </ul>
</template>
