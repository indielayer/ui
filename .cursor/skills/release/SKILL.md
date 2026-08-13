---
name: release
description: Prepare @indielayer/ui changes for release with changesets and conventional commits. Use when versioning, publishing, changelog, semver, or before merging user-facing library changes.
disable-model-invocation: true
---

# Release workflow

## Changeset

For user-facing `packages/ui` changes:

```bash
pnpm changeset
```

Choose bump type (patch/minor/major) and write a short summary for the changelog.

## Commits

Follow [.github/COMMIT_CONVENTION.md](.github/COMMIT_CONVENTION.md):

- `feat(scope): ...` — minor bump, appears in changelog
- `fix(scope): ...` — patch bump
- `perf(scope): ...` — patch bump
- `docs`, `chore`, `test`, etc. — no version bump unless changeset added

Do not bump `packages/ui/package.json` version in the feature PR; Changesets handles release.

## Before merge

```bash
pnpm lint:ui
pnpm typecheck
pnpm test:ci
pnpm build
```

Ensure a changeset file exists under `.changeset/` for library changes.
