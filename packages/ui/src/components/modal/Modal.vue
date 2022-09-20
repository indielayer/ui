<script lang="ts">
export default { name: 'XModal' }
</script>

<script setup lang="ts">
import { ref, watch, type PropType } from 'vue'
import { onClickOutside, useEventListener } from '@vueuse/core'
import { useTheme } from '../../composables/theme'
import { closeIcon } from '../../common/icons'

import theme from './Modal.theme'

import XScroll from '../../components/scroll/Scroll.vue'
import XIcon from '../icon/Icon.vue'

const props = defineProps({
  size: {
    type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>,
    default: 'md',
  },
  modelValue: Boolean,
  showClose: Boolean,
  backdrop: Boolean,
})

const emit = defineEmits(['update:modelValue'])

const value = ref(props.modelValue)
const visible = ref(false)
const modalRef = ref<HTMLElement | null>(null)

let stopClickOutside: undefined | (()=> void) = undefined

watch(value, (val) => {
  if (stopClickOutside) {
    stopClickOutside()
    stopClickOutside = undefined
  }

  if (val) {
    setTimeout(() => {
      stopClickOutside = onClickOutside(modalRef, close)
    })
  }
})

watch(() => props.modelValue, (val) => {
  if (val) {
    value.value = val

    setTimeout(() => {
      visible.value = val
    })
  } else {
    visible.value = val

    setTimeout(() => {
      value.value = val
    }, 150)
  }
})

if (typeof window !== 'undefined') useEventListener(document, 'keydown', onKeyDown)

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && value.value) close()
}

function close() {
  visible.value = false

  setTimeout(() => {
    value.value = false
    emit('update:modelValue', false)
  }, 150)
}

function open() {
  value.value = true
  emit('update:modelValue', true)

  setTimeout(() => {
    visible.value = true
  })
}

const { styles, classes, className } = useTheme('modal', theme, props)

defineExpose({ open, close })
</script>

<template>
  <teleport to="body">
    <div
      v-if="value"
      :style="styles"
      :class="[
        className,
        classes.wrapper,
        visible ? 'visible' : 'invisible ease-in duration-100'
      ]"
    >
      <div
        v-if="backdrop"
        :class="[
          classes.backdrop,
          visible ? 'ease-out duration-200 opacity-30 dark:opacity-70' : 'ease-in duration-100 opacity-0',
        ]"
      ></div>

      <div class="flex items-end sm:items-center justify-center p-4 sm:p-6 h-screen">
        <div
          ref="modalRef"
          :class="[
            classes.modal,
            visible ?
              'ease-out duration-200 opacity-100 translate-y-0 sm:scale-100'
              : 'ease-in duration-200 opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95',
          ]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
        >
          <div
            v-if="showClose"
            :class="[
              classes.closeIcon,
              $slots.image ? 'bg-gray-900 text-white' : 'bg-gray-500 text-gray-800 dark:text-gray-300'
            ]"
            @click="close"
          >
            <x-icon :icon="closeIcon"/>
          </div>
          <slot name="image"></slot>
          <div v-if="$slots.header" :class="classes.header">
            <slot name="header"></slot>
          </div>
          <x-scroll
            v-if="$slots.default"
            :scrollbar="false"
            vertical
          >
            <div :class="classes.content">
              <slot></slot>
            </div>
          </x-scroll>
          <div v-if="$slots.actions" :class="classes.actions">
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
    </div>
  </teleport>
</template>
