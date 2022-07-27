import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Radio from '../Radio.vue'

describe('Radio', () => {
  it('renders without errors', () => {
    const wrapper = mount(Radio)

    expect(wrapper.vm).toBeTruthy()
  })
})
