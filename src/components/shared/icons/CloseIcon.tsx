import { createIcon } from './createIcon';

/** Close/X icon for dismissible elements like modals, toasts, alerts */
export const CloseIcon = createIcon({
  path: () => (
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="M6 18L18 6M6 6l12 12"
    />
  ),
});
