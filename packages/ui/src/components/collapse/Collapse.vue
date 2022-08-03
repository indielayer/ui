<script lang="ts">
export default { name: 'XCollapse' }
</script>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { useTheme } from '../../composables/theme'
import { useColors } from '../../composables/colors'

import XIcon from '../../components/icon/Icon.vue'

import theme from './Collapse.theme'

const props = defineProps({
  ...useColors.props(),
  tag: {
    type: String,
    default: 'div',
  },
  disabled: Boolean,
  expanded: Boolean,
  showIcon: Boolean,
  icon: String,
})

const emit = defineEmits(['expand'])

const collapsed = ref(!props.expanded)
const animated = ref(true)

watch(() => props.expanded, () => {
  collapsed.value = !props.expanded
})

function onBeforeEnter(el: HTMLElement) {
  if (animated.value) el.style.height = '0px'
}

function onEnter(el: HTMLElement, done: ()=> void) {
  if (!animated.value) done()
  else {
    el.addEventListener('transitionend', done)
    setTimeout(() => {
      el.style.height = `${el.scrollHeight}px`
    }, 1)
  }
}

function onAfterEnter(el: HTMLElement) {
  if (!animated.value) {
    animated.value = true
  } else {
    el.style.removeProperty('height')
  }
}

function onBeforeLeave(el: HTMLElement) {
  if (!animated.value) return
  el.style.height = `${el.scrollHeight}px`
}

function onLeave(el: HTMLElement ,done: ()=> void) {
  if (!animated.value) done()
  else {
    el.addEventListener('transitionend', done)
    setTimeout(() => {
      el.style.height = '0px'
    }, 1)
  }
}

function onAfterLeave(el: HTMLElement) {
  if (!animated.value) {
    animated.value = true
  } else {
    el.style.removeProperty('height')
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

const { styles, classes, className } = useTheme('collapse', theme, props)

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
    <div
      :class="classes.wrapper"
      @click="toggle"
    >
      <div class="flex-1 overflow-hidden">
        <slot :collapsed="collapsed"></slot>
      </div>

      <div v-if="showIcon" :class="classes.icon">
        <span
          class="flex transform transition-transform duration-150"
          :class="[
            {
              'rotate-180': !collapsed,
              'text-gray-300': disabled
            }
          ]"
        >
          <x-icon v-if="icon" :icon="icon" />
          <svg
            v-else
            viewBox="0 0 24 24"
            stroke="currentColor"
            fill="none"
            role="presentation"
            class="stroke-2 w-5 h-5"
          >
            <path d="M19 9l-7 7-7-7" />
          </svg>
        </span>
      </div>
    </div>

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
