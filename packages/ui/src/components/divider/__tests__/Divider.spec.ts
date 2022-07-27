import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Divider from '../Divider.vue'

describe('Divider', () => {
  it('renders without errors', () => {
    const wrapper = mount(Divider)

    expect(wrapper.vm).toBeTruthy()
  })
})
