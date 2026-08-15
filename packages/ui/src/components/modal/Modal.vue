<script lang="ts">
const modalSize = ['xs', 'sm', 'md', 'lg', 'xl', 'full'] as const
const modalPosition = ['top', 'center', 'bottom'] as const
const modalProps = {
  size: {
    type: String as PropType<ModalSize>,
    default: 'lg',
    description: 'Dialog width preset (xs, sm, md, lg, xl, full).',
  },
  position: {
    type: String as PropType<ModalPosition>,
    default: 'center',
    description: 'Vertical placement of the dialog (top, center, bottom).',
  },
  modelValue: {
    type: Boolean,
    description: 'Open state (v-model).',
  },
  showClose: {
    type: Boolean,
    description: 'Shows a close button in the corner.',
  },
  backdrop: {
    type: Boolean,
    default: true,
    description: 'Shows a dimmed backdrop behind the dialog.',
  },
  hasActions: {
    type: Boolean,
    default: true,
    description: 'Renders the default actions footer region when no footer slot is used.',
  },
  hasHeader: {
    type: Boolean,
    default: true,
    description: 'Renders the default header region when no header slot is used.',
  },
  title: {
    type: String,
    description: 'Header title text.',
  },
  description: {
    type: String,
    description: 'Body description shown above the default slot.',
  },
  label: {
    type: String,
    description: 'Small label above the title in the header.',
  },
  loading: {
    type: Boolean,
    description: 'Loading state for the modal (theme/visual).',
  },
  loadingText: {
    type: String,
    description: 'Text shown while loading.',
  },
  fluid: {
    type: Boolean,
    description: 'Stretches the dialog to fill available width within its size.',
  },

  // form props
  isForm: {
    type: Boolean,
    description: 'Wraps content in x-form and enables form submit handling.',
  },
  formDisabled: {
    type: Boolean,
    description: 'Disables the inner form when `isForm` is set.',
  },
  formDescription: {
    type: String,
    description: 'Description passed to the inner form when `isForm` is set.',
  },
  formTitle: {
    type: String,
    description: 'Title passed to the inner form when `isForm` is set.',
  },
  formAutoValidate: {
    type: Boolean,
    default: true,
    description: 'Auto-validate the inner form on submit when `isForm` is set.',
  },
  formErrors: {
    type: [Array, Object] as PropType<FormError[] | FormError>,
    default: () => ([]),
    description: 'External form errors passed to the inner form when `isForm` is set.',
  },
  persistent: {
    type: Boolean,
    description: 'Prevents closing on Escape or backdrop click.',
  },
}

export type ModalSize = typeof modalSize[number]
export type ModalPosition = typeof modalPosition[number]
export type ModalProps = ExtractPublicPropTypes<typeof modalProps>

type InternalClasses = 'wrapper' | 'backdrop' | 'modal' | 'modalWrapper' | 'closeIcon' | 'header' | 'content' | 'actions' | 'title' | 'description' | 'label'
type InternaData = {
  visible: boolean;
}
export interface ModalTheme extends ThemeComponent<ModalProps, InternalClasses, InternaData> {}

export default {
  name: 'XModal',
  validators: {
    size: modalSize,
    position: modalPosition,
  },
  docs: {
    slots: {
      default: 'Main modal body content.',
      image: 'Optional media above the header.',
      header: 'Replaces the default header region.',
      'header-content': 'Custom header content inside the default header layout.',
      footer: 'Replaces the default actions footer.',
      actions: 'Custom actions row inside the default footer.',
      'cancel-action': 'Cancel / dismiss control in the actions row.',
      'tertiary-action': 'Tertiary action control in the actions row.',
      'secondary-action': 'Secondary action control in the actions row.',
      'primary-action': 'Primary action control in the actions row.',
    },
    emits: {
      'update:modelValue': 'Emitted when open state changes (v-model).',
      submit: 'Emitted when the inner form submits. Payload is the validation result.',
    },
    methods: {
      open: 'Open the modal.',
      close: 'Close the modal.',
    },
  },
}
</script>

<script setup lang="ts">
import { ref, watch, type PropType, type ExtractPublicPropTypes, computed, nextTick } from 'vue'
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
        ignore: ['.v-popper__popper', '.dp__menu', '.dp--menu-wrapper'],
      })
    })
  }
})

let initTrapTimeout: ReturnType<typeof setTimeout>

watch(() => props.modelValue, checkVisibility, { immediate: true })

async function checkVisibility() {
  const val = props.modelValue

  if (typeof document === 'undefined' || typeof window === 'undefined') {
    value.value = val
    visible.value = val

    return
  }

  if (val) {
    const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth

    value.value = val

    await nextTick()

    visible.value = val

    initTrapTimeout = setTimeout(() => {
      initFocusTrap(modalRef)
    }, 100)

    document.body.style.paddingRight = `${scrollbarWidth}px`
    document.body.style.overflow = 'hidden'
  } else {
    visible.value = val
    value.value = val
    clearTimeout(initTrapTimeout)
    clearFocusTrap()
    document.body.style.paddingRight = ''
    document.body.style.overflow = 'auto'
  }
}

if (typeof window !== 'undefined') useEventListener(document, 'keydown', onKeyDown)

const shouldIgnoreEvent = (event: KeyboardEvent) => {
  return ['.v-popper__popper', '.x-datepicker', '.dp__menu', '.dp--menu-wrapper'].some((target) => {
    if (typeof target === 'string') {
      return Array.from(window.document.querySelectorAll(target))
        .some((el) => el === event.target || event.composedPath().includes(el))
    }

    return false
  })
}

function onKeyDown(event: KeyboardEvent) {
  if (event.key === 'Escape' && !shouldIgnoreEvent(event) && value.value && !props.persistent) close()
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

      <div :class="classes.modalWrapper">
        <component
          :is="isForm ? XForm : 'div'"
          ref="modalRef"
          class="max-h-full"
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
          <slot name="header">
            <div v-if="hasHeader" :class="classes.header">
              <slot name="header-content">
                <div v-if="label" :class="classes.label">{{ label }}</div>
                <div v-if="title" :class="classes.title">{{ title }}</div>
              </slot>
            </div>
          </slot>
          <x-scroll
            v-if="$slots.default"
            :scrollbar="false"
            :class="{
              'h-full': size === 'full',
            }"
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
          <slot name="footer">
            <div v-if="hasActions" :class="classes.actions">
              <slot name="actions">
                <slot name="cancel-action"></slot>
                <div v-if="hasPlaceholder"></div>
                <slot name="tertiary-action"></slot>
                <slot name="secondary-action"></slot>
                <slot name="primary-action"></slot>
              </slot>
            </div>
          </slot>
        </component>
      </div>
    </div>
  </teleport>
</template>
