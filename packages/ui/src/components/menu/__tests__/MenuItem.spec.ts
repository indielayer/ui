import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import MenuItem from '../MenuItem.vue'

describe('MenuItem', () => {
  it('renders without errors', () => {
    const wrapper = mount(MenuItem)

    expect(wrapper.vm).toBeTruthy()
  })

  it('renders a description below the label', () => {
    const wrapper = mount(MenuItem, {
      props: {
        label: 'By percentile',
        description: 'Promote and demote by cohort placement percentages.',
      },
    })

    expect(wrapper.text()).toContain('By percentile')
    expect(wrapper.text()).toContain('Promote and demote by cohort placement percentages.')
  })

  it('keeps item.active when active is not passed (Select checkbox / selected state)', () => {
    const wrapper = mount(MenuItem, {
      props: {
        item: { label: 'Option C', active: true },
        checkbox: true,
        selected: false,
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')

    expect((checkbox.element as HTMLInputElement).checked).toBe(true)
  })

  it('lets an explicit active prop override item.active', () => {
    const wrapper = mount(MenuItem, {
      props: {
        item: { label: 'Option C', active: true },
        active: false,
        checkbox: true,
      },
    })

    const checkbox = wrapper.find('input[type="checkbox"]')

    expect((checkbox.element as HTMLInputElement).checked).toBe(false)
  })

  it('does not run props.onClick when the checkbox is clicked', async () => {
    const itemClick = vi.fn()
    const propClick = vi.fn()

    const wrapper = mount(MenuItem, {
      props: {
        item: { label: 'Option C', active: false, onClick: itemClick },
        checkbox: true,
        onClick: propClick,
      },
    })

    await wrapper.find('input[type="checkbox"]').trigger('click')

    expect(itemClick).toHaveBeenCalledTimes(1)
    expect(propClick).not.toHaveBeenCalled()
    expect(wrapper.emitted('checkbox-click')).toHaveLength(1)
  })
})
