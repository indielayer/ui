import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import Datepicker from '../Datepicker.vue'
import { injectThemeKey } from '../../../composables/keys'
import BaseTheme from '../../../themes/base'

const themeProvide = {
  global: {
    provide: {
      [injectThemeKey as symbol]: BaseTheme,
    },
  },
}

describe('Datepicker', () => {
  it('renders properly', () => {
    const wrapper = mount(Datepicker)

    expect(wrapper.vm).toBeTruthy()
  })

  it('exposes teleport prop for the menu (null uses VueDatePicker default)', () => {
    const wrapper = mount(Datepicker)

    expect(wrapper.props('teleport')).toBe(null)
  })

  it('applies a theme class to the menu for teleported styles', () => {
    const wrapper = mount(Datepicker, themeProvide)
    const css = wrapper.find('style').text()
    const match = css.match(/\.x-datepicker-menu-\d+/)

    expect(match).toBeTruthy()
    expect(css).toContain('--x-datepicker-')

    const menuClass = match![0].slice(1)
    const dp = wrapper.findComponent({ name: 'VueDatePicker' })

    expect(dp.exists()).toBe(true)
    expect(dp.props('ui').menu).toContain(menuClass)
  })
})
