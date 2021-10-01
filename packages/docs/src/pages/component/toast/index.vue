<template>
  <document-page components="Toast" :title="title" :description="description">
    <!-- usage  -->
    <h2 id="usage"><a href="#usage">#</a>Usage</h2>
    <code-preview :code="snippets.usage" expanded>
      <usage-snippet />
    </code-preview>

  </document-page>
</template>

<script>
import UsageSnippetCode from './-snippets/usage.vue?raw'
import UsageSnippet from './-snippets/usage.vue'

export default {
  components: {
    UsageSnippet,
  },
  data() {
    return {
      title: 'Toast',
      description: 'Toast',
      snippets: {
        usage: UsageSnippetCode,
      },
    }
  },
}
</script>
