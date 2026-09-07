import { describe, it, expect } from 'vitest'
import { splitFallthroughNativeAttrs } from '../useFallthroughNativeAttrs'

describe('splitFallthroughNativeAttrs', () => {
  it('keeps class, style, listeners, and structural attrs on the wrapper', () => {
    const onClick = () => {}
    const result = splitFallthroughNativeAttrs({
      class: 'w-full',
      style: { marginTop: '1rem' },
      hidden: true,
      inert: true,
      onClick,
    })

    expect(result.wrapperClass).toBe('w-full')
    expect(result.wrapperStyle).toEqual({ marginTop: '1rem' })
    expect(result.wrapperAttrs).toEqual({ hidden: true, inert: true, onClick })
    expect(result.nativeAttrs).toEqual({})
  })

  it('forwards HTML and ARIA attrs to the native control', () => {
    const result = splitFallthroughNativeAttrs({
      autocomplete: 'email',
      'aria-label': 'Email',
      'data-testid': 'email',
      spellcheck: 'false',
    })

    expect(result.nativeAttrs).toEqual({
      autocomplete: 'email',
      'aria-label': 'Email',
      'data-testid': 'email',
      spellcheck: 'false',
    })
    expect(result.wrapperAttrs).toEqual({})
  })

  it('does not treat non-listener on* keys as wrapper listeners', () => {
    const result = splitFallthroughNativeAttrs({
      online: true,
      one: '1',
    })

    expect(result.nativeAttrs).toEqual({ online: true, one: '1' })
  })
})
