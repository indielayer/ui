import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Empty from '../Empty.vue'

describe('Empty', () => {
  it('renders without errors', () => {
    const wrapper = mount(Empty)

    expect(wrapper.vm).toBeTruthy()
  })
})
