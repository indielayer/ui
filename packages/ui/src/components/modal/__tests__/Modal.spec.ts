import { describe, it, expect } from 'vitest'
import { mount } from '@vue/test-utils'
import { injectThemeKey } from '../../../composables/keys'
import BaseTheme from '../../../themes/base'
import Modal from '../Modal.vue'

describe('Modal', () => {
  it('renders without errors', () => {
    const wrapper = mount(Modal)

    expect(wrapper.vm).toBeTruthy()
  })

  it('adds backdrop-blur-sm when blurry is set', async () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: true,
        blurry: true,
      },
      attachTo: document.body,
      global: {
        provide: {
          [injectThemeKey as symbol]: BaseTheme,
        },
      },
    })

    await wrapper.vm.$nextTick()

    const backdrop = document.body.querySelector('[class*="backdrop-blur-sm"]')

    expect(backdrop).toBeTruthy()

    wrapper.unmount()
  })

  it('renders header icon from prop', async () => {
    const wrapper = mount(Modal, {
      props: {
        modelValue: true,
        title: 'Confirm',
        icon: '<path d="M6 18L18 6M6 6l12 12" />',
      },
      attachTo: document.body,
      global: {
        provide: {
          [injectThemeKey as symbol]: BaseTheme,
        },
      },
    })

    await wrapper.vm.$nextTick()

    expect(document.body.querySelector('.x-icon')).toBeTruthy()

    wrapper.unmount()
  })
})
