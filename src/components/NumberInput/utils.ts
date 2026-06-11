/**
 * Clamp a number into the inclusive `[min, max]` range.
 * `min`/`max` are optional — an undefined bound is treated as unbounded.
 * Pure function (no rounding/stepping — that stays in the component).
 */
export const clampValue = (
  value: number,
  min?: number,
  max?: number,
): number => {
  let clamped = value;
  if (min !== undefined && clamped < min) {
    clamped = min;
  }
  if (max !== undefined && clamped > max) {
    clamped = max;
  }
  return clamped;
};
