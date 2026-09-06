---
name: component-theme
description: Edit or add component theme classes and styles for shipped theme variants (base, carbon). Use when changing component appearance, Tailwind classes, theme tokens, Divider/Button themes, or files matching *.theme.ts. To add a new shipped theme pack, use the add-theme skill.
disable-model-invocation: true
---

# Component theme

## Files

For component `<Name>`, one file per shipped theme id (currently `base`, `carbon`):

- `theme/<Name>.<id>.theme.ts`

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

Export in every `packages/ui/src/themes/<id>/components.ts` (currently `base`, `carbon`).

Key must match the name used in `useTheme('<Name>', ...)`.

## Sync variants

When changing layout, states, or tokens in one variant, apply the same logical change to the others unless a design is intentionally different.

Reference: `packages/ui/src/components/button/theme/Button.base.theme.ts`

## App-level `defaults`

Variant/layout booleans that should respect `app.use(UI, { defaults })` must use `optionalBooleanProp()` from `packages/ui/src/common/props.ts` (not plain `Boolean`). Use `useResolvedComponentProps` when the template or script reads those props outside `useTheme`.
