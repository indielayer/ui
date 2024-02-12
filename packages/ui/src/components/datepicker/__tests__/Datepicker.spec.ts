import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Datepicker from '../Datepicker.vue'

describe('Datepicker', () => {
  it('renders properly', () => {
    const wrapper = mount(Datepicker)

    expect(wrapper.vm).toBeTruthy()
  })
})
