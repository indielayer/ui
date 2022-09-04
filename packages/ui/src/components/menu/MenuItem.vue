<script lang="ts">
export default { name: 'XMenuItem' }
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { useMutationObserver } from '@vueuse/core'
import { useColors } from '../../composables/colors'
import { useCommon } from '../../composables/common'
import { useTheme } from '../../composables/theme'

import XIcon from '../../components/icon/Icon.vue'
import XSpinner from '../../components/spinner/Spinner.vue'
import XLink from '../../components/link/Link.vue'

import theme from './MenuItem.theme'

const props = defineProps({
  ...useCommon.props(),
  ...useColors.props('primary'),
  item: {
    type: Object,
    default: () => {},
  },
  active: Boolean,
  onClick: Function,
  inactive: Boolean,
  value: [Number,String],
  to: String,
  exact: Boolean,
  href: String,
  target: String,
  label: String,
  icon: String,
  iconRight: String,
  loading: Boolean,
  rounded: {
    type: Boolean,
    default: true,
  },
  filled: {
    type: Boolean,
    default: true,
  },
  selected: Boolean,
  disabled: Boolean,
})

const emit = defineEmits(['active', 'click'])

const elRef = ref()
const isActive = ref(false)

const cItem = computed(() => ({
  ...props,
  ...props.item,
}))

const htmlTag = computed(() => cItem.value.to || cItem.value.href ? XLink : 'div')

onMounted(() => {
  if (!elRef.value) return

  check()

  if (htmlTag.value === XLink) useMutationObserver(elRef.value.$el, check, {
    attributes: true,
    attributeFilter: ['class'],
  })
})

function onItemClick(e: Event) {
  if (cItem.value.disabled) {
    e.stopPropagation()
    e.preventDefault()

    return
  }

  cItem.value.onClick && cItem.value.onClick(e)
  emit('click', e)
}

function check() {
  if (elRef.value && elRef.value.$el && (cItem.value.href || cItem.value.to)) {
    const active = elRef.value.$el.classList.contains(cItem.value.exact ? 'router-link-exact-active' : 'router-link-active') || false

    isActive.value = active
  } else {
    isActive.value = cItem.value.active
  }
}

watch(() => isActive.value, (val) => {
  if (val) emit('active')
})

watch(() => cItem.value.active, (val) => {
  isActive.value = val
})

const computedProps = computed(() => ({
  ...cItem.value,
  filled: props.filled || props.item?.filled,
}))

const { styles, classes, className } = useTheme('menu-item', theme, computedProps, { isActive })
</script>

<template>
  <component
    :is="htmlTag"
    ref="elRef"
    :to="cItem.to"
    :target="cItem.target"
    :color="cItem.color"
    :style="styles"
    :class="[
      className,
      $style['menu-item'],
      [isActive ? $style['menu-item--active'] : ''],
      classes.wrapper,
      {
        'flex items-center': $slots.prefix || $slots.suffix
      }
    ]"
    :title="cItem.label"
    :alt="cItem.label"
    @click="onItemClick"
  >
    <span v-if="$slots.prefix" class="mr-2 shrink-0">
      <slot name="prefix"></slot>
    </span>
    <x-icon v-else-if="cItem.icon" :size="cItem.size" :icon="cItem.icon" class="mr-2"/>

    <span class="flex-1 truncate">
      <slot>{{ cItem.label }}</slot>
    </span>

    <span class="ml-1 shrink-0">
      <x-spinner v-if="cItem.loading" :size="cItem.size" />
      <template v-else>
        <span v-if="$slots.suffix">
          <slot name="suffix"></slot>
        </span>
        <x-icon v-else-if="cItem.iconRight" :size="cItem.size" :icon="cItem.iconRight"/>
      </template>
    </span>
  </component>
</template>

<style lang="postcss" module scoped>
  .menu-item, .menu-item.x-link {
    color: var(--x-menu-item-text);
    background-color: var(--x-menu-item-bg);

    &:before {
      content: '';
      position: absolute;
      left: -1px;
      height: 100%;
      width: 1px;
      background-color: transparent;
    }

    &:hover {
      color: var(--x-menu-item-text-hover, var(--x-menu-item-text));
      background-color: var(--x-menu-item-bg-hover, var(--x-menu-item-bg));
    }

    :global(.dark) &, &:global(.dark) {
      color: var(--x-menu-item-dark-text);
      background: var(--x-menu-item-dark-bg);
      &:hover {
        color: var(--x-menu-item-dark-text-hover, var(--x-menu-item-dark-text));
        background-color: var(--x-menu-item-dark-bg-hover, var(--x-menu-item-dark-bg));
      }
    }
  }

  :global(.x-menu-inner) {
    .menu-item {
      &:hover:before, &--active:before {
        background-color: var(--x-menu-item-border-hover);
      }
    }
  }
</style>
