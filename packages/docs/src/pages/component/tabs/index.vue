<template>
  <document-page :components="['Tabs', 'Tab']" :title="title" :description="description" >
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
      title: 'Tabs',
      description: 'Tabs',
      snippets: {
        usage: UsageSnippetCode,
      },
    }
  },
}
</script>
