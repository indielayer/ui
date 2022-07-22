import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Progress from '../Progress.vue'

describe('Progress', () => {
  it('renders without errors', () => {
    const wrapper = mount(Progress)

    expect(wrapper.vm).toBeTruthy()
  })
})
