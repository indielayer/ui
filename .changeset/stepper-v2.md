---
"@indielayer/ui": minor
---

feat(stepper)!: rebuild as multi-step wizard with named slots and navigation API

BREAKING CHANGE: `XStepper` no longer uses manual `status` or `label` on steps. Use `value`, `title`, named panel slots (`#stepId`), optional `#summary-stepId` slots, and exposed `next()` / `prev()` / `goTo()` / `reset()` methods. `v-model` is the active step `value` (string or number), not a numeric index.
