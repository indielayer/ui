import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Scroll from '../Scroll.vue'

describe('Scroll', () => {
  it('renders without errors', () => {
    const wrapper = mount(Scroll)

    expect(wrapper.vm).toBeTruthy()
  })
})
