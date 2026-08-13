import { describe, it, expect } from 'vitest'
import { inputGroupRadiusClasses } from '../inputGroupRadius'

describe('inputGroupRadiusClasses', () => {
  it('returns full radius for only', () => {
    expect(inputGroupRadiusClasses('only')).toEqual(['rounded-md'])
  })

  it('returns joined radius for first and last', () => {
    expect(inputGroupRadiusClasses('first')).toEqual(['rounded-l-md', 'rounded-r-none'])
    expect(inputGroupRadiusClasses('last')).toEqual(['rounded-r-md', 'rounded-l-none'])
    expect(inputGroupRadiusClasses('middle')).toEqual(['rounded-none'])
  })
})
