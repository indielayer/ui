import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Skeleton from '../Skeleton.vue'

describe('Skeleton', () => {
  it('renders without errors', () => {
    const wrapper = mount(Skeleton)

    expect(wrapper.vm).toBeTruthy()
  })
})
