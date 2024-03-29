<script lang="ts">
const paginationVariant = ['simple', 'quick', 'dots'] as const
const paginationProps = {
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
    type: String as PropType<PaginationVariant>,
    default: 'simple',
  },
}

export type PaginationVariant = typeof paginationVariant[number]
export type PaginationProps = ExtractPublicPropTypes<typeof paginationProps>

type InternalClasses = 'wrapper' | 'dots'
export interface PaginationTheme extends ThemeComponent<PaginationProps, InternalClasses> {}

export default {
  name: 'XPagination',
  validators: {
    ...useCommon.validators(),
    variant: paginationVariant,
  },
}
</script>

<script setup lang="ts">
import { computed, ref, watch, type PropType, type ExtractPublicPropTypes } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useCommon } from '../../composables/useCommon'
import { dotsIcon, prevIcon, nextIcon } from '../../common/icons'

import XIcon from '../../components/icon/Icon.vue'
import XInput from '../../components/input/Input.vue'
import XButton from '../button/Button.vue'
import XPaginationItem from './PaginationItem.vue'

const props = defineProps(paginationProps)

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

const { styles, classes, className } = useTheme('Pagination', {}, props)
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
        <span class="text-secondary-600 mr-2">Page</span>
        <x-input
          v-model="quickInput"
          :size="size"
          class="text-center w-16"
          hide-footer
          @keydown.enter="onQuickInput"
        />
        <span class="text-secondary-600 ml-2">of {{ totalPages }}</span>
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
          i === modelValue ? 'bg-[color:var(--x-pagination-bg)]': 'bg-secondary-100 hover:bg-secondary-200'
        ]"
        @click="$emit('update:modelValue', i)"
      ></li>
    </template>
  </ul>
</template>
