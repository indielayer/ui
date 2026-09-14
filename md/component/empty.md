# Empty
Empty states communicate when there is no content to show. Use them in tables, lists, and panels with a title, description, optional icon, and actions.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| bordered | Boolean |  | Adds a border around the empty state. |
| description | String |  | Supporting text shown below the title. |
| icon | String | emptyIcon | Icon name shown above the title. |
| size | String Size | md | Control size. One of xs, sm, md, lg, xl. |
| title | String |  | Primary empty-state heading. |

### Slots
- `actions`: Action controls shown below the description.
- `default`
- `description`: Custom description content; overrides the `description` prop.
- `icon`: Custom icon; overrides the `icon` prop.
- `title`: Custom title content; overrides the `title` prop.

### Events
- _(none)_

### Demos
#### Usage
```vue
<template>
  <x-empty
    title="No items yet"
    description="Get started by creating your first item."
  />
</template>
```

#### Actions
```vue
<template>
  <x-empty
    title="No results found"
    description="Try adjusting your filters or search terms."
  >
    <template #actions>
      <x-button color="primary">Clear filters</x-button>
      <x-button ghost>Learn more</x-button>
    </template>
  </x-empty>
</template>
```

#### Bordered
```vue
<template>
  <x-empty
    bordered
    title="Nothing here"
    description="This area is empty. Add content to get started."
  />
</template>
```

HTML docs: https://indielayer.com/component/empty
