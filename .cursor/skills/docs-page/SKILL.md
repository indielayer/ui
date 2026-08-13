---
name: docs-page
description: Create or update component documentation pages in packages/ui/docs. Use when adding docs, demos, DocumentPage, usage.vue, or component doc routes.
disable-model-invocation: true
---

# Docs page

## Add route

Create `packages/ui/docs/pages/component/<name>/index.vue`:

- `const title`, `const description`, `const demos`, `const components`
- Import demos and `?raw` code for `<document-page>`
- Set `back` / `next` to sibling folder names (lowercase)
- Demos use kebab-case: `<x-button>`

Add demo SFCs alongside (`usage.vue`, `variants.vue`, …).

## Regenerate indexes

From `packages/ui`:

```bash
pnpm gen:search
pnpm gen:llms   # also writes public/llms-full.txt
```

## Verify

```bash
pnpm dev
```

Reference: `packages/ui/docs/pages/component/button/index.vue`
