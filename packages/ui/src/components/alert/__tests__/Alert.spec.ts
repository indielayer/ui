import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Alert from '../Alert.vue'

describe('Alert', () => {
  it('renders properly', () => {
    const wrapper = mount(Alert)

    expect(wrapper.vm).toBeTruthy()
    // expect(wrapper.isVueInstance()).toBeTruthy()

    // expect(wrapper.text()).toContain('Hi there!')
  })
})
