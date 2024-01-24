import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Stepper from '../Stepper.vue'

describe('Stepper', () => {
  it('renders without errors', () => {
    const wrapper = mount(Stepper)

    expect(wrapper.vm).toBeTruthy()
  })
})
