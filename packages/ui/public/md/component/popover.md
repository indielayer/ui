# Popover
Floating panel anchored to a trigger for extra content or actions. Use popovers for menus and contextual UI without leaving the current view.
### Props
| Name | Type | Default | Description |
|------|------|---------|-------------|
| autoHide | [Boolean, Function] | true | Hides on outside click, or a predicate deciding whether to hide. |
| autoSize | [Boolean, String] |  | Match popper size to the trigger (`true`), or only min/max width. |
| boundary | [String, Object] |  | Overflow boundary used for flip/shift positioning. |
| computeTransformOrigin | Boolean |  | Computes transform-origin for scale transitions. |
| container | [String, Object, Boolean] | body | Element that contains the floating popover DOM. |
| delay | [String, Number, Object] | 0 | Show/hide delay in ms, or `{ show, hide }`. |
| disabled | Boolean |  | Disables showing the popover. |
| distance | [Number, String] |  | Offset along the placement axis in pixels. |
| eagerMount | Boolean |  | Mounts popover content immediately instead of on first open. |
| handleResize | Boolean | true | Repositions when the popover content size changes. |
| hideArrow | Boolean | true | Hides the popover arrow. |
| hideTriggers | [Array, Function] |  | Events that hide the popover, or a function deriving them from `triggers`. |
| instantMove | Boolean |  | Skips transition when the popover moves between placements. |
| placement | String PopoverPlacement | bottom-start | Preferred placement relative to the trigger. |
| popperClass | [String, Array, Object] |  | Extra class(es) on the floating popover element. |
| popperHideTriggers | [Array, Function] |  | Events on the content that hide the popover. |
| popperShowTriggers | [Array, Function] |  | Events on the content that show the popover. |
| popperTriggers | Array Array<PopoverTriggerEvent> |  | Events on the popover content that keep it open. |
| positioningDisabled | Boolean |  | Keeps the popover in the DOM flow without floating positioning. |
| showTriggers | [Array, Function] |  | Events that show the popover, or a function deriving them from `triggers`. |
| shown | Boolean |  | Controlled open state. |
| skidding | [Number, String] |  | Offset along the trigger edge in pixels. |
| strategy | String 'absolute'  \|  'fixed' | absolute | CSS position strategy for the floating element. |
| triggers | Array Array<PopoverTriggerEvent> | [] | Events that toggle the popover (for example click, hover, focus). |

### Slots
- `content`: Popover panel content.
- `default`: Trigger element.

### Events
- `apply-hide`: Emitted after the hide transition is applied.
- `apply-show`: Emitted after the show transition is applied.
- `auto-hide`: Emitted when auto-hide closes the popover.
- `close-directive`: Emitted when closed via the close directive.
- `close-group`: Emitted when a popover group close is requested.
- `hide`: Emitted when the popover starts closing.
- `resize`: Emitted when popover content is resized.
- `show`: Emitted when the popover starts opening.
- `update:shown`: Emitted when open state changes.

### Methods
- `hide`: Hide the popover.
- `show`: Show the popover.
- `toggle`: Toggle open state.

### Demos
#### Usage
```vue
<script setup lang="ts">
import { ref } from 'vue'
import type { MenuArrayItem } from '@indielayer/ui'

const open = ref(false)

const items: MenuArrayItem[] = [{
  label: 'Edit',
  icon: 'edit',
  onClick: () => { open.value = false },
}, {
  label: 'Duplicate',
  icon: 'copy',
  onClick: () => { open.value = false },
}, {
  divider: true,
}, {
  label: 'Delete',
  icon: 'trash',
  color: 'error',
  onClick: () => { open.value = false },
}]
</script>

<template>
  <x-popover
    v-model:shown="open"
    placement="bottom-start"
  >
    <x-button icon-right="chevron-down">
      Actions
    </x-button>
    <template #content>
      <x-popover-container class="w-48 p-1.5">
        <x-menu
          size="sm"
          :items="items"
        />
      </x-popover-container>
    </template>
  </x-popover>
</template>
```

HTML docs: https://indielayer.com/component/popover
