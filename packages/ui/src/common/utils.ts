import { unref, isRef } from 'vue'

export const isObject = (val: unknown): val is object => val !== null && typeof val === 'object'
export const isArray = (val: unknown): val is [] => Array.isArray(val)
// eslint-disable-next-line @typescript-eslint/ban-types
export const isFunction = (val: unknown): val is Function => typeof val === 'function'

/**
 * Deeply unref a value, recursing into objects and arrays.
 *
 * @param {Mixed} val - The value to deeply unref.
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
 * @return {Array}
 */
export const unrefArray: any = (arr: []) => arr.map(smartUnref)

/**
 * Unref an object, recursively.
 *
 * @param {Object} obj - The object to unref.
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

/**
 * Merge two objects, deeply.
 * @param {Object} source - The source object.
 * @param {Object} target - The target object.
 * @return {Object}
 */
export const mergeRightDeep = (source: any = {}, target: any = {}) => {
  const sourceKeys = Object.keys(source)
  const targetKeys = Object.keys(target)

  const merged = { ...source }

  targetKeys.forEach((key) => {
    if (sourceKeys.includes(key)) {
      if (isObject(source[key]) && isObject(target[key])) {
        merged[key] = mergeRightDeep(source[key], target[key])
      } else {
        merged[key] = target[key]
      }
    } else {
      merged[key] = target[key]
    }
  })

  return merged
}
