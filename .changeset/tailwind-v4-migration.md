---
"@indielayer/ui": major
---

Migrate to Tailwind CSS v4 with a CSS-first public API.

**Breaking changes**

- Peer dependency is now `tailwindcss@^4.0.0` (requires Safari 16.4+, Chrome 111+, Firefox 128+).
- Removed `@indielayer/ui/tailwind.preset` — use `@import "@indielayer/ui/tailwind.css"` in your app stylesheet instead.
- Configure content scanning with `@source` directives; JavaScript `tailwind.config.js` presets are no longer used.

**Migration**

1. Upgrade Tailwind and add `@tailwindcss/postcss` (Vite: `css.postcss.plugins`; Nuxt: `postcss.plugins`).
2. Replace `@tailwind` directives with `@import "tailwindcss"` and import `@indielayer/ui/tailwind.css`.
3. Add `@source` paths including `node_modules/@indielayer/ui/{lib,src}/**/*`.
4. Update renamed utilities (`shadow-sm` → `shadow-xs`, `flex-grow` → `grow`, `outline-none` → `outline-hidden`, etc.) if you copied v3 class names.

See the [Tailwind upgrade guide](https://tailwindcss.com/docs/upgrade-guide) and the docs getting-started page.
