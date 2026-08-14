import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Button from '../Button.vue'

describe('Button', () => {
  it('renders without errors', () => {
    const wrapper = mount(Button)

    expect(wrapper.vm).toBeTruthy()
  })

  it('passes tooltip to the tooltip wrapper', () => {
    const wrapper = mount(Button, {
      props: { icon: 'check', tooltip: 'Save' },
      global: {
        stubs: {
          XIcon: true,
          XLoader: true,
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

    expect(wrapper.find('.tooltip-content').text()).toBe('Save')
    expect(wrapper.find('[aria-label="Save"]').exists()).toBe(true)
  })

  it('does not wrap in tooltip when tooltip is absent', () => {
    const wrapper = mount(Button, {
      props: { icon: 'check' },
      global: {
        stubs: {
          XIcon: true,
          XLoader: true,
          XTooltip: {
            template: '<div class="tooltip-stub"><slot /></div>',
          },
        },
      },
    })

    expect(wrapper.find('.tooltip-stub').exists()).toBe(false)
  })
})
