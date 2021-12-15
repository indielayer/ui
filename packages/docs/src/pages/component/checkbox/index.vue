<template>
  <document-page components="Checkbox" :title="title" :description="description">
    <!-- usage  -->
    <h2 id="usage"><a href="#usage">#</a>Usage</h2>
    <code-preview :code="snippets.usage" expanded>
      <usage-snippet />
    </code-preview>

    <h2 id="variants"><a href="#variants">#</a>Variants</h2>
    <code-preview :code="snippets.variants">
      <variants-snippet />
    </code-preview>

    <h2 id="states"><a href="#states">#</a>States</h2>
    <code-preview :code="snippets.states">
      <states-snippet />
    </code-preview>
  </document-page>
</template>

<script>
import UsageSnippetCode from './-snippets/usage.vue?raw'
import UsageSnippet from './-snippets/usage.vue'
import StatesSnippetCode from './-snippets/states.vue?raw'
import StatesSnippet from './-snippets/states.vue'
import VariantsSnippetCode from './-snippets/variants.vue?raw'
import VariantsSnippet from './-snippets/variants.vue'

export default {
  components: {
    UsageSnippet,
    StatesSnippet,
    VariantsSnippet,
  },
  data() {
    return {
      title: 'Checkbox',
      description: 'Checkbox',
      snippets: {
        usage: UsageSnippetCode,
        states: StatesSnippetCode,
        variants: VariantsSnippetCode,
      },
    }
  },
}
</script>
