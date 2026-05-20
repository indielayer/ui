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
pnpm lint:ui && pnpm test   # required before UI PRs
pnpm build:docs             # production docs build
pnpm changeset              # user-facing library changes (before merge)
```

From `packages/ui`:

```bash
pnpm gen:search             # regenerate docs search index
pnpm gen:llms               # regenerate public/llms.txt
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
