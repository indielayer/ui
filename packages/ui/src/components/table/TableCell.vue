<script lang="ts">
import { optionalBooleanProp } from '../../common/props'

const validators = {
  textAlign: [null, 'left', 'center', 'right', 'justify'] as const,
  verticalAlign: [null, 'baseline', 'bottom', 'middle', 'text-bottom', 'text-top', 'top'] as const,
}
const tableCellProps = {
  textAlign: {
    type: String as PropType<TableCellTextAlign>,
    validator: (value: string) => validators.textAlign.includes(value as any),
    description: 'Horizontal text alignment.',
  },
  truncate: optionalBooleanProp('Truncates overflowing cell content with an ellipsis.'),
  dense: optionalBooleanProp('Compact cell padding.'),
  width: {
    type: [String, Number],
    description: 'Fixed cell width (number is treated as px).',
  },
  verticalAlign: {
    type: String as PropType<TableCellVerticalAlign>,
    default: 'middle',
    validator: (value: string) => validators.verticalAlign.includes(value as any),
    description: 'Vertical alignment of cell content.',
  },
  to: {
    type: [String, Object],
    description: 'Vue Router location; wraps cell content in a router-link.',
  },
  href: {
    type: String,
    description: 'Anchor href; wraps cell content in a link.',
  },
  target: {
    type: String as PropType<'_blank' | '_self' | '_parent' | '_top'>,
    description: 'Link target when `href` or `to` is set.',
  },
}

export type TableCellTextAlign = typeof validators.textAlign[number]
export type TableCellVerticalAlign = typeof validators.verticalAlign[number]
export type TableCellProps = ExtractPublicPropTypes<typeof tableCellProps>

type InternalClasses = 'wrapper'
export interface TableCellTheme extends ThemeComponent<TableCellProps, InternalClasses> {}

export default {
  name: 'XTableCell',
  validators,
  docs: {
    slots: {
      default: 'Cell content.',
    },
  },
}
</script>

<script setup lang="ts">
import { computed, type ExtractPublicPropTypes, type PropType } from 'vue'
import { useTheme, type ThemeComponent } from '../../composables/useTheme'

const props = defineProps(tableCellProps)

const computedWidth = computed(() => typeof props.width === 'number' ? `${props.width}px` : props.width)

const { styles, classes, className } = useTheme('TableCell', {}, props)
</script>

<template>
  <td
    v-if="to || href"
    class="relative"
    :class="className"
    :style="[{ width: computedWidth, minWidth: computedWidth, maxWidth: computedWidth }]"
  >
    <component
      :is="to ? 'router-link' : 'a'"
      v-bind="href ? { href } : {}"
      :target="target"
      :to="to"
      :style="styles"
      :class="classes.wrapper"
    >
      <div :class="[truncate ? 'truncate' : '']">
        <slot></slot>
      </div>
    </component>
  </td>
  <td
    v-else
    :style="[styles, { width: computedWidth, minWidth: computedWidth, maxWidth: computedWidth }]"
    :class="[
      'relative',
      className,
      classes.wrapper,
    ]"
  >
    <slot></slot>
  </td>
</template>
