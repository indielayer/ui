<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import { useDocMeta } from '../../composables/useDocMeta'

const props = defineProps({
  components: {
    type: [Array, String],
    default: () => [],
  },
  title: String,
  description: String,
  back: String,
  github: String,
  next: String,
  demos: {
    type: Array,
    default: () => [],
  },
})

const route = useRoute()

useDocMeta({
  title: props.title || 'Component',
  description: props.description,
  path: route.path,
})

const headers = [
  { text: 'Name', value: 'name' },
  { text: 'Description', value: 'description' },
  { text: 'Type', value: 'type' },
  { text: 'Default', value: 'default' },
  { text: 'Values', value: 'validator' },
  { text: 'Required', value: 'required' },
]

const headersSimple = [
  { text: 'Name', value: 'name' },
  { text: 'Description', value: 'description' },
]

function mapDocEntries(source: Record<string, unknown> | undefined) {
  if (!source || typeof source !== 'object') return []

  return Object.keys(source).map((name) => {
    const value = source[name]
    const description = typeof value === 'string'
      ? value
      : (value && typeof value === 'object' && 'description' in value
        ? String((value as { description?: unknown; }).description || '')
        : '')

    return { name, description }
  })
}

const componentsProperties = computed(() => {
  if (!props.components) return null
  const components = Array.isArray(props.components) ? props.components : [props.components]
  const properties: Record<string, Record<string, unknown[]>> = {}

  components.forEach((comp: any) => {
    const componentName = comp.name.slice(1)
    let allValidators = {}
    let allProps = {}

    if (comp.mixins) comp.mixins.forEach((m) => {
      allValidators = {
        ...allValidators,
        ...m.validators,
      }
      allProps = {
        ...allProps,
        ...m.props,
      }
    })

    allValidators = {
      ...allValidators,
      ...comp.validators,
    }

    allProps = {
      ...allProps,
      ...comp.props,
    }

    properties[componentName] = properties[componentName] || {}

    if (Object.keys(allProps).length > 0) {
      const mappedProps = Object.keys(allProps).map((key) => {
        const propDef = allProps[key]
        const propFrom = propDef?.type ?? propDef
        let propDefault = propDef?.default
        let propType = []

        if (Array.isArray(propFrom)) {
          propType = propFrom.map((type) => type.name)
        } else {
          propType = [propFrom.name]
          if (propFrom.name === 'Boolean' && propDefault === undefined) propDefault = false
        }

        return {
          name: key,
          description: typeof propDef?.description === 'string' ? propDef.description : '',
          default: propDefault,
          required: propDef?.required,
          validator: allValidators[key],
          type: propType,
        }
      })

      properties[componentName].props = mappedProps
    }

    const docs = comp.docs || {}
    const slotDocs = mapDocEntries(docs.slots)
    const methodDocs = mapDocEntries(docs.methods)
    const emitDocs = docs.emits || {}

    if (slotDocs.length > 0) {
      properties[componentName].slots = slotDocs
    } else if (comp.slots) {
      properties[componentName].slots = Object.keys(comp.slots).map((k) => ({ name: k, description: '' }))
    }

    if (comp.emits) {
      const emitNames = Array.isArray(comp.emits) ? comp.emits : Object.keys(comp.emits)

      properties[componentName].emits = emitNames.map((name: string) => ({
        name,
        description: typeof emitDocs[name] === 'string'
          ? emitDocs[name]
          : (emitDocs[name]?.description || ''),
      }))
    } else if (Object.keys(emitDocs).length > 0) {
      properties[componentName].emits = mapDocEntries(emitDocs)
    }

    if (methodDocs.length > 0) {
      properties[componentName].methods = methodDocs
    } else if (comp.expose) {
      properties[componentName].methods = comp.expose.map((k: string) => ({ name: k, description: '' }))
    } else if (comp.methods) {
      properties[componentName].methods = Object.keys(comp.methods).map((k) => ({ name: k, description: '' }))
    }
  })

  return properties
})

const backTo = computed(() => (props.back ? `/component/${props.back}` : null))
const nextTo = computed(() => (props.next ? `/component/${props.next}` : null))
</script>

<template>
  <div class="document-page docs-container w-full">
    <div class="flex items-start justify-between gap-4">
      <div class="min-w-0">
        <h1 class="text-4xl font-semibold">
          {{ title }}
          <x-tooltip>
            <x-link :href="`${github}/index.vue`" target="_blank" color="#94a3b8">
              <x-icon icon="edit" size="sm" />
            </x-link>
            <template #tooltip>
              Edit on <span class="text-gray-300">GitHub</span>
            </template>
          </x-tooltip>
        </h1>
        <div class="text-lg my-2 text-gray-500 dark:text-gray-400">{{ description }}</div>
      </div>
      <docs-copy-page class="mt-1"/>
    </div>
    <div class="mt-6 space-y-12">
      <slot></slot>

      <div v-for="demo in demos" :key="demo.name" class="demo-block">
        <code-preview
          :title="demo.name"
          :description="demo.description"
          :code="demo.code"
          :github="github"
        >
          <component :is="demo.component" />
        </code-preview>
      </div>

      <div v-if="componentsProperties">
        <h2 id="api" class="!text-2xl !mt-4"><a class="anchor" href="#api">#</a>API</h2>

        <section
          v-for="(component, componentName) in componentsProperties"
          :key="componentName"
        >
          <h3
            :id="String(componentName).toLowerCase()"
            class="mt-10 dark:text-gray-300 text-gray-800 text-2xl border-b-2 dark:border-gray-600 pb-2"
          >
            {{ componentName }}
          </h3>
          <div
            v-for="(properties, propertyName) in component"
            :key="propertyName"
          >
            <div>
              <h4
                :id="`${String(componentName).toLowerCase()}-${propertyName}`"
                class="mt-6 mb-2 text-gray-800 dark:text-gray-300 text-xl capitalize"
              >
                {{ propertyName }}
              </h4>

              <div class="text-sm font-light">
                <x-table
                  :headers="propertyName === 'props' ? headers : headersSimple"
                  :items="properties"
                >
                  <template #item-name="{ item }">
                    <div class="text-primary-500">{{ item.name }}</div>
                  </template>
                  <template #item-description="{ item }">
                    <div class="text-secondary-600 dark:text-secondary-400">{{ item.description }}</div>
                  </template>
                  <template #item-type="{ item }">
                    <div v-for="t in item.type" :key="t">{{ t }}</div>
                  </template>
                  <template #item-required="{ item }">
                    <div>{{ item.required ? 'true' : '' }}</div>
                  </template>
                  <template #item-validator="{ item }">
                    <div class="space-x-2">
                      <span v-for="validator in item.validator" :key="validator">{{ validator }}</span>
                    </div>
                  </template>
                </x-table>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>

    <div v-if="backTo || nextTo" class="flex my-12 pt-8 border-t dark:border-gray-700">
      <x-button
        v-if="backTo"
        :to="backTo"
        outlined
        class="capitalize"
        icon-left="arrow-left"
      >{{ back }}</x-button>
      <x-spacer/>
      <x-button
        v-if="nextTo"
        :to="nextTo"
        outlined
        class="capitalize"
        icon-right="arrow-right"
      >{{ next }}</x-button>
    </div>
  </div>
</template>

<style>
.document-page h1,
.document-page h2,
.document-page h3 {
  position: relative;
}

.document-page h2 {
  font-size: var(--text-xl);
  font-weight: 600;
  line-height: var(--text-xl--line-height);
  margin-bottom: 1rem;
  margin-top: 2rem;
}

.document-page h1 .anchor,
.document-page h2 .anchor,
.document-page h3 .anchor {
  position: absolute;
  left: -24px;
  width: 30px;
  display: none;
  color: #96a1b3 !important;
}

.document-page h1:hover .anchor,
.document-page h2:hover .anchor,
.document-page h3:hover .anchor {
  display: block;
}
</style>
