/**
 * Animation utility functions for reducing duplication in component animation logic
 */

/**
 * Returns the appropriate animation class based on whether the component is exiting
 *
 * @param isExiting - Whether the component is in its exit/closing state
 * @param enterClass - The class(es) to apply when entering/visible
 * @param exitClass - The class(es) to apply when exiting/closing
 * @returns The appropriate animation class string
 *
 * @example
 * ```tsx
 * const backdropClasses = () => getAnimationClass(isClosing(), BACKDROP_ENTER, BACKDROP_EXIT);
 * ```
 */
export function getAnimationClass(
  isExiting: boolean,
  enterClass: string,
  exitClass: string,
): string {
  return isExiting ? exitClass : enterClass;
}

/**
 * Returns the appropriate directional animation class based on exit state and direction
 *
 * @param isExiting - Whether the component is in its exit/closing state
 * @param direction - The current direction/position (e.g., 'left', 'right', 'bottom-center')
 * @param enterClasses - Record mapping directions to enter animation classes
 * @param exitClasses - Record mapping directions to exit animation classes
 * @returns The appropriate animation class string for the given direction
 *
 * @example
 * ```tsx
 * const drawerClasses = () => getDirectionalAnimationClass(
 *   isClosing(),
 *   position(),
 *   DRAWER_ENTER,
 *   DRAWER_EXIT
 * );
 * ```
 */
export function getDirectionalAnimationClass<T extends string>(
  isExiting: boolean,
  direction: T,
  enterClasses: Record<T, string>,
  exitClasses: Record<T, string>,
): string {
  return isExiting ? exitClasses[direction] : enterClasses[direction];
}
