---
name: add-theme
description: Add a new shipped UITheme pack (like Base or Carbon) to @indielayer/ui. Use when creating a new theme variant, theme pack, or files under packages/ui/src/themes/.
disable-model-invocation: true
---

# Add theme

Shipped library theme exported from `@indielayer/ui`. Not for app-only overrides (`app.use(UI, { theme: { ...BaseTheme, colors } })`).

Shipped today: `BaseTheme`, `CarbonTheme`. Edit appearance with the `component-theme` skill.

## Naming

| Piece | Convention | Example |
|-------|------------|---------|
| Folder / file infix | lowercase id | `themes/carbon/`, `Button.carbon.theme.ts` |
| Public export | PascalCase + `Theme` | `CarbonTheme` |
| `UITheme.name` | display string | `'Carbon'` (docs switcher + `data-theme-style`) |

Keep `classPrefix: 'x-'` unless the user asks to change it.

## Scaffold

Copy the Carbon layout (`packages/ui/src/themes/carbon/`):

```
packages/ui/src/themes/<id>/
  index.ts         # UITheme object
  components.ts    # one export per themed component (same keys as base)
  styles.ts        # global CSS string
```

`index.ts`:

```ts
import type { UITheme } from '../../theme'
import * as components from './components'
import styles from './styles'

const theme: UITheme = {
  name: 'Material',
  styles,
  classPrefix: 'x-',
  components,
  // optional: colors: { primary: { 50: '#…', /* … */ 950: '#…' } },
  // optional: rtl: true,
}

export default theme
```

### Component files

For every `*.base.theme.ts`, add `theme/<Name>.<id>.theme.ts`. Start by aliasing Base, then customize:

```ts
import type { ButtonTheme } from '../Button.vue'
import BaseTheme from './Button.base.theme'

const theme: ButtonTheme = BaseTheme
export default theme
```

Partial override (spread or keep `styles`):

```ts
const theme: BreadcrumbsTheme = {
  classes: {
    ...BaseTheme.classes,
    wrapper: 'flex items-center flex-wrap text-sm',
  },
}
```

**Register every `ComponentThemes` key.** Components call `useTheme('<Name>', {}, props)` — empty defaults — so a missing key renders unstyled. Copy `themes/base/components.ts` and point each export at the new `*.<id>.theme.ts`.

### `styles.ts`

Copy `themes/base/styles.ts` or `themes/carbon/styles.ts`. Keep:

- `@layer base` rules for `html`, `html.dark`, `*`, `.dark`
- `:root` RGB triplets (`--primary-color-50: 236, 253, 245` — not `rgb()`)
- semantic scales: primary, secondary, success, warning, error (`50`–`950`)
- `--font-family-sans` / `--font-family-mono` / `--border-color`

Fonts are the usual first change (Carbon uses IBM Plex).

`theme.colors` (JS palettes for `color="primary"`) is independent of `--*-color-*` in `styles.ts` and of Tailwind `@theme` in the app stylesheet. Align all three when the user wants a consistent primary.

## Register

1. `packages/ui/src/themes/index.ts` — `export { default as <Id>Theme } from './<id>'`
2. Docs live preview — `packages/ui/docs/App.vue` `themes` array (toolbar select is **dev-only**)
3. Public docs if the theme is user-facing:
   - `packages/ui/docs/pages/index.vue` (install snippets)
   - `packages/ui/docs/components/common/DocsFeatures.vue` (feature blurb)
   - `packages/ui/.scripts/llms-full-preamble.md` then `pnpm gen:llms` from `packages/ui`
4. Do **not** change `exports/nuxt.plugin.js` or `packages/create-ui` templates unless making this the default
5. Changeset (`feat`) — user-facing export

## Keep agent files in sync

Append `<id>` wherever shipped themes are listed:

- `.cursor/skills/add-component/SKILL.md`
- `.cursor/skills/component-theme/SKILL.md`
- `.cursor/rules/themes.mdc`
- `.cursor/rules/vue-components.mdc`

## Verify

```bash
pnpm lint:ui
pnpm typecheck
pnpm test:ci
pnpm dev   # docs toolbar → theme select (DEV)
```

Exercise a few components (Button, Input, Modal) in light and `html.dark`. Tests inject `BaseTheme`; add theme-specific tests only if asserting unique class output.

Reference: `packages/ui/src/themes/carbon/` and `packages/ui/src/components/button/theme/`
