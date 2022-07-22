import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Spacer from '../Spacer'

describe('Spacer', () => {
  it('renders without errors', () => {
    const wrapper = mount(Spacer)

    expect(wrapper.classes()).toContain('flex-grow')
  })
})
