import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tab from '../Tab.vue'

describe('Tab', () => {
  it('renders without errors', () => {
    const wrapper = mount(Tab)

    expect(wrapper.vm).toBeTruthy()
  })
})
