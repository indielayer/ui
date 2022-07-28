import { unref, isRef } from 'vue'

const isObject = (val: any) => val !== null && typeof val === 'object'
const isArray = Array.isArray

/**
 * Deeply unref a value, recursing into objects and arrays.
 *
 * @param {Mixed} val - The value to deeply unref.
 *
 * @return {Mixed}
 */
export const deepUnref = (val: any) => {
  const checkedVal = isRef(val) ? unref(val) : val

  if (!isObject(checkedVal)) {
    return checkedVal
  }

  if (isArray(checkedVal)) {
    return unrefArray(checkedVal)
  }

  return unrefObject(checkedVal)
}

/**
 * Unref a value, recursing into it if it's an object.
 *
 * @param {Mixed} val - The value to unref.
 *
 * @return {Mixed}
 */
export const smartUnref = (val: any) => {
  // Non-ref object?  Go deeper!
  if (val !== null && !isRef(val) && typeof val === 'object') {
    return deepUnref(val)
  }

  return unref(val)
}

/**
 * Unref an array, recursively.
 *
 * @param {Array} arr - The array to unref.
 *
 * @return {Array}
 */
export const unrefArray: any = (arr: []) => arr.map(smartUnref)

/**
 * Unref an object, recursively.
 *
 * @param {Object} obj - The object to unref.
 *
 * @return {Object}
 */
export const unrefObject = (obj: any) => {
  const unreffed: any = {}

  // Object? un-ref it!
  Object.keys(obj).forEach((key) => {
    unreffed[key] = smartUnref(obj[key])
  })

  return unreffed
}
