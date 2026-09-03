import { describe, it, expect, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import Textarea from '../Textarea.vue'
import Label from '../../label/Label.vue'
import InputFooter from '../../inputFooter/InputFooter.vue'
import Icon from '../../icon/Icon.vue'

const globalComponents = {
  global: {
    components: { XLabel: Label, XInputFooter: InputFooter, XIcon: Icon },
  },
}

describe('Textarea', () => {
  it('renders without errors', () => {
    const wrapper = mount(Textarea, globalComponents)

    expect(wrapper.vm).toBeTruthy()
  })

  it('forwards inputmode and enterkeyhint to the native textarea', () => {
    const wrapper = mount(Textarea, {
      props: {
        inputmode: 'text',
        enterkeyhint: 'send',
      },
      ...globalComponents,
    })

    const textarea = wrapper.find('textarea')

    expect(textarea.attributes('inputmode')).toBe('text')
    expect(textarea.attributes('enterkeyhint')).toBe('send')
  })

  it('forwards undeclared HTML attributes to the native textarea', () => {
    const wrapper = mount(Textarea, {
      attrs: {
        spellcheck: 'false',
        'data-testid': 'notes',
      },
      ...globalComponents,
    })

    const textarea = wrapper.find('textarea')
    const label = wrapper.find('label')

    expect(textarea.attributes('spellcheck')).toBe('false')
    expect(textarea.attributes('data-testid')).toBe('notes')
    expect(label.attributes('data-testid')).toBeUndefined()
  })

  it('applies class fallthrough to the wrapper, not the native textarea', () => {
    const wrapper = mount(Textarea, {
      attrs: {
        class: 'wrapper-class',
      },
      ...globalComponents,
    })

    expect(wrapper.find('label').classes()).toContain('wrapper-class')
    expect(wrapper.find('textarea').classes()).not.toContain('wrapper-class')
  })
})
