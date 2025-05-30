<script lang="ts">
const menuItemProps = {
  ...useCommon.props(),
  ...useColors.props('secondary'),
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
  to: [String, Object],
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
  minimal: Boolean,
  prefix: String,
  suffix: String,
  checkbox: Boolean,
}

export type MenuItemProps = ExtractPublicPropTypes<typeof menuItemProps>

type InternalClasses = 'wrapper'
type InternalExtraData = { isActive: Ref<boolean>; }
export interface MenuItemTheme extends ThemeComponent<MenuItemProps, InternalClasses, InternalExtraData> {}

export default {
  name: 'XMenuItem',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import { ref, computed, watch, onMounted, type ExtractPublicPropTypes, type PropType, type Ref } from 'vue'
import { useMutationObserver } from '@vueuse/core'
import { useColors } from '../../composables/useColors'
import { useCommon } from '../../composables/useCommon'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

import XIcon from '../../components/icon/Icon.vue'
import XSpinner from '../../components/spinner/Spinner.vue'
import XCheckbox from '../../components/checkbox/Checkbox.vue'

import type { MenuArrayItem } from './Menu.vue'

const props = defineProps(menuItemProps)

const emit = defineEmits(['active', 'click', 'checkbox-click'])

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

function onItemClick(e: Event, eventName: 'click' | 'checkbox-click') {
  if (computedProps.value.disabled) {
    e.stopPropagation()
    e.preventDefault()

    return
  }

  computedProps.value.onClick && computedProps.value.onClick(e)
  emit(eventName, e)
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

const { styles, classes, className } = useTheme('MenuItem', {}, computedProps, { isActive })
</script>

<template>
  <component
    :is="htmlTag"
    ref="elRef"
    v-bind="{
      ...(computedProps.href ? { href: computedProps.href } : {}),
      ...computedProps.attrs,
    }"
    :to="computedProps.to"
    :target="computedProps.target"
    :color="computedProps.color"
    :style="styles"
    :class="[
      className,
      $style['menu-item'],
      [isActive && !checkbox ? $style['menu-item--active'] : ''],
      classes.wrapper,
      {
        'flex items-center': $slots.prefix || $slots.suffix
      }
    ]"
    :title="computedProps.label"
    :alt="computedProps.label"
    @click="onItemClick($event, 'click')"
  >
    <x-checkbox
      v-if="checkbox"
      :model-value="computedProps.active"
      hide-footer
      skip-form-registry
      @click.stop.prevent="onItemClick($event, 'checkbox-click')"
    />

    <span v-if="$slots.prefix || computedProps.prefix" class="mr-2 shrink-0">
      <slot name="prefix" :item="computedProps">{{ computedProps.prefix }}</slot>
    </span>
    <x-icon v-else-if="computedProps.icon" :size="computedProps.size" :icon="computedProps.icon" class="mr-2"/>

    <span v-if="!minimal" class="flex-1 truncate">
      <slot :item="computedProps">{{ computedProps.label }}</slot>
    </span>

    <span class="ml-1 shrink-0">
      <x-spinner v-if="computedProps.loading" :size="computedProps.size" />
      <template v-else>
        <span v-if="$slots.suffix || computedProps.suffix">
          <slot name="suffix" :item="computedProps">{{ computedProps.suffix }}</slot>
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
