<script lang="ts">
const menuItemProps = {
  ...useCommon.props(),
  ...useColors.props('primary'),
  item: {
    type: Object as PropType<MenuArrayItem>,
    default: () => {},
  },
  active: Boolean,
  attrs: {
    type: Object,
    default: () => {},
  },
  onClick: Function,
  value: [Number, String],
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
}

export type MenuItemProps = ExtractPublicPropTypes<typeof menuItemProps>

export default {
  name: 'XMenuItem',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted, type ExtractPublicPropTypes, type PropType } from 'vue'
import { useMutationObserver } from '@vueuse/core'
import { useColors } from '../../composables/useColors'
import { useCommon } from '../../composables/useCommon'
import { useTheme } from '../../composables/useTheme'

import XIcon from '../../components/icon/Icon.vue'
import XSpinner from '../../components/spinner/Spinner.vue'

import theme from './MenuItem.theme'
import type { MenuArrayItem } from './Menu.vue'

const props = defineProps(menuItemProps)

const emit = defineEmits(['active', 'click'])

const elRef = ref()
const isActive = ref(false)

const computedProps = computed(() => ({
  ...props,
  ...props.item,
} as MenuItemProps))

const htmlTag = computed(() => {
  if (computedProps.value.to) return 'router-link'
  if (computedProps.value.href) return 'a'

  return 'div'
})

onMounted(() => {
  if (!elRef.value) return

  check()

  if (htmlTag.value === 'router-link') useMutationObserver(elRef.value.$el, check, {
    attributes: true,
    attributeFilter: ['class'],
  })
})

function onItemClick(e: Event) {
  if (computedProps.value.disabled) {
    e.stopPropagation()
    e.preventDefault()

    return
  }

  computedProps.value.onClick && computedProps.value.onClick(e)
  emit('click', e)
}

function check() {
  if (elRef.value && elRef.value.$el && (computedProps.value.href || computedProps.value.to)) {
    const active = elRef.value.$el.classList.contains(computedProps.value.exact ? 'router-link-exact-active' : 'router-link-active') || false

    isActive.value = active
  } else {
    isActive.value = !!computedProps.value.active
  }
}

watch(() => isActive.value, (val) => {
  if (val) emit('active')
})

watch(() => computedProps.value.active, (val) => {
  isActive.value = !!val
})

const { styles, classes, className } = useTheme('menu-item', theme, computedProps, { isActive })
</script>

<template>
  <component
    :is="htmlTag"
    ref="elRef"
    v-bind="computedProps.attrs"
    :to="computedProps.to"
    :href="computedProps.href"
    :target="computedProps.target"
    :color="computedProps.color"
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
    :title="computedProps.label"
    :alt="computedProps.label"
    @click="onItemClick"
  >
    <span v-if="$slots.prefix" class="mr-2 shrink-0">
      <slot name="prefix"></slot>
    </span>
    <x-icon v-else-if="computedProps.icon" :size="computedProps.size" :icon="computedProps.icon" class="mr-2"/>

    <span class="flex-1 truncate">
      <slot>{{ computedProps.label }}</slot>
    </span>

    <span class="ml-1 shrink-0">
      <x-spinner v-if="computedProps.loading" :size="computedProps.size" />
      <template v-else>
        <span v-if="$slots.suffix">
          <slot name="suffix"></slot>
        </span>
        <x-icon v-else-if="computedProps.iconRight" :size="computedProps.size" :icon="computedProps.iconRight"/>
      </template>
    </span>
  </component>
</template>

<style lang="postcss" module scoped>
  .menu-item {
    color: var(--x-menu-item-text);
    background-color: var(--x-menu-item-bg);

    &::before {
      content: "";
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

    :global(.dark) &,
    &:global(.dark) {
      color: var(--x-menu-item-dark-text);
      background: var(--x-menu-item-dark-bg);

      &:hover {
        color: var(--x-menu-item-dark-text-hover, var(--x-menu-item-dark-text));
        background-color: var(--x-menu-item-dark-bg-hover, var(--x-menu-item-dark-bg));
      }
    }
  }

  :global(.x-menu-inner) {
    /* stylelint-disable-next-line no-descending-specificity */
    .menu-item {
      &:hover::before,
      &--active::before {
        background-color: var(--x-menu-item-border-hover);
      }
    }
  }
</style>
