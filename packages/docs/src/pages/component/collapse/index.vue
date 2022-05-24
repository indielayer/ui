<template>
  <document-page components="Collapse" :title="title" :description="description">
    <!-- usage  -->
    <h2 id="usage"><a href="#usage">#</a>Usage</h2>
    <code-preview :code="snippets.usage">
      <usage-snippet />
    </code-preview>

    <!-- usage  -->
    <h2 id="expanded"><a href="#expanded">#</a>Expanded</h2>
    <code-preview :code="snippets.expanded">
      <expanded-snippet />
    </code-preview>

  </document-page>
</template>

<script>
import UsageSnippetCode from './-snippets/usage.vue?raw'
import UsageSnippet from './-snippets/usage.vue'
import ExpandedSnippetCode from './-snippets/expanded.vue?raw'
import ExpandedSnippet from './-snippets/expanded.vue'

export default {
  components: {
    UsageSnippet,
    ExpandedSnippet,
  },
  data() {
    return {
      title: 'Collapse',
      description: 'Collapse',
      snippets: {
        usage: UsageSnippetCode,
        expanded: ExpandedSnippetCode,
      },
    }
  },
}
</script>
