import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tooltip from '../Tooltip.vue'

describe('Tooltip', () => {
  it('renders without errors', () => {
    const wrapper = mount(Tooltip)

    expect(wrapper.vm).toBeTruthy()
  })
})
