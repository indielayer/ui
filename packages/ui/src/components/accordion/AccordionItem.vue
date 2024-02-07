<script lang="ts">
const accordionItemAlign = ['left', 'right'] as const
const accordionItemProps = {
  tag: {
    type: String,
    default: 'div',
  },
  disabled: Boolean,
  expanded: Boolean,
  showIcon: {
    type: Boolean,
    default: true,
  },
  icon: String,
  iconAlign: {
    type: String as PropType<AccordionItemAlign>,
    default: 'right',
  },
}

export type AccordionItemAlign = typeof accordionItemAlign[number]
export type AccordionItemProps = ExtractPublicPropTypes<typeof accordionItemProps>

type InternalClasses = 'wrapper' | 'icon' | 'content'
type InternalData = {
  collapsed: boolean;
  isInsideAccordion: boolean;
}
export interface AccordionItemTheme extends ThemeComponent<AccordionItemProps, InternalClasses, InternalData> {}

export default {
  name: 'XAccordionItem',
  validators: {
    iconAlign: accordionItemAlign,
  },
}
</script>

<script setup lang="ts">
import { ref, watch, type ExtractPublicPropTypes, type PropType, inject, computed, reactive } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

import XIcon from '../../components/icon/Icon.vue'
import { injectAccordionKey } from '../../composables/keys'

const props = defineProps(accordionItemProps)

const emit = defineEmits(['expand'])

const accordionProps = inject(injectAccordionKey, {
  isInsideAccordion: false,
})

const computedIconAlign = computed(() => accordionProps.iconAlign || props.iconAlign)
const computedProps = reactive({
  iconAlign: computedIconAlign,
})

const collapsed = ref(!props.expanded)
const animated = ref(true)

watch(() => props.expanded, () => {
  collapsed.value = !props.expanded
})

function onBeforeEnter(el: Element) {
  if (animated.value) (el as HTMLElement).style.height = '0px'
}

function onEnter(el: Element, done: () => void) {
  if (!animated.value) done()
  else {
    el.addEventListener('transitionend', done)
    setTimeout(() => {
      (el as HTMLElement).style.height = `${el.scrollHeight}px`
    }, 1)
  }
}

function onAfterEnter(el: Element) {
  if (!animated.value) {
    animated.value = true
  } else {
    (el as HTMLElement).style.removeProperty('height')
  }
}

function onBeforeLeave(el: Element) {
  if (!animated.value) return
  (el as HTMLElement).style.height = `${el.scrollHeight}px`
}

function onLeave(el: Element, done: () => void) {
  if (!animated.value) done()
  else {
    el.addEventListener('transitionend', done)
    setTimeout(() => {
      (el as HTMLElement).style.height = '0px'
    }, 1)
  }
}

function onAfterLeave(el: Element) {
  if (!animated.value) {
    animated.value = true
  } else {
    (el as HTMLElement).style.removeProperty('height')
  }
}

function open(anim = true) {
  animated.value = anim
  collapsed.value = false
}

function close(anim = true) {
  animated.value = anim
  collapsed.value = true
}

function toggle() {
  if (!props.disabled) collapsed.value = !collapsed.value
}

function onExpand(anim = true) {
  open(anim)
  emit('expand')
}

const { styles, classes, className } = useTheme('AccordionItem', {}, {
  ...props,
  ...computedProps,
}, { collapsed, isInsideAccordion: accordionProps.isInsideAccordion })

defineExpose({ toggle, open, close })
</script>

<template>
  <component
    :is="tag"
    :style="styles"
    :class="className"
    :aria-disabled="disabled"
    :aria-expanded="collapsed ? 'false' : 'true'"
  >
    <button
      type="button"
      :class="classes.wrapper"
      @click="toggle"
    >
      <div class="flex-1 overflow-hidden">
        <slot :collapsed="collapsed"></slot>
      </div>

      <div v-if="showIcon" :class="classes.icon">
        <x-icon v-if="icon" :icon="icon" />
        <svg
          v-else
          viewBox="0 0 24 24"
          stroke="currentColor"
          fill="none"
          role="presentation"
          class="stroke-2 w-4 h-4"
        >
          <path d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </button>

    <template v-if="$slots.summary">
      <slot name="summary"></slot>
    </template>

    <transition
      @before-enter="onBeforeEnter"
      @enter="onEnter"
      @after-enter="onAfterEnter"
      @before-leave="onBeforeLeave"
      @leave="onLeave"
      @after-leave="onAfterLeave"
    >
      <div v-show="!collapsed" :class="classes.content">
        <slot name="content" :expand="onExpand" :collapsed="collapsed"></slot>
      </div>
    </transition>
  </component>
</template>
