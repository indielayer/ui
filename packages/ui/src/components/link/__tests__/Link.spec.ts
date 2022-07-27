import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Link from '../Link.vue'

describe('Link', () => {
  it('renders without errors', () => {
    const wrapper = mount(Link)

    expect(wrapper.vm).toBeTruthy()
  })
})
