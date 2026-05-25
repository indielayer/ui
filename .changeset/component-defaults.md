---
"@indielayer/ui": minor
---

Add `defaults` option on `UIOptions` for app-wide component prop defaults (e.g. `Alert: { outlined: true }`). Defaults merge in `useTheme` and via `useResolvedComponentProps` for template usage. Themed components use `optionalBooleanProp()` for variant/layout booleans so omitted props stay `undefined` and receive app defaults (Vue otherwise coerces plain `Boolean` to `false`).
