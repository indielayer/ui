import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Badge from '../Badge.vue'

describe('Badge', () => {
  it('renders without errors', () => {
    const wrapper = mount(Badge)

    expect(wrapper.vm).toBeTruthy()
  })
})
