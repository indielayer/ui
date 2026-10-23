import { describe, it, expect } from 'vitest'
import { inputGroupRadiusClasses } from '../inputGroupRadius'

describe('inputGroupRadiusClasses', () => {
  it('returns full radius for only', () => {
    expect(inputGroupRadiusClasses('only')).toEqual(['rounded-lg'])
  })

  it('returns joined radius for first and last', () => {
    expect(inputGroupRadiusClasses('first')).toEqual(['rounded-l-lg', 'rounded-r-none'])
    expect(inputGroupRadiusClasses('last')).toEqual(['rounded-r-lg', 'rounded-l-none'])
    expect(inputGroupRadiusClasses('middle')).toEqual(['rounded-none'])
  })
})
