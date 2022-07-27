import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PopoverContainer from '../PopoverContainer.vue'

describe('PopoverContainer', () => {
  it('renders without errors', () => {
    const wrapper = mount(PopoverContainer)

    expect(wrapper.vm).toBeTruthy()
  })
})
