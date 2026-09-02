import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Textarea from '../Textarea.vue'

describe('Textarea', () => {
  it('renders without errors', () => {
    const wrapper = mount(Textarea)

    expect(wrapper.vm).toBeTruthy()
  })

  it('forwards inputmode and enterkeyhint to the native textarea', () => {
    const wrapper = mount(Textarea, {
      props: {
        inputmode: 'text',
        enterkeyhint: 'send',
      },
    })

    const textarea = wrapper.find('textarea')

    expect(textarea.attributes('inputmode')).toBe('text')
    expect(textarea.attributes('enterkeyhint')).toBe('send')
  })
})
