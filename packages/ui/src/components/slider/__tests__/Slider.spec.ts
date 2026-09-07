import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Slider from '../Slider.vue'
import Label from '../../label/Label.vue'
import InputFooter from '../../inputFooter/InputFooter.vue'

const globalComponents = {
  global: {
    components: { XLabel: Label, XInputFooter: InputFooter },
  },
}

describe('Slider', () => {
  it('renders without errors', () => {
    const wrapper = mount(Slider, globalComponents)

    expect(wrapper.vm).toBeTruthy()
  })

  it('forwards undeclared HTML attributes to the native range input', () => {
    const wrapper = mount(Slider, {
      attrs: {
        'aria-label': 'Volume',
        'data-testid': 'volume-slider',
      },
      ...globalComponents,
    })

    const input = wrapper.find('input[type="range"]')

    expect(input.attributes('aria-label')).toBe('Volume')
    expect(input.attributes('data-testid')).toBe('volume-slider')
  })

  it('applies class fallthrough to the wrapper, not the range input', () => {
    const wrapper = mount(Slider, {
      attrs: {
        class: 'wrapper-class',
      },
      ...globalComponents,
    })

    expect(wrapper.find('label').classes()).toContain('wrapper-class')
    expect(wrapper.find('input[type="range"]').classes()).not.toContain('wrapper-class')
  })
})
