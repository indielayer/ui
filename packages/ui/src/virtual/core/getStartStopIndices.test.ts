import { describe, it, expect } from 'vitest'
import { getStartStopIndices } from './getStartStopIndices'
import { createCachedBounds } from './createCachedBounds'

describe('getStartStopIndices', () => {
  it('calculates visible indices correctly', () => {
    const cachedBounds = createCachedBounds({
      itemCount: 100,
      itemProps: {},
      itemSize: 50,
    })

    const result = getStartStopIndices({
      cachedBounds,
      containerScrollOffset: 0,
      containerSize: 400,
      itemCount: 100,
      overscanCount: 3,
    })

    expect(result.startIndexVisible).toBe(0)
    expect(result.startIndexOverscan).toBe(0)
    expect(result.stopIndexVisible).toBeGreaterThanOrEqual(0)
    expect(result.stopIndexOverscan).toBeGreaterThanOrEqual(result.stopIndexVisible)
  })

  it('handles scrolled position', () => {
    const cachedBounds = createCachedBounds({
      itemCount: 100,
      itemProps: {},
      itemSize: 50,
    })

    const result = getStartStopIndices({
      cachedBounds,
      containerScrollOffset: 500,
      containerSize: 400,
      itemCount: 100,
      overscanCount: 3,
    })

    expect(result.startIndexVisible).toBeGreaterThan(0)
    expect(result.startIndexOverscan).toBeLessThanOrEqual(result.startIndexVisible)
  })
})
