import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Pagination from '../Pagination.vue'

describe('Pagination', () => {
  it('renders without errors', () => {
    const wrapper = mount(Pagination)

    expect(wrapper.vm).toBeTruthy()
  })
})
