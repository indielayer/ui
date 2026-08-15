---
name: docs-page
description: Create or update component documentation pages in packages/ui/docs. Use when adding docs, demos, DocumentPage, usage.vue, or component doc routes.
disable-model-invocation: true
---

# Docs page

## Add route

Create `packages/ui/docs/pages/component/<name>/index.vue`:

- `const title`, `const description`, `const demos`, `const components`
- **description**: factual 1–2 sentences (~120–180 chars) — what it is and when to use it; avoid generic filler
- Use double quotes for descriptions that contain apostrophes
- Every demo needs a short `description` (sentence case) explaining what the example shows
- Import demos and `?raw` code for `<document-page>`
- Set `back` / `next` to sibling folder names (preserve casing, e.g. `inputGroup`)
- Demos use kebab-case: `<x-button>`

Add demo SFCs alongside (`usage.vue`, `variants.vue`, …).

## Component API descriptions

Author API copy in the component SFC (not only on the docs page):

- Add `description` on each prop option object (and shared factories in composables / `variantBooleanProps`)
- On the plain `<script>` default export, add `docs: { slots, emits, methods }` string maps (same place as `validators`)
- Reference: `packages/ui/src/components/button/Button.vue`
- Live API tables read these via `DocumentPage`; `pnpm gen:llms` embeds them in `public/md/component/*.md`

## Regenerate indexes

From `packages/ui`:

```bash
pnpm gen:search
pnpm gen:llms   # writes llms.txt, llms-full.txt, and public/md/component/*.md
pnpm gen:sitemap
```

## Verify

```bash
pnpm build:docs   # vite-ssg prerender
pnpm dev
```

Reference: `packages/ui/docs/pages/component/button/index.vue`
