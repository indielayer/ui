import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import TabGroup from '../TabGroup.vue'

describe('TabGroup', () => {
  it('renders without errors', () => {
    const wrapper = mount(TabGroup)

    expect(wrapper.vm).toBeTruthy()
  })
})
