import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Modal from '../Modal.vue'

describe('Modal', () => {
  it('renders without errors', () => {
    const wrapper = mount(Modal)

    expect(wrapper.vm).toBeTruthy()
  })
})
