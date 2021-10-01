<template>
  <document-page components="Divider" :title="title" :description="description">
    <!-- usage  -->
    <h2 id="usage"><a href="#usage">#</a>Usage</h2>
    <code-preview :code="snippets.usage" expanded>
      <usage-snippet />
    </code-preview>

    <!-- vertical  -->
    <h2 id="vertical"><a href="#vertical">#</a>Vertical</h2>
    <code-preview :code="snippets.vertical">
      <vertical-snippet />
    </code-preview>

    <!-- usage  -->
    <h2 id="label"><a href="#label">#</a>Label</h2>
    <code-preview :code="snippets.label">
      <label-snippet />
    </code-preview>

  </document-page>
</template>

<script>
import UsageSnippetCode from './-snippets/usage.vue?raw'
import UsageSnippet from './-snippets/usage.vue'
import LabelSnippetCode from './-snippets/label.vue?raw'
import LabelSnippet from './-snippets/label.vue'
import VerticalSnippetCode from './-snippets/vertical.vue?raw'
import VerticalSnippet from './-snippets/vertical.vue'

export default {
  components: {
    UsageSnippet,
    LabelSnippet,
    VerticalSnippet,
  },
  data() {
    return {
      title: 'Divider',
      description: 'Divider',
      snippets: {
        usage: UsageSnippetCode,
        vertical: VerticalSnippetCode,
        label: LabelSnippetCode,
      },
    }
  },
}
</script>
