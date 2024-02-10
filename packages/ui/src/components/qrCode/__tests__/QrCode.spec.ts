import { describe, it, expect, vitest } from 'vitest'
import { mount } from '@vue/test-utils'
import QrCode from '../QrCode.vue'

describe('QrCode', () => {
  it('renders properly', () => {
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    HTMLCanvasElement.prototype.getContext = vitest.fn()
    const wrapper = mount(QrCode)

    expect(wrapper.vm).toBeTruthy()
  })
})
