import { describe, it, expect } from 'vitest'
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
})
