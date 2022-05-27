<script lang="ts">
import { computed, defineComponent, ref, watch, type PropType } from 'vue'

import { onClickOutside, useEventListener } from '@vueuse/core'

import XScroll from '@/components/scroll/Scroll.vue'

export default defineComponent({
  name: 'XModal',

  components: {
    XScroll,
  },

  props: {
    size: {
      type: String as PropType<'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'full'>,
      default: 'md',
    },
    modelValue: Boolean,
    showClose: Boolean,
    backdrop: Boolean,
  },

  emits: ['update:modelValue'],

  expose: ['open', 'close'],

  setup(props, { emit }) {
    const value = ref(props.modelValue)
    const visible = ref(false)
    const modalRef = ref<HTMLElement | null>(null)

    const classes = computed(() => {
      if (props.size === 'full') return 'w-full'
      else if (props.size === 'xs') return 'sm:max-w-xs w-full'
      else if (props.size === 'sm') return 'sm:max-w-sm w-full'
      else if (props.size === 'lg') return 'sm:max-w-xl w-full'
      else if (props.size === 'xl') return 'sm:max-w-3xl w-full'

      return 'sm:max-w-lg w-full'
    })

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

    useEventListener(document, 'keydown', onKeyDown)

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

    const closeIcon = '<path d="M6 18L18 6M6 6l12 12" />'

    return {
      closeIcon,
      modalRef,
      classes,
      visible,
      value,
      close,
      open,
    }
  },
})
</script>

<template>
  <Teleport to="body">
    <div
      v-if="value"
      class="fixed z-40 inset-0 overflow-y-auto transition-all"
      :class="[
        visible ? 'visible' : 'invisible ease-in duration-100'
      ]"
    >
      <div
        v-if="backdrop"
        class="fixed inset-0 bg-gray-500 dark:bg-black transition-opacity"
        :class="[
          visible ? 'ease-out duration-200 opacity-30 dark:opacity-70' : 'ease-in duration-100 opacity-0',
        ]"
      ></div>

      <div class="flex items-end sm:items-center justify-center p-4 sm:p-6 h-screen">
        <div
          ref="modalRef"
          class="relative flex flex-col z-10 bg-white dark:bg-gray-900 rounded-md shadow-lg transform transition-all overflow-hidden max-h-full"
          :class="[
            classes,
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
            class="absolute p-1 top-4 right-4 rounded-full bg-opacity-10 hover:bg-opacity-30 cursor-pointer"
            :class="[
              $slots.image ? 'bg-gray-900 text-white' : 'bg-gray-500 text-gray-800 dark:text-gray-300'
            ]"
            @click="close"
          >
            <x-icon :icon="closeIcon"/>
          </div>
          <slot name="image"></slot>
          <div v-if="$slots.header" class="text-lg font-semibold px-6 py-4 border-b">
            <slot name="header"></slot>
          </div>
          <x-scroll
            v-if="$slots.default"
            :scrollbar="false"
            vertical
          >
            <div class="px-6 py-4">
              <slot></slot>
            </div>
          </x-scroll>
          <div v-if="$slots.actions" class="bg-slate-50 dark:bg-gray-800 p-4">
            <slot name="actions"></slot>
          </div>
        </div>
      </div>
    </div>
  </Teleport>
</template>
