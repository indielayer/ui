import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Toggle from '../Toggle.vue'

describe('Toggle', () => {
  it('renders without errors', () => {
    const wrapper = mount(Toggle)

    expect(wrapper.vm).toBeTruthy()
  })

  it('forwards undeclared HTML attributes to the native checkbox input', () => {
    const wrapper = mount(Toggle, {
      attrs: {
        'aria-label': 'Dark mode',
        'data-testid': 'dark-mode-toggle',
      },
    })

    const input = wrapper.find('input[type="checkbox"]')

    expect(input.attributes('aria-label')).toBe('Dark mode')
    expect(input.attributes('data-testid')).toBe('dark-mode-toggle')
  })

  it('applies class fallthrough to the wrapper label, not the native input', () => {
    const wrapper = mount(Toggle, {
      attrs: {
        class: 'wrapper-class',
      },
    })

    expect(wrapper.find('label').classes()).toContain('wrapper-class')
    expect(wrapper.find('input[type="checkbox"]').classes()).not.toContain('wrapper-class')
  })
})
