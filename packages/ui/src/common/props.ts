import type { Prop } from 'vue'

/**
 * Optional boolean prop that stays `undefined` when omitted.
 * Use for props that participate in app-level `defaults` (see `resolvePropsWithDefaults`).
 *
 * Migrate: visual variants (outlined, ghost, light, flat, rounded, glow, filled, shadow, underline),
 * layout (block, dense, vertical, striped), and feature toggles users may default app-wide
 * (clearable, filterable, removable, selectable).
 *
 * Do not migrate: state/behavior (disabled, loading, required, error, readonly, indeterminate),
 * controlled values (modelValue, shown, expanded, active, selected), or props that already
 * declare `default: true/false` in defineProps.
 *
 * Plain `Boolean` props are cast to `false` when absent in Vue 3.
 * @see https://vuejs.org/guide/components/props.html#boolean-casting
 */
export function optionalBooleanProp(): Prop<boolean | undefined> {
  return {
    type: Boolean,
    default: undefined,
  }
}

/** Shared variant booleans for Button and ButtonGroup. */
export const variantBooleanProps = () => ({
  outlined: optionalBooleanProp(),
  rounded: optionalBooleanProp(),
  glow: optionalBooleanProp(),
  ghost: optionalBooleanProp(),
  light: optionalBooleanProp(),
  flat: optionalBooleanProp(),
  block: optionalBooleanProp(),
})
