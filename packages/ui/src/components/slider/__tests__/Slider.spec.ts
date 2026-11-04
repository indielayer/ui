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

const marks = {
  0: '0°C',
  20: '20°C',
  37: '37°C',
  100: '100°C',
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

  it('renders mark labels from the marks prop', () => {
    const wrapper = mount(Slider, {
      props: { marks },
      ...globalComponents,
    })

    expect(wrapper.text()).toContain('0°C')
    expect(wrapper.text()).toContain('20°C')
    expect(wrapper.text()).toContain('37°C')
    expect(wrapper.text()).toContain('100°C')
  })

  it('updates modelValue when a mark is clicked', async () => {
    const wrapper = mount(Slider, {
      props: {
        marks,
        modelValue: 0,
      },
      ...globalComponents,
    })

    const markButtons = wrapper.findAll('button[type="button"]')
    const mark37 = markButtons.find((button) => button.text().includes('37°C'))

    expect(mark37).toBeTruthy()
    await mark37!.trigger('click')

    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([37])
  })

  it('snaps to the nearest mark when step is "mark"', async () => {
    const wrapper = mount(Slider, {
      props: {
        marks,
        step: 'mark',
        modelValue: 0,
      },
      ...globalComponents,
    })

    const input = wrapper.find('input[type="range"]')

    expect(input.attributes('step')).toBe('any')

    await input.setValue(25)

    expect(Number(wrapper.emitted('update:modelValue')?.at(-1)?.[0])).toBe(20)
  })

  it('moves between marks with arrow keys when step is "mark"', async () => {
    const wrapper = mount(Slider, {
      props: {
        marks,
        step: 'mark',
        modelValue: 20,
      },
      ...globalComponents,
    })

    const input = wrapper.find('input[type="range"]')

    await input.trigger('keydown', { key: 'ArrowRight' })
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([37])

    await input.trigger('keydown', { key: 'ArrowLeft' })
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([20])

    await input.trigger('keydown', { key: 'Home' })
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([0])

    await input.trigger('keydown', { key: 'End' })
    expect(wrapper.emitted('update:modelValue')?.at(-1)).toEqual([100])
  })

  it('shows a value tooltip on hover when showTooltip is true', async () => {
    const wrapper = mount(Slider, {
      props: {
        showTooltip: true,
        modelValue: 42,
      },
      ...globalComponents,
    })

    expect(wrapper.text()).not.toContain('42')

    const trackArea = wrapper.find('.relative.flex.items-center.flex-1')

    await trackArea.trigger('mouseenter')

    expect(wrapper.text()).toContain('42')
  })

  it('formats the value tooltip with formatTooltip', async () => {
    const wrapper = mount(Slider, {
      props: {
        showTooltip: true,
        modelValue: 50,
        formatTooltip: (value: number) => `${value}%`,
      },
      ...globalComponents,
    })

    const trackArea = wrapper.find('.relative.flex.items-center.flex-1')

    await trackArea.trigger('mouseenter')

    expect(wrapper.text()).toContain('50%')
  })
})
