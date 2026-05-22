---
name: add-component
description: Add a new Vue component to @indielayer/ui with themes, tests, docs, and registry exports. Use when creating a new component, adding X-prefixed components, or scaffolding under packages/ui/src/components.
disable-model-invocation: true
---

# Add component

## Scaffold

Create `packages/ui/src/components/<name>/`:

- `<Name>.vue` — plain `<script lang="ts">` for props/types/`name: 'X<Name>'`, `<script setup>` for logic
- `index.ts` — `export { default as X<Name> }` and prop/theme types
- `theme/<Name>.base.theme.ts` and `theme/<Name>.carbon.theme.ts`
- `__tests__/<Name>.spec.ts`

## Register

1. `packages/ui/src/components/index.ts`
2. `packages/ui/src/themes/base/components.ts`
3. `packages/ui/src/themes/carbon/components.ts`

## Docs (if user-facing)

Follow the `docs-page` skill: `docs/pages/component/<name>/`.

## Verify

From repo root:

```bash
pnpm lint:ui
pnpm test:ci
```

Reference: `packages/ui/src/components/button/`
