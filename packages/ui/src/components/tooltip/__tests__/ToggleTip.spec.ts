import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import ToggleTip from '../ToggleTip.vue'

describe('ToggleTip', () => {
  it('renders without errors', () => {
    const wrapper = mount(ToggleTip)

    expect(wrapper.vm).toBeTruthy()
  })
})
