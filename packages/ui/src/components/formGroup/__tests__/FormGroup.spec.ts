import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import FormGroup from '../FormGroup.vue'

describe('FormGroup', () => {
  it('renders without errors', () => {
    const wrapper = mount(FormGroup)

    expect(wrapper.vm).toBeTruthy()
  })
})
