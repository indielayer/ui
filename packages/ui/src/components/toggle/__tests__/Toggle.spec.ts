import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Toggle from '../Toggle.vue'

describe('Toggle', () => {
  it('renders without errors', () => {
    const wrapper = mount(Toggle)

    expect(wrapper.vm).toBeTruthy()
  })
})
