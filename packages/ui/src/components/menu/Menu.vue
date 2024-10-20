<script lang="ts">
const menuProps = {
  ...useCommon.props(),
  ...useColors.props('secondary'),
  items: Array as PropType<MenuArrayItem[]>,
  collapsible: {
    type: Boolean,
    default: true,
  },
  collapseIcon: String,
  expanded: Boolean,
  disabled: Boolean,
  rounded: {
    type: Boolean,
    default: true,
  },
  filled: {
    type: Boolean,
    default: true,
  },
  minimal: Boolean,
}

export type MenuArrayItem = {
  collapsible?: boolean;
  collapseIcon?: string;
  expanded?: boolean;
  divider?: boolean;
  items?: MenuArrayItem[];
  value?: string | number;
  to?: string | object;
  href?: string;
  target?: string;
  exact?: boolean;
  color?: string;
  size?: Size;
  label?: string;
  icon?: string;
  iconRight?: string;
  loading?: boolean;
  rounded?: boolean;
  filled?: boolean;
  disabled?: boolean;
  active?: boolean;
  attrs?: Record<string, unknown>;
  prefix?: string;
  suffix?: string;
  onClick?: (e: MouseEvent) => void;
}

export type MenuProps = ExtractPublicPropTypes<typeof menuProps>

type InternalClasses = 'wrapper'
export interface MenuTheme extends ThemeComponent<MenuProps, InternalClasses> {}

export default {
  name: 'XMenu',
  validators: {
    ...useCommon.validators(),
  },
}
</script>

<script setup lang="ts">
import type { ExtractPublicPropTypes, PropType } from 'vue'
import { useCommon, type Size } from '../../composables/useCommon'
import { useColors } from '../../composables/useColors'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

import XMenuItem from './MenuItem.vue'
import XAccordionItem from '../../components/accordion/AccordionItem.vue'
import XDivider from '../../components/divider/Divider.vue'

const props = defineProps(menuProps)

defineEmits(['expand', 'item-click'])

const { styles, classes, className } = useTheme('Menu', {}, props)
</script>

<template>
  <div
    v-if="items"
    :style="styles"
    :class="[
      'space-y-1',
      className,
      classes.wrapper
    ]"
  >
    <template v-for="(item, index) in items" :key="index">
      <template v-if="item.items">
        <x-accordion-item
          v-if="item.collapsible !== false"
          :icon="item.collapseIcon || collapseIcon"
          :expanded="item.expanded || expanded"
          :disabled="disabled || item.disabled"
          :show-icon="!!(item.collapseIcon || collapseIcon)"
          class="x-menu-inner space-y-1"
          @expand="$emit('expand')"
        >
          <template #default="{ }">
            <x-menu-item
              :item="item"
              :rounded="rounded"
              :color="item.color || color"
              :filled="item.filled || filled"
              :size="item.size || size"
              :disabled="disabled || item.disabled"
              :minimal="minimal"
              class="font-medium"
            />
          </template>
          <template #content="{ expand }">
            <x-menu
              class="border-l ml-4 border-secondary-100 dark:border-secondary-700"
              :class="{ 'pl-1': filled }"
              :items="item.items"
              :color="item.color || color"
              :size="item.size || size"
              :collapsible="collapsible"
              :collapse-icon="item.collapseIcon || collapseIcon"
              :expanded="item.expanded || expanded"
              :disabled="disabled || item.disabled"
              :rounded="rounded"
              :filled="filled"
              :minimal="minimal"
              @expand="expand(false)"
              @item-click="$emit('item-click')"
            />
          </template>
        </x-accordion-item>
        <template v-else>
          <x-menu-item
            :item="item"
            :rounded="rounded"
            :color="item.color || color"
            :filled="item.filled || filled"
            :size="item.size || size"
            :disabled="disabled || item.disabled"
            :minimal="minimal"
            class="font-medium"
            inactive
            @click="$emit('item-click')"
          />
          <x-menu
            class="x-menu-inner space-y-1 ml-4 border-l border-secondary-100 dark:border-secondary-700"
            :class="{ 'pl-1': filled }"
            :items="item.items"
            :color="item.color || color"
            :size="item.size || size"
            :collapsible="collapsible"
            :collapse-icon="item.collapseIcon || collapseIcon"
            :expanded="item.expanded || expanded"
            :disabled="disabled || item.disabled"
            :minimal="minimal"
            :rounded="rounded"
            :filled="filled"
            @expand="$emit('expand')"
          />
        </template>
      </template>
      <template v-else>
        <x-divider v-if="item.divider"/>
        <x-menu-item
          v-else
          :item="item"
          :rounded="rounded"
          :color="item.color || color"
          :filled="item.filled || filled"
          :size="item.size || size"
          :disabled="disabled || item.disabled"
          :minimal="minimal"
          :class="{ 'my-2': item.divider }"
          @click="$emit('item-click')"
          @active="$emit('expand')"
        />
      </template>
    </template>
  </div>
</template>
