---
"@indielayer/ui": patch
---

fix(input): forward undeclared HTML attributes to native form controls

Input, Textarea, Slider, Upload, Checkbox, Radio, RadioButton, and Toggle now bind leftover attributes (`autocomplete`, `aria-*`, `data-*`, `capture`, etc.) to their native input. `class`, `style`, and undeclared event listeners stay on the field wrapper.
