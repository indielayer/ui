import { describe, it, expect, afterEach } from 'vitest'
import { mount, type VueWrapper } from '@vue/test-utils'
import type { ComponentPublicInstance } from 'vue'
import Notifications, { type NotificationInjection } from '../Notifications.vue'

describe('Notifications', () => {
  let wrapper: VueWrapper<ComponentPublicInstance & NotificationInjection>

  afterEach(() => {
    wrapper?.unmount()
  })

  it('renders without errors', () => {
    wrapper = mount(Notifications)

    expect(wrapper.vm).toBeTruthy()
  })

  it('does not capture pointer events on offset padding', async () => {
    wrapper = mount(Notifications, {
      props: { offset: 60, timeout: 0 },
      attachTo: document.body,
    })

    const overlay = document.body.querySelector('.x-notifications') as HTMLElement | null
    const list = overlay?.querySelector('ul') as HTMLElement | null

    expect(overlay?.classList.contains('pointer-events-none')).toBe(true)
    expect(list?.classList.contains('pointer-events-none')).toBe(true)
    expect(list?.style.paddingBottom).toBe('60px')

    wrapper.vm.log('Hello')
    await wrapper.vm.$nextTick()

    const item = overlay?.querySelector('li')

    expect(item?.classList.contains('pointer-events-auto')).toBe(true)
  })

  it('applies offset as padding-top when stacked at the top', () => {
    wrapper = mount(Notifications, {
      props: { offset: 48, position: 'top' },
      attachTo: document.body,
    })

    const list = document.body.querySelector('.x-notifications ul') as HTMLElement | null

    expect(list?.style.paddingTop).toBe('48px')
    expect(list?.classList.contains('pointer-events-none')).toBe(true)
  })
})
