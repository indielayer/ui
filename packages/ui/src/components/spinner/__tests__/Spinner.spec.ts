import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Spinner from '../Spinner.vue'

describe('Spinner', () => {
  it('renders without errors', () => {
    const wrapper = mount(Spinner)

    expect(wrapper.vm).toBeTruthy()
  })
})
