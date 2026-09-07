import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Upload from '../Upload.vue'
import Label from '../../label/Label.vue'
import InputFooter from '../../inputFooter/InputFooter.vue'
import Icon from '../../icon/Icon.vue'

const globalComponents = {
  global: {
    components: { XLabel: Label, XInputFooter: InputFooter, XIcon: Icon },
  },
}

describe('Upload', () => {
  it('renders without errors', () => {
    const wrapper = mount(Upload, globalComponents)

    expect(wrapper.vm).toBeTruthy()
  })

  it('forwards undeclared HTML attributes to the native file input', () => {
    const wrapper = mount(Upload, {
      attrs: {
        capture: 'environment',
        'data-testid': 'avatar-upload',
      },
      ...globalComponents,
    })

    const input = wrapper.find('input[type="file"]')

    expect(input.attributes('capture')).toBe('environment')
    expect(input.attributes('data-testid')).toBe('avatar-upload')
  })

  it('applies class fallthrough to the outer wrapper, not the file input', () => {
    const wrapper = mount(Upload, {
      attrs: {
        class: 'wrapper-class',
      },
      ...globalComponents,
    })

    expect(wrapper.element.classList.contains('wrapper-class')).toBe(true)
    expect(wrapper.find('input[type="file"]').classes()).not.toContain('wrapper-class')
  })
})
