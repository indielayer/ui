<template>
  <document-page components="Notifications" :title="title" :description="description">
    <!-- usage  -->
    <h2 id="usage"><a href="#usage">#</a>Usage</h2>
    <code-preview :code="snippets.usage">
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
      title: 'Notifications',
      description: 'Notifications',
      snippets: {
        usage: UsageSnippetCode,
      },
    }
  },
}
</script>
