import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import PaginationItem from '../PaginationItem.vue'

describe('PaginationItem', () => {
  it('renders without errors', () => {
    const wrapper = mount(PaginationItem)

    expect(wrapper.vm).toBeTruthy()
  })
})
