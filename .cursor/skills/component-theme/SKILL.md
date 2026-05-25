---
name: component-theme
description: Edit or add component theme classes and styles for base and carbon variants. Use when changing component appearance, Tailwind classes, theme tokens, Divider/Button themes, or files matching *.theme.ts.
disable-model-invocation: true
---

# Component theme

## Files

For component `<Name>`:

- `theme/<Name>.base.theme.ts`
- `theme/<Name>.carbon.theme.ts`

Import `*Theme` from `../<Name>.vue`.

## Structure

```ts
const theme: ButtonTheme = {
  classes: {
    wrapper({ props, slots, data }) { return ['...'] },
  },
  styles({ props, colors, css, data }) { /* CSS variables */ },
}
export default theme
```

## Register

Export in both:

- `packages/ui/src/themes/base/components.ts`
- `packages/ui/src/themes/carbon/components.ts`

Key must match the theme name used in `useTheme('<Name>', ...)`.

## Sync variants

When changing layout, states, or tokens in one variant, apply the same logical change to the other unless the carbon design intentionally differs.

Reference: `packages/ui/src/components/button/theme/Button.base.theme.ts`

## App-level `defaults`

Variant/layout booleans that should respect `app.use(UI, { defaults })` must use `optionalBooleanProp()` from `packages/ui/src/common/props.ts` (not plain `Boolean`). Use `useResolvedComponentProps` when the template or script reads those props outside `useTheme`.
