<template>
  <h2 class="text-4xl font-semibold">Icons</h2>
  <h1 class="text-lg my-2 text-gray-500 dark:text-gray-400">Building your own SVG icon library from multiple open source libraries</h1>
  <x-divider class="mt-4 mb-8"/>

  <p class="text-xl mt-8 my-4">SVG Icon Libraries</p>
  <div class="font-bold text-lg">
    <ul>
      <li><x-link
        external
        color="sky"
        underline
        href="https://icones.js.org/"
        target="_blank"
      >Icônes - All the libraries</x-link></li>
      <li><x-link
        external
        color="sky"
        underline
        href="https://heroicons.com/"
        target="_blank"
      >Hero Icons (MIT)</x-link></li>
      <li><x-link
        external
        color="sky"
        underline
        href="https://tabler-icons.io/"
        target="_blank"
      >Tabler Icons (MIT)</x-link></li>
      <li><x-link
        external
        color="sky"
        underline
        href="https://feathericons.com/"
        target="_blank"
      >Feather Icons (MIT)</x-link></li>
    </ul>
  </div>

  <h3 class="text-2xl mt-8 mb-4">1. Create the icons file -> <strong>icons.js</strong></h3>
  <code-snippet
    lang="js"
    :code="iconExample"
  />

  <h3 class="text-2xl mt-8 mb-4">2. Add icons on UI install options -> <strong>main.js</strong></h3>
  <code-snippet
    lang="js"
    :code="installExample"
  />

  <h3 class="text-2xl mt-8 mb-4">3. Add icons from open source libraries</h3>
  <p class="mb-2 text-xl">Start adding the icons you need.</p>
  <p class="mb-2">SVG wrapper optional, copy only the content part of the SVG:</p>
  <p class="mb-4 border dark:border-gray-600 rounded-md p-4">&#x3C;svg xmlns=&#x22;http://www.w3.org/2000/svg&#x22; width=&#x22;24&#x22; height=&#x22;24&#x22; viewBox=&#x22;0 0 24 24&#x22; fill=&#x22;none&#x22; stroke=&#x22;currentColor&#x22; stroke-width=&#x22;2&#x22; stroke-linecap=&#x22;round&#x22; stroke-linejoin=&#x22;round&#x22; class=&#x22;feather feather-check&#x22;&#x3E;<strong>&#x3C;polyline points=&#x22;20 6 9 17 4 12&#x22;&#x3E;&#x3C;/polyline&#x3E;</strong>&#x3C;/svg&#x3E;</p>
  <code-snippet lang="js" :code="iconExample1"/>

  <div class="my-4">
    Icon "check" <x-icon icon="check"/>
  </div>
  <code-snippet lang="js" :code="iconExample2"/>
</template>

<script>
export default {
  data() {
    return {
      iconExample: `// icons.js
export default {
  check: '<polyline points="20 6 9 17 4 12"></polyline>'
}`,
      installExample: `// main.js
import { createApp } from 'vue'
import UI from '@indielayer/ui'
import icons from './icons'

const app = createApp(App)

app.use(UI, {
  icons,
})`,
      iconExample1: `// icons.js
export default {
  check: '<polyline points="20 6 9 17 4 12"></polyline>',
  // or
  check2: {
    icon: '<polyline points="20 6 9 17 4 12"></polyline>',
    viewBox: '0 0 24 24', // default
    filled: false, // default
  },
  // or
  check3: '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="feather feather-check"><polyline points="20 6 9 17 4 12"></polyline></svg>'
}`,
      iconExample2: `<template>
  <x-icon icon="check" />
</template>
`,
    }
  },
}
</script>
