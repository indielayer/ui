import { describe, it, expect } from 'vitest'
import { isFileAccepted } from '../fileAccept'

function file(name: string, type: string) {
  return new File([''], name, { type })
}

describe('isFileAccepted', () => {
  it('accepts any file when accept is empty', () => {
    expect(isFileAccepted(file('a.png', 'image/png'), '')).toBe(true)
    expect(isFileAccepted(file('a.png', 'image/png'), '   ')).toBe(true)
  })

  it('matches filename extensions (case-insensitive)', () => {
    expect(isFileAccepted(file('photo.PNG', 'image/png'), '.png')).toBe(true)
    expect(isFileAccepted(file('photo.jpg', 'image/jpeg'), '.png, .jpg')).toBe(true)
    expect(isFileAccepted(file('doc.pdf', 'application/pdf'), '.png')).toBe(false)
  })

  it('matches exact MIME types', () => {
    expect(isFileAccepted(file('a.png', 'image/png'), 'image/png')).toBe(true)
    expect(isFileAccepted(file('a.png', 'image/png'), 'image/jpeg')).toBe(false)
  })

  it('matches MIME wildcards like image/*', () => {
    expect(isFileAccepted(file('a.png', 'image/png'), 'image/*')).toBe(true)
    expect(isFileAccepted(file('a.webp', 'image/webp'), 'image/*')).toBe(true)
    expect(isFileAccepted(file('a.pdf', 'application/pdf'), 'image/*')).toBe(false)
  })

  it('matches mixed HTML accept lists', () => {
    const accept = 'image/*,.pdf,application/json'

    expect(isFileAccepted(file('a.png', 'image/png'), accept)).toBe(true)
    expect(isFileAccepted(file('a.PDF', 'application/pdf'), accept)).toBe(true)
    expect(isFileAccepted(file('a.json', 'application/json'), accept)).toBe(true)
    expect(isFileAccepted(file('a.txt', 'text/plain'), accept)).toBe(false)
  })
})
