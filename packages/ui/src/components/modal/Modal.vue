<script lang="ts">
const modalSize = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
const modalProps = {
  size: {
    type: String as PropType<ModalSize>,
    default: 'xl',
  },
  modelValue: Boolean,
  showClose: Boolean,
  backdrop: Boolean,
  hasActions: {
    type: Boolean,
    default: true,
  },
  hasHeader: {
    type: Boolean,
    default: true,
  },
  title: String,
  description: String,
  label: String,
  loading: Boolean,
  loadingText: String,
  fluid: Boolean,

  // form props
  isForm: Boolean,
  formDisabled: Boolean,
  formDescription: String,
  formTitle: String,
  formAutoValidate: {
    type: Boolean,
    default: true,
  },
  formErrors: {
    type: [Array, Object] as PropType<[FormError[], FormError]>,
    default: () => ([]),
  },
  persistent: Boolean,
}

export type ModalSize = typeof modalSize[number]
export type ModalProps = ExtractPublicPropTypes<typeof modalProps>

type InternalClasses = 'wrapper' | 'backdrop' | 'modal' | 'closeIcon' | 'header' | 'content' | 'actions' | 'title' | 'description' | 'label'
type InternaData = {
  visible: boolean;
}
export interface ModalTheme extends ThemeComponent<ModalProps, InternalClasses, InternaData> {}

export default {
  name: 'XModal',
  validators: {
    size: modalSize,
  },
}
</script>

<script setup lang="ts">
import { ref, watch, type PropType, type ExtractPublicPropTypes, computed, nextTick, onMounted } from 'vue'
import { onClickOutside, useEventListener } from '@vueuse/core'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'
import { useFocusTrap } from '../../composables/useFocusTrap'
import { closeIcon } from '../../common/icons'

import XButton from '../button/Button.vue'
import XScroll from '../scroll/Scroll.vue'
import XForm, { type FormError } from '../form/Form.vue'
import { useSlots } from 'vue'

const props = defineProps(modalProps)

const emit = defineEmits(['update:modelValue', 'submit'])

const value = ref(props.modelValue)
const visible = ref(false)
const modalRef = ref<HTMLElement | null>(null)
const modalWrapperRef = ref<HTMLElement | null>(null)

const { initFocusTrap, clearFocusTrap } = useFocusTrap()

let stopClickOutside: undefined | (() => void) = undefined

watch(value, (val) => {
  if (stopClickOutside) {
    stopClickOutside()
    stopClickOutside = undefined
  }

  if (val) {
    setTimeout(() => {
      stopClickOutside = onClickOutside(modalRef, clickOutsideCallback, {
        ignore: ['.v-popper__popper'],
      })
    })
  }
})

watch(() => props.modelValue, checkVisibiliy, { immediate: true })

async function checkVisibiliy() {
  const val = props.modelValue

  if (val) {
    value.value = val

    await nextTick()

    visible.value = val

    await nextTick()

    initFocusTrap(modalRef)
    document.body.style.overflow = 'hidden'
  } else {
    visible.value = val
    value.value = val
    clearFocusTrap()
    document.body.style.overflow = 'auto'
  }
}

if (typeof window !== 'undefined') useEventListener(document, 'keydown', onKeyDown)

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && value.value && !props.persistent) close()
}

function clickOutsideCallback() {
  if (!props.persistent) close()
}

function close() {
  visible.value = false
  setTimeout(() => {
    emit('update:modelValue', false)
  }, 150)
}

function open() {
  emit('update:modelValue', true)
  visible.value = true
}

const slots = useSlots()

const hasPlaceholder = computed(() => {
  if (slots['tertiary-action'] || slots['cancel-action']) return true

  return false
})

const { styles, classes, className } = useTheme('Modal', {}, props, {
  visible,
})

defineExpose({ open, close })
</script>

<template>
  <teleport to="body">
    <div
      v-if="value"
      ref="modalWrapperRef"
      :style="styles"
      :class="[
        className,
        classes.wrapper,
        visible ? 'visible' : 'invisible ease-in duration-100'
      ]"
    >
      <div
        v-if="backdrop"
        :class="classes.backdrop"
      ></div>

      <div class="flex items-end sm:items-center justify-center p-4 sm:p-6 h-screen">
        <component
          :is="isForm ? XForm : 'div'"
          ref="modalRef"
          :disabled="formDisabled"
          :auto-validate="formAutoValidate"
          :title="formTitle"
          :description="formDescription"
          :errors="formErrors"
          :class="classes.modal"
          auto-focus
          :has-footer="false"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-headline"
          @submit="(isValid: boolean) => $emit('submit', isValid)"
        >
          <slot name="image"></slot>
          <div v-if="hasHeader" :class="classes.header">
            <slot name="header">
              <div v-if="label" :class="classes.label">{{ label }}</div>
              <div v-if="title" :class="classes.title">{{ title }}</div>
            </slot>
          </div>
          <x-scroll
            v-if="$slots.default"
            :scrollbar="false"
            vertical
          >
            <div :class="classes.content">
              <div v-if="description" :class="classes.description">{{ description }}</div>
              <slot></slot>
            </div>
          </x-scroll>
          <x-button
            v-if="showClose"
            ghost
            size="sm"
            tabindex="-1"
            :icon="closeIcon"
            :class="classes.closeIcon"
            @click="close"
          />
          <div v-if="hasActions" :class="classes.actions">
            <slot name="actions">
              <slot name="cancel-action"></slot>
              <div v-if="hasPlaceholder"></div>
              <slot name="tertiary-action"></slot>
              <slot name="secondary-action"></slot>
              <slot name="primary-action"></slot>
            </slot>
          </div>
        </component>
      </div>
    </div>
  </teleport>
</template>
