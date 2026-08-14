import type { InputGroupPosition } from './inputGroupRadius'

export type ButtonGroupPosition = InputGroupPosition

export function buttonGroupRadiusClasses(
  position?: ButtonGroupPosition | null,
  pill = false,
) {
  if (!position) return []

  if (position === 'only') return [pill ? 'rounded-full' : 'rounded-md']
  if (position === 'first') return [pill ? 'rounded-s-full' : 'rounded-s-md']
  if (position === 'last') return [pill ? 'rounded-e-full' : 'rounded-e-md']

  return ['rounded-none']
}
