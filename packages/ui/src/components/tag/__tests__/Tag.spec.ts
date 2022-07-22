import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Tag from '../Tag.vue'

describe('Tag', () => {
  it('renders without errors', () => {
    const wrapper = mount(Tag)

    expect(wrapper.vm).toBeTruthy()
  })
})
