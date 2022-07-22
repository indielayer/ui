import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Form from '../Form.vue'

describe('Form', () => {
  it('renders without errors', () => {
    const wrapper = mount(Form)

    expect(wrapper.vm).toBeTruthy()
  })
})
