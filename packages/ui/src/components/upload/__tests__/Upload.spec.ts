import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Upload from '../Upload.vue'

describe('Upload', () => {
  it('renders without errors', () => {
    const wrapper = mount(Upload)

    expect(wrapper.vm).toBeTruthy()
  })
})
