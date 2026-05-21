import { config } from '@vue/test-utils'

// VTU <2.4.6 stubs <transition> JS hooks as strings (vuejs/test-utils#2430).
config.global.stubs = {
  ...config.global.stubs,
  transition: false,
  Transition: false,
  'transition-group': false,
  TransitionGroup: false,
}

// Polyfill DOMRect for Node.js test environment
if (typeof global.DOMRect === 'undefined') {
  class DOMRectPolyfill implements DOMRect {
    readonly x: number
    readonly y: number
    readonly width: number
    readonly height: number
    readonly top: number
    readonly right: number
    readonly bottom: number
    readonly left: number

    constructor(x = 0, y = 0, width = 0, height = 0) {
      this.x = x
      this.y = y
      this.width = width
      this.height = height
      this.top = y
      this.left = x
      this.right = x + width
      this.bottom = y + height
    }

    toJSON() {
      return {
        x: this.x,
        y: this.y,
        width: this.width,
        height: this.height,
        top: this.top,
        right: this.right,
        bottom: this.bottom,
        left: this.left,
      }
    }
  }

  // @ts-expect-error - Polyfilling DOMRect for test environment
  global.DOMRect = DOMRectPolyfill
}
