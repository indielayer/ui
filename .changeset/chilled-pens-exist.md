---
"@indielayer/ui": patch
---

fix(popover): flatten nested CSS selectors

Popover and Scroll SFC styles used nested `&` rules that postcss without tailwindcss/nesting does not compile, which left floating poppers at opacity 0. Flatten selectors so styles work in TW4 apps and the lib build.
