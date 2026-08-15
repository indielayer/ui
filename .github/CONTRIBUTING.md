# Contributing Guide

Hi! I'm really excited that you are interested in contributing. Before submitting your contribution, please make sure to take a moment and read through the following guidelines:

- [Code of Conduct](https://github.com/indielayer/ui/blob/dev/.github/CODE_OF_CONDUCT.md)

## Pull Request Guidelines

- All development should be done in dedicated branches.

- Checkout a topic branch from the relevant branch, e.g. `feat/xyz`, and merge back against that branch.

- It's OK to have multiple small commits as you work on the PR - GitHub will automatically squash it before merging.

- Follow and fill the PR template.

## Development Setup

You will need [Node.js](http://nodejs.org) **version 24+** and [pnpm](https://pnpm.io/) **>=11**.

After cloning the repo, run:

``` bash
$ pnpm i # install the dependencies of the project
```

### Committing Changes

Commit messages should follow the [commit message convention](./COMMIT_CONVENTION.md) so that changelogs can be automatically generated. Commit messages will be automatically validated upon commit. If you are not familiar with the commit message convention, you can use `npm run commit` instead of `git commit`, which provides an interactive CLI for generating proper commit messages.

### Commonly used NPM scripts

``` bash
# watch and auto re-build ui
$ pnpm dev

# build all dist files
$ pnpm build
```

### Working with AI

Contributors using Cursor or other coding agents should read [AGENTS.md](../AGENTS.md) at the repo root. Project rules live in `.cursor/rules/`; workflows for new components, themes, docs, and releases are in `.cursor/skills/`.

The docs site publishes [llms.txt](https://indielayer.com/llms.txt), [llms-full.txt](https://indielayer.com/llms-full.txt), and per-component markdown under `/md/component/` for LLM-friendly navigation; regenerate with `cd packages/ui && pnpm gen:llms` after adding component documentation. Docs HTML is prerendered with `vite-ssg` via `pnpm build:docs`.
