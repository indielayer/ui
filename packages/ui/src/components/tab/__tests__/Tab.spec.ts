import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tab from '../Tab.vue'

describe('Tab', () => {
  it('renders without errors', () => {
    const wrapper = mount(Tab)

    expect(wrapper.vm).toBeTruthy()
  })

  it('falls back label to value when icon is absent', () => {
    const wrapper = mount(Tab, {
      props: { value: 'grid' },
    })

    expect(wrapper.text()).toContain('grid')
  })

  it('omits label when icon is set without label', () => {
    const wrapper = mount(Tab, {
      props: { value: 'grid', icon: 'grid' },
      global: {
        stubs: { XIcon: true },
      },
    })

    expect(wrapper.text()).not.toContain('grid')
  })

  it('renders label when icon and label are both set', () => {
    const wrapper = mount(Tab, {
      props: { value: 'grid', icon: 'grid', label: 'Grid' },
      global: {
        stubs: { XIcon: true },
      },
    })

    expect(wrapper.text()).toContain('Grid')
  })

  it('passes tooltip to the tooltip wrapper', () => {
    const wrapper = mount(Tab, {
      props: { value: 'grid', icon: 'grid', tooltip: 'Grid view' },
      global: {
        stubs: {
          XIcon: true,
          XTooltip: {
            props: ['position'],
            template: `
              <div class="tooltip-stub">
                <slot />
                <div class="tooltip-content"><slot name="tooltip" /></div>
              </div>
            `,
          },
        },
      },
    })

    expect(wrapper.find('.tooltip-content').text()).toBe('Grid view')
    expect(wrapper.find('[aria-label="Grid view"]').exists()).toBe(true)
  })
})
