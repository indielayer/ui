# Loader
Full-area loading overlay that blocks interaction while content or an action completes. Use Loader when the whole region should wait before continuing.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| icon | String |  | Custom spinner icon when status is `active`. |
| label | String |  | Optional text shown next to the status icon. |
| size | String Size | md | Control size. One of xs, sm, md, lg, xl. |
| status | String LoaderStatus | active | Visual status (active spinner, success, or error). Values: active, success, error. |

### Slots
- _(none)_

### Events
- _(none)_

### Demos
#### Usage
```vue
<template>
  <div class="grid gap-4">
    <x-loader label="Loading" status="active"/>
    <x-loader label="Failed to load" status="error"/>
    <x-loader label="Loaded" status="success"/>
  </div>
</template>
```

HTML docs: https://indielayer.com/component/loader
