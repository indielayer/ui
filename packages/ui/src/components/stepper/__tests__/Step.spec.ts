import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Step from '../Step.vue'

describe('Step', () => {
  it('renders without errors', () => {
    const wrapper = mount(Step)

    expect(wrapper.vm).toBeTruthy()
  })
})
