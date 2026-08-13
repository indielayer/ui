<script setup lang="ts">
import { XTooltip, XToggleTip } from '@indielayer/ui'
import UsageDemoCode from './usage.vue?raw'
import UsageDemo from './usage.vue'
import ContentDemoCode from './content.vue?raw'
import ContentDemo from './content.vue'
import PlacementDemoCode from './placement.vue?raw'
import PlacementDemo from './placement.vue'
import ToggleTipDemoCode from './toggle-tip.vue?raw'
import ToggleTipDemo from './toggle-tip.vue'
import StatesDemoCode from './states.vue?raw'
import StatesDemo from './states.vue'

const title = 'Tooltip'
const description = 'Tooltips display contextual help on hover. Use XToggleTip for a compact info-icon pattern beside labels.'
const components = [XTooltip, XToggleTip]
const demos = [{
  name: 'Usage',
  description: 'Short hint via the tooltip prop on icon buttons.',
  code: UsageDemoCode,
  component: UsageDemo,
}, {
  name: 'Content',
  description: 'Title and body using the tooltip slot.',
  code: ContentDemoCode,
  component: ContentDemo,
}, {
  name: 'Placement',
  description: 'top, bottom, left, and right positions.',
  code: PlacementDemoCode,
  component: PlacementDemo,
}, {
  name: 'Toggle tip',
  description: 'Info icon with helper text for labels and form fields.',
  code: ToggleTipDemoCode,
  component: ToggleTipDemo,
}, {
  name: 'States',
  description: 'Disabled tooltips do not open on hover.',
  code: StatesDemoCode,
  component: StatesDemo,
}]
const back = 'tag'
const next = 'upload'
</script>

<template>
  <document-page
    github="https://github.com/indielayer/ui/blob/main/packages/ui/docs/pages/component/tooltip"
    :title="title"
    :description="description"
    :components="components"
    :demos="demos"
    :back="back"
    :next="next"
  />
</template>
