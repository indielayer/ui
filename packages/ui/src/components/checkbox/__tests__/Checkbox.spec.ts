import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Checkbox from '../Checkbox.vue'

describe('Checkbox', () => {
  it('renders without errors', () => {
    const wrapper = mount(Checkbox)

    expect(wrapper.vm).toBeTruthy()
  })

  it('forwards undeclared HTML attributes to the native checkbox input', () => {
    const wrapper = mount(Checkbox, {
      attrs: {
        'aria-label': 'Accept terms',
        'data-testid': 'terms-checkbox',
      },
    })

    const input = wrapper.find('input[type="checkbox"]')

    expect(input.attributes('aria-label')).toBe('Accept terms')
    expect(input.attributes('data-testid')).toBe('terms-checkbox')
  })

  it('applies class fallthrough to the wrapper label, not the native input', () => {
    const wrapper = mount(Checkbox, {
      attrs: {
        class: 'wrapper-class',
      },
    })

    expect(wrapper.find('label').classes()).toContain('wrapper-class')
    expect(wrapper.find('input[type="checkbox"]').classes()).not.toContain('wrapper-class')
  })

  it('keeps undeclared click listeners on the wrapper label', async () => {
    const onClick = vi.fn()
    const wrapper = mount(Checkbox, {
      attrs: {
        onClick,
      },
    })

    await wrapper.find('label').trigger('click')

    expect(onClick).toHaveBeenCalled()
  })
})
