import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Radio from '../Radio.vue'

describe('Radio', () => {
  it('renders without errors', () => {
    const wrapper = mount(Radio)

    expect(wrapper.vm).toBeTruthy()
  })

  it('forwards undeclared HTML attributes to the native radio input', () => {
    const wrapper = mount(Radio, {
      props: {
        value: 'a',
      },
      attrs: {
        'data-testid': 'option-a',
      },
    })

    const input = wrapper.find('input[type="radio"]')

    expect(input.attributes('data-testid')).toBe('option-a')
  })

  it('applies class fallthrough to the wrapper label, not the native input', () => {
    const wrapper = mount(Radio, {
      attrs: {
        class: 'wrapper-class',
      },
    })

    expect(wrapper.find('label').classes()).toContain('wrapper-class')
    expect(wrapper.find('input[type="radio"]').classes()).not.toContain('wrapper-class')
  })

  it('keeps undeclared click listeners on the wrapper label', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Radio, {
      attrs: {
        onClick,
      },
    })

    await wrapper.find('label').trigger('click')

    expect(onClick).toHaveBeenCalled()
  })
})
