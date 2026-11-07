import { describe, it, expect, beforeEach, afterEach } from 'vitest'
import { mount, flushPromises } from '@vue/test-utils'
import { nextTick } from 'vue'
import Avatar from '../Avatar.vue'

describe('Avatar', () => {
  let originalImage: typeof Image

  beforeEach(() => {
    originalImage = globalThis.Image
  })

  afterEach(() => {
    globalThis.Image = originalImage
  })

  function mockImageLoad() {
    globalThis.Image = class MockImage {
      onload: ((ev: Event) => void) | null = null
      onerror: ((ev: Event) => void) | null = null
      #src = ''

      get src() {
        return this.#src
      }

      set src(value: string) {
        this.#src = value
        Promise.resolve().then(() => this.onload?.(new Event('load')))
      }
    } as unknown as typeof Image
  }

  it('renders without errors', () => {
    const wrapper = mount(Avatar)

    expect(wrapper.vm).toBeTruthy()
  })

  it('keeps palette background when an image loads', async () => {
    mockImageLoad()

    const wrapper = mount(Avatar, {
      props: {
        image: 'https://example.com/avatar.png',
        color: 'primary',
      },
    })

    await flushPromises()
    await nextTick()

    const style = wrapper.attributes('style') || ''

    expect(style).not.toContain('--x-avatar-bg: transparent')
    expect(wrapper.find('img').exists()).toBe(true)
  })

  it('omits border class when an image is loaded and not outlined', async () => {
    mockImageLoad()

    const wrapper = mount(Avatar, {
      props: { image: 'https://example.com/avatar.png' },
    })

    await flushPromises()
    await nextTick()

    const classAttr = wrapper.attributes('class') || ''

    expect(classAttr.split(/\s+/)).not.toContain('border')
  })
})
