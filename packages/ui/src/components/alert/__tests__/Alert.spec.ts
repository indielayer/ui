import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Alert from '../Alert.vue'

describe('Alert', () => {
  it('renders properly', () => {
    const wrapper = mount(Alert, { slots: { default: 'Hi there!' } })

    expect(wrapper.text()).toContain('Hi there!')
  })
})
