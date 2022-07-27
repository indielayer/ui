import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Notifications from '../Notifications.vue'

describe('Notifications', () => {
  it('renders without errors', () => {
    const wrapper = mount(Notifications)

    expect(wrapper.vm).toBeTruthy()
  })
})
