<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const menuItemProps = {
  ...useCommon.props(),
  ...useColors.props('secondary'),
  item: {
    type: Object as PropType<MenuArrayItem>,
    default: () => {},
    description: 'Item data object. Individual props override matching fields.',
  },
  active: {
    type: Boolean,
    description: 'Forces active styling when not using router link classes.',
  },
  attrs: {
    type: Object,
    default: () => {},
    description: 'Extra HTML attributes merged onto the root element.',
  },
  onClick: {
    type: Function,
    description: 'Click handler invoked when the item is activated.',
  },
  value: {
    type: [Number, String],
    description: 'Item value identifier.',
  },
  to: {
    type: [String, Object],
    description: 'Vue Router location; renders as a router-link when set.',
  },
  exact: {
    type: Boolean,
    description: 'Requires exact route match for active state.',
  },
  href: {
    type: String,
    description: 'Native link URL; renders as an anchor when set.',
  },
  target: {
    type: String,
    description: 'Anchor target when `href` is set.',
  },
  label: {
    type: String,
    description: 'Visible label text.',
  },
  icon: {
    type: String,
    description: 'Icon name shown before the label.',
  },
  iconRight: {
    type: String,
    description: 'Icon name shown after the label.',
  },
  loading: {
    type: Boolean,
    description: 'Shows a spinner in place of the trailing icon.',
  },
  rounded: {
    type: Boolean,
    default: true,
    description: 'Applies rounded corners.',
  },
  filled: {
    type: Boolean,
    default: true,
    description: 'Filled background style.',
  },
  selected: {
    type: Boolean,
    description: 'Selected visual state.',
  },
  disabled: {
    type: Boolean,
    description: 'Disables interaction.',
  },
  minimal: optionalBooleanProp('Hides the label; icon-only layout.'),
  prefix: {
    type: String,
    description: 'Text before the label when no prefix slot is used.',
  },
  suffix: {
    type: String,
    description: 'Text after the label when no suffix slot is used.',
  },
  checkbox: optionalBooleanProp('Shows a checkbox before the label.'),
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
  docs: {
    slots: {
      default: 'Label content. Slot prop: item.',
      prefix: 'Content before the label. Slot prop: item.',
      suffix: 'Content after the label. Slot prop: item.',
    },
    emits: {
      active: 'Emitted when the item becomes active (route or `active` prop).',
      click: 'Emitted on item click when not disabled.',
      'checkbox-click': 'Emitted when the checkbox is clicked.',
    },
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
      class="mr-1.5"
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

<style module scoped>
.menu-item {
  color: var(--x-menu-item-text);
  background-color: var(--x-menu-item-bg);
}

.menu-item::before {
  content: "";
  position: absolute;
  left: -1px;
  height: 100%;
  width: 1px;
  background-color: transparent;
}

.menu-item:hover {
  color: var(--x-menu-item-text-hover, var(--x-menu-item-text));
  background-color: var(--x-menu-item-bg-hover, var(--x-menu-item-bg));
}

:global(.dark) .menu-item,
.menu-item:global(.dark) {
  color: var(--x-menu-item-dark-text);
  background: var(--x-menu-item-dark-bg);
}

:global(.dark) .menu-item:hover,
.menu-item:global(.dark):hover {
  color: var(--x-menu-item-dark-text-hover, var(--x-menu-item-dark-text));
  background-color: var(--x-menu-item-dark-bg-hover, var(--x-menu-item-dark-bg));
}

:global(.x-menu-inner) .menu-item:hover::before,
:global(.x-menu-inner) .menu-item--active::before {
  background-color: var(--x-menu-item-border-hover);
}
</style>
