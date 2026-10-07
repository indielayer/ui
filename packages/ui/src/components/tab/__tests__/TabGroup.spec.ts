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

  it('sizes the clip wrapper to the tab list so overflow can scroll', async () => {
    const wrapper = mount(TabGroup, {
      props: {
        modelValue: 'e',
        fullWidth: false,
      },
      slots: {
        default: () => [
          h(Tab, { value: 'a', label: 'Tab A', removable: true }),
          h(Tab, { value: 'b', label: 'Tab B', icon: 'smile' }),
          h(Tab, { value: 'c', label: 'Tab c' }),
          h(Tab, { value: 'd', label: 'Tab d' }),
          h(Tab, { value: 'e', label: 'Tab e' }),
        ],
      },
      global: {
        stubs: {
          XScroll: {
            template: '<div class="scroll-stub"><slot /></div>',
          },
          XTooltip: { template: '<div><slot /></div>' },
          XIcon: true,
        },
      },
    })

    await nextTick()

    const clip = wrapper.find('.scroll-stub > .relative.overflow-x-clip')

    expect(clip.exists()).toBe(true)
    expect(clip.classes()).toEqual(expect.arrayContaining(['w-fit', 'min-w-full', 'overflow-x-clip']))
  })

  it('does not emit null when the tab group unmounts', async () => {
    const Host = defineComponent({
      components: { TabGroup, Tab },
      data: () => ({ show: true, tab: 'a' as string | null }),
      template: `
        <TabGroup v-if="show" v-model="tab" variant="line">
          <Tab value="a" label="A" />
          <Tab value="b" label="B" />
          <Tab value="c" label="C" />
        </TabGroup>
      `,
    })

    const wrapper = mount(Host, {
      global: {
        stubs: {
          XScroll: { template: '<div><slot /></div>' },
          XTooltip: { template: '<div><slot /></div>' },
          XIcon: true,
        },
      },
    })

    await nextTick()
    expect(wrapper.vm.tab).toBe('a')

    wrapper.vm.show = false
    await nextTick()

    expect(wrapper.vm.tab).toBe('a')
  })

  it('falls back to a sibling when the active tab is removed while mounted', async () => {
    const Host = defineComponent({
      components: { TabGroup, Tab },
      data: () => ({
        tab: 'a' as string | null,
        tabs: ['a', 'b', 'c'] as string[],
      }),
      template: `
        <TabGroup v-model="tab" variant="line">
          <Tab v-for="t in tabs" :key="t" :value="t" :label="t" />
        </TabGroup>
      `,
    })

    const wrapper = mount(Host, {
      global: {
        stubs: {
          XScroll: { template: '<div><slot /></div>' },
          XTooltip: { template: '<div><slot /></div>' },
          XIcon: true,
        },
      },
    })

    await nextTick()
    expect(wrapper.vm.tab).toBe('a')

    wrapper.vm.tabs = ['b', 'c']
    await nextTick()

    expect(wrapper.vm.tab).toBe('b')
  })
})
