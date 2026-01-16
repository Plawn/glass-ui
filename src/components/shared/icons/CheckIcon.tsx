import { createIcon } from './createIcon';

/** Check/checkmark icon for selections (checkboxes, list items) */
export const CheckIcon = createIcon({
  path: () => <path stroke-linecap="round" stroke-linejoin="round" d="M5 13l4 4L19 7" />,
});

/** Check icon with circle - for success states and alerts */
export const CheckCircleIcon = createIcon({
  path: () => (
    <>
      <circle cx="12" cy="12" r="9" />
      <path stroke-linecap="round" stroke-linejoin="round" d="M9 12l2 2 4-4" />
    </>
  ),
});
