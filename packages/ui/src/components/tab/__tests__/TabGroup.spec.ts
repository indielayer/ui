import { describe, it, expect } from 'vitest'
import { defineComponent, h, nextTick } from 'vue'
import { mount } from '@vue/test-utils'
import TabGroup from '../TabGroup.vue'
import Tab from '../Tab.vue'

describe('TabGroup', () => {
  it('renders without errors', () => {
    const wrapper = mount(TabGroup)

    expect(wrapper.vm).toBeTruthy()
  })

  it('supports compact variant with text labels', async () => {
    const wrapper = mount(TabGroup, {
      props: {
        variant: 'compact',
        modelValue: 'unique',
      },
      slots: {
        default: () => [
          h(Tab, { value: 'unique', label: 'Unique' }),
          h(Tab, { value: 'total', label: 'Total' }),
        ],
      },
      global: {
        stubs: {
          XScroll: {
            template: '<div><slot /></div>',
          },
        },
      },
    })

    await nextTick()

    expect(wrapper.text()).toContain('Unique')
    expect(wrapper.text()).toContain('Total')
    expect(wrapper.find('[data-value="unique"] [aria-selected="true"]').exists()).toBe(true)
  })

  it('hides label for icon-only compact tabs', async () => {
    const Host = defineComponent({
      components: { TabGroup, Tab },
      data: () => ({ view: 'grid' }),
      template: `
        <TabGroup v-model="view" variant="compact">
          <Tab value="grid" icon="grid" tooltip="Grid view" />
          <Tab value="list" icon="list" tooltip="List view" />
        </TabGroup>
      `,
    })

    const wrapper = mount(Host, {
      global: {
        stubs: {
          XScroll: {
            template: '<div><slot /></div>',
          },
          XIcon: true,
        },
      },
    })

    await nextTick()

    expect(wrapper.find('[data-value="grid"] [aria-label="Grid view"]').exists()).toBe(true)
    expect(wrapper.find('[data-value="list"] [aria-label="List view"]').exists()).toBe(true)
    expect(wrapper.text()).not.toContain('grid')
    expect(wrapper.text()).not.toContain('list')
  })

  it('passes size down to Tab icons', async () => {
    const wrapper = mount(TabGroup, {
      props: {
        modelValue: 'a',
        size: 'lg',
      },
      slots: {
        default: () => h(Tab, { value: 'a', label: 'Tab A', icon: 'smile' }),
      },
      global: {
        stubs: {
          XScroll: { template: '<div><slot /></div>' },
          XTooltip: { template: '<div><slot /></div>' },
          XIcon: {
            props: ['icon', 'size'],
            template: '<i class="icon-stub" :data-size="size" />',
          },
        },
      },
    })

    await nextTick()

    expect(wrapper.find('.icon-stub').attributes('data-size')).toBe('lg')
  })

  it('lets Tab size override TabGroup size', async () => {
    const wrapper = mount(TabGroup, {
      props: {
        modelValue: 'a',
        size: 'lg',
      },
      slots: {
        default: () => h(Tab, { value: 'a', label: 'Tab A', icon: 'smile', size: 'sm' }),
      },
      global: {
        stubs: {
          XScroll: { template: '<div><slot /></div>' },
          XTooltip: { template: '<div><slot /></div>' },
          XIcon: {
            props: ['icon', 'size'],
            template: '<i class="icon-stub" :data-size="size" />',
          },
        },
      },
    })

    await nextTick()

    expect(wrapper.find('.icon-stub').attributes('data-size')).toBe('sm')
  })
})
