<script lang="ts">
export default { name: 'XMenu' }
</script>

<script setup lang="ts">
import type { PropType } from 'vue'
import { useCommon } from '../../composables/common'
import { useColors } from '../../composables/colors'
import { useTheme } from '../../composables/theme'

import XMenuItem from './MenuItem.vue'
import XCollapse from '../../components/collapse/Collapse.vue'
import XDivider from '../../components/divider/Divider.vue'

import theme from './Menu.theme'

const props = defineProps({
  ...useCommon.props(),
  ...useColors.props('primary'),
  items: Array as PropType<Array<any>>,
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
})

const emit = defineEmits(['expand'])

const { styles, classes, className } = useTheme('menu', theme, props)
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
        <x-collapse
          v-if="item.collapsible !== false"
          :icon="item.collapseIcon || collapseIcon"
          :expanded="item.expanded || expanded"
          :disabled="disabled || item.disabled"
          class="x-menu-inner space-y-1"
          @expand="$emit('expand')"
        >
          <template #default="{ }">
            <x-menu-item
              :item="item"
              :color="item.color || color"
              :size="item.size || size"
              :rounded="rounded"
              :filled="filled"
              :disabled="disabled || item.disabled"
              class="pr-10 font-medium"
            />
          </template>
          <template #content="{ expand }">
            <x-menu
              class="border-l ml-4 border-gray-100 dark:border-gray-700"
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
              @expand="expand(false)"
            />
          </template>
        </x-collapse>
        <template v-else>
          <x-menu-item
            :item="item"
            :rounded="rounded"
            :color="item.color || color"
            :size="item.size || size"
            :disabled="disabled || item.disabled"
            class="font-medium"
            inactive
          />
          <x-menu
            class="x-menu-inner space-y-1 ml-4 border-l border-gray-100 dark:border-gray-700"
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
            @expand="$emit('expand')"
          />
        </template>
      </template>
      <template v-else>
        <x-divider v-if="item.divider"/>
        <x-menu-item
          v-else
          :color="item.color || color"
          :size="item.size || size"
          :item="item"
          :disabled="disabled || item.disabled"
          :filled="filled"
          :rounded="rounded"
          :class="{ 'my-2': item.divider }"
          @active="$emit('expand')"
        />
      </template>
    </template>
  </div>
</template>
