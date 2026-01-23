import { createIcon } from './createIcon';

/** Info icon - circle with lowercase i */
export const InfoIcon = createIcon({
  path: () => (
    <>
      <circle cx="12" cy="12" r="9" />
      <path
        stroke-linecap="round"
        stroke-linejoin="round"
        d="M12 16v-4m0-4h.01"
      />
    </>
  ),
});
