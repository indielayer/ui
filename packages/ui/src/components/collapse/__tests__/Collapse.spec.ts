import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Collapse from '../Collapse.vue'

describe('Collapse', () => {
  it('renders without errors', () => {
    const wrapper = mount(Collapse)

    expect(wrapper.vm).toBeTruthy()
  })
})
