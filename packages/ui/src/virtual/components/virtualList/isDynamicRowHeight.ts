import type { DynamicRowHeight } from './types'

export function isDynamicRowHeight(
  value: unknown,
): value is DynamicRowHeight {
  return (
    typeof value === 'object' &&
    value !== null &&
    'getAverageRowHeight' in value &&
    'getRowHeight' in value &&
    'setRowHeight' in value
  )
}
