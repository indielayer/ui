<template>
  <div>
    <section class="p-4 lg:p-8 max-w-4xl xl:max-w-7xl mx-auto">
      <h2 class="text-4xl font-semibold">Icons</h2>
      <h1 class="text-lg my-2 text-gray-500 dark:text-gray-400">Building your own SVG icon library from multiple open source libraries</h1>
      <x-divider class="mt-4 mb-8"/>

      <p class="text-xl mt-8 my-4">SVG Icon Libraries - MIT License</p>
      <div class="font-bold text-lg">
        <ul>
          <li><x-link external href="https://feathericons.com/" target="_blank">Feather Icons</x-link></li>
          <li><x-link external href="https://heroicons.com/" target="_blank">Hero Icons</x-link></li>
          <li><x-link external href="https://tabler-icons.io/" target="_blank">Tabler Icons</x-link></li>
        </ul>
      </div>

      <h3 class="text-2xl mt-8 mb-4">1. Create the icons library <strong>plugins/icons.js</strong></h3>
      <code-snippet
        :code="iconExample"
      />
      <h3 class="text-2xl mt-8 mb-4">2. Add icons from open source libraries</h3>
      <p class="mb-2 text-xl">Start adding the icons you need without the svg wrapper, copy only the content part of the SVG:</p>
      <p class="mb-4 border dark:border-gray-600 rounded-md p-4">&#x3C;svg xmlns=&#x22;http://www.w3.org/2000/svg&#x22; width=&#x22;24&#x22; height=&#x22;24&#x22; viewBox=&#x22;0 0 24 24&#x22; fill=&#x22;none&#x22; stroke=&#x22;currentColor&#x22; stroke-width=&#x22;2&#x22; stroke-linecap=&#x22;round&#x22; stroke-linejoin=&#x22;round&#x22; class=&#x22;feather feather-check&#x22;&#x3E;<strong>&#x3C;polyline points=&#x22;20 6 9 17 4 12&#x22;&#x3E;&#x3C;/polyline&#x3E;</strong>&#x3C;/svg&#x3E;</p>
      <code-snippet :code="iconExample1"/>

      <div class="my-4">
        Icon "check" <x-icon icon="check"/>
      </div>
      <code-snippet :code="iconExample2"/>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      iconExample: `// plugins/icons.js
import { injectIconsKey } from '@indielayer/ui'

export default {
  install: (app) => {
    // inject icons globally
    app.provide(injectIconsKey, {
      // icons
    })
  }
}`,
      iconExample1: `// plugins/icons.js
import { injectIconsKey } from '@indielayer/ui'

export default {
  install: (app) => {
    // inject icons globally
    app.provide(injectIconsKey, {
      check: '<polyline points="20 6 9 17 4 12"></polyline>',
    })
  }
}

// main.js
import { createApp } from 'vue'
import icons from './plugins/icons'

const app = createApp(App)

app.use(icons)
`,
      iconExample2: `<template>
  <x-icon icon="check" />
</template>
`,
    }
  },
}
</script>
