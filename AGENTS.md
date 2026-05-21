# Indielayer UI — Agent guide

Vue 3 component library (`@indielayer/ui`) in a pnpm monorepo. Primary package: `packages/ui`.

## Requirements

- Node.js 24+
- pnpm 11+ (use `pnpm`, not npm/yarn)

## Commands

From the repo root:

```bash
pnpm i
pnpm dev                    # docs + component dev (packages/ui)
pnpm lint:ui && pnpm test   # required before UI PRs (CI enforces this)
pnpm build:docs             # production docs build
pnpm changeset              # user-facing library changes (before merge)
```

### Linting (required)

- **CI**: `.github/workflows/pr_check.yml` runs `pnpm lint:ui` and `pnpm lint:style` on every PR.
- **Pre-commit**: `lint-staged` runs `eslint --cache --fix` on staged `*.{js,ts,vue}` (via `simple-git-hooks`; enabled after `pnpm i`).
- **Agents / editors**: After editing files, run ESLint on touched paths before finishing:

  ```bash
  pnpm eslint --cache --fix --ext .js,.ts,.vue packages/ui/docs   # docs example
  pnpm lint:ui   # must exit 0 before merge
  ```

- **VS Code**: `.vscode/settings.json` enables ESLint fix-on-save when the ESLint extension is installed.

From `packages/ui`:

```bash
pnpm gen:search             # regenerate docs search index
pnpm gen:llms               # regenerate public/llms.txt
pnpm gen:sitemap            # regenerate public/sitemap.xml
```

## Conventions

- Commits: [.github/COMMIT_CONVENTION.md](.github/COMMIT_CONVENTION.md)
- Do not edit `packages/ui/lib/` or other build output
- User-facing `packages/ui` changes need a changeset: `pnpm changeset`

## AI configuration

| Path | Purpose |
|------|---------|
| [.cursor/rules/](.cursor/rules/) | Always-on and file-scoped coding rules |
| [.cursor/skills/](.cursor/skills/) | Workflows: new component, themes, docs, release |
| [packages/ui/public/llms.txt](packages/ui/public/llms.txt) | LLM index for the docs site ([spec](https://llmstxt.org/)) |
| [packages/ui/public/llms-full.txt](packages/ui/public/llms-full.txt) | Full library reference (large; update manually when APIs change) |

## Reference implementation

`packages/ui/src/components/button/` — component, themes, tests, and docs patterns.
