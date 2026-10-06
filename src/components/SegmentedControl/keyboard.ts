/** Keys handled by the radiogroup keyboard pattern */
export type RadioNavigationKey =
  | 'ArrowRight'
  | 'ArrowDown'
  | 'ArrowLeft'
  | 'ArrowUp'
  | 'Home'
  | 'End';

/**
 * Index of the option to select for a radiogroup navigation key.
 * Arrows wrap around; Home/End jump to the ends. `current` is -1 when the
 * selection is not among the enabled options. Returns undefined for keys
 * outside the pattern or when there is nothing to select.
 */
export function nextRadioIndex(
  key: string,
  current: number,
  count: number,
): number | undefined {
  if (count === 0) {
    return undefined;
  }
  switch (key) {
    case 'ArrowRight':
    case 'ArrowDown':
      return current === -1 ? 0 : (current + 1) % count;
    case 'ArrowLeft':
    case 'ArrowUp':
      return current === -1 ? count - 1 : (current - 1 + count) % count;
    case 'Home':
      return 0;
    case 'End':
      return count - 1;
    default:
      return undefined;
  }
}
